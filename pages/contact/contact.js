// pages/contact/contact.js

const AV = require('../../utils/av-weapp-min');

Page({
  /**
   * 页面的初始数据
   */
  data: {
    height: '',
    widht: '',
    inputText: '',
    focus: false,
    messages: [],
    sender: {},
    user: {},
    intoView: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      user: AV.User.current()
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    wx.getSystemInfo({
      success: res => {
        this.setData({
          height: res.windowHeight,
          widht: res.windowWidth
        })
      },
    })

    wx.hideKeyboard()

    if (this.data.user) {
      var query = new AV.Query('Message')
      query.equalTo('sender', this.data.user)
      var queryAux = new AV.Query('Message')
      queryAux.equalTo('receiver', this.data.user);
      var compoundQuery = AV.Query.or(query, queryAux);
      compoundQuery.find().then(
        message => {
          for (var i=0; i<message.length; i++){
            message[i].createdAt = message[i].createdAt.toLocaleDateString('zh-CN') + " " + message[i].createdAt.toLocaleTimeString('zh-CN') 
          }
          
          this.setData({
            messages: message,
            intoView: message[message.length-1].id
          })

          var querySender = new AV.Query('_User')
          if (message[0].attributes.sender.id == this.data.user.id) {
            querySender.get(message[0].attributes.receiver.id).then(
              send => {
                this.setData({
                  sender: send
                })
              })
          } else {
            querySender.get(message[0].attributes.sender.id).then(
              send => {
                this.setData({
                  sender: send
                })
              })
          }

          for (var i = 0; i < message.length; i++) {
            if (message[i].attributes.receiver.id == this.data.user.id) {
              message[i].set('readed', true)
              message[i].save()
            }
          }

          wx.removeTabBarBadge({
            index: 1,
          })
        }
      )
    }    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  bindKeyInput: function (e) {
    this.setData({
      inputText: e.detail.value
    })
  },
  confirmText: function () {
    if (this.data.user) {
      var newMessage = new AV.Object('Message');
      newMessage.set('sender', this.data.user);
      var receiver = AV.Object.createWithoutData('_User', '5af264c07f6fd3003895d3a2');
      newMessage.set('receiver', receiver);
      newMessage.set('content', this.data.inputText);
      newMessage.set('readed', false);

      var acl = new AV.ACL();
      acl.setPublicReadAccess(true);
      acl.setWriteAccess(this.data.user, true);
      acl.setWriteAccess(this.data.sender, true);
      newMessage.setACL(acl);

      newMessage.save().then(res => {
        var query = new AV.Query('Message')
        query.equalTo('sender', this.data.user)
        var queryAux = new AV.Query('Message')
        queryAux.equalTo('receiver', this.data.user);
        var compoundQuery = AV.Query.or(query, queryAux);
        compoundQuery.find().then(
          message => {
            this.setData({
              messages: message,
              intoView: message[message.length - 1].id
            })
            wx.showToast({
              title: '留言送',
              icon: 'success',
              duration: 2000
            })  
          }
        )
      })
    }

    this.setData({
      inputText: ''
    })
    this.hideKeyboard()
  },
  sendText: function () {
    this.confirmText()
  },
  hideKeyboard: function () {
    wx.hideKeyboard()
  }
})