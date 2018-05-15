// pages/contact/contact.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    height: '',
    widht: '',
    inputText: '',
    focus: false,
    messages: [{
      id:'',
      typeMessage: false,
      content: 'AAAAA',
      date: '',
      avatarUrl: '../../images/user.png'
    }, {
      id: '',
      typeMessage: true,
      content: 'BBBB',
      date: '',
      avatarUrl: '../../images/userSelected.png'
    }]
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
    wx.hideKeyboard()
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
    wx.getStorage({
      key: 'Commerce',
      success: res => {
        var article = AV.Object.createWithoutData('Article', res.data)

        var ccomment = new AV.Object('Comment');
        ccomment.set('content', text + this.data.inputText);
        ccomment.set('avatarUrl', this.data.userInfo.avatarUrl);
        ccomment.set('nickName', this.data.userInfo.nickName);
        ccomment.set('owner', article);
        ccomment.save();

        this.setData({
          inputText: '',
          focus: true
        })
      },
    })
  },
  sendText: function () {
    this.confirmText()
  },
  hideKeyboard: function () {
    wx.hideKeyboard()
  }
})