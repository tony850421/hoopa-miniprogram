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
    messages: [],
    sender: {},
    user: {},
    intoView: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getSystemInfo({
      success: res => {
        this.setData({
          height: res.windowHeight,
          widht: res.windowWidth
        })
      },
    })

    this.setData({
      user: AV.User.current()
    })
    console.log(this.data.user)
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

    wx.getStorage({
      key: 'role',
      success: function (res) {
        if (res.data != "official") {
          wx.setStorage({
            key: 'redirect',
            data: '../contact/contact',
            success: function (res) { },
            fail: function (res) { },
            complete: function (res) { },
          })
          wx.navigateTo({
            url: '../register/register',
          })
        }
      }
    }) 

    var user = AV.User.current()
    if (user) {
      var query = new AV.Query('Message')
      query.equalTo('sender', user)
      var queryAux = new AV.Query('Message')
      queryAux.equalTo('receiver', user);
      var compoundQuery = AV.Query.or(query, queryAux);
      compoundQuery.include('sender')
      compoundQuery.include('receiver')
      compoundQuery.find().then(
        message => {
          for (var i = 0; i < message.length; i++) {
            message[i].createdAt = message[i].createdAt.toLocaleDateString('zh-CN') + " " + message[i].createdAt.toLocaleTimeString('zh-CN')
          }
          
          this.setData({
            messages: message,
            intoView: message[message.length - 1].id
          })
          
          for (var i = 0; i < message.length; i++) {
            if (message[i].attributes.receiver.id == user.id) {
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
      acl.setWriteAccess(receiver, true);
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
  },
  sendText: function () {
    this.confirmText()
  }
})