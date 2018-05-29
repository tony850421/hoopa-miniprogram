// pages/userInformation/userInformation.js

const AV = require('../../utils/av-weapp-min');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    fullName: '',
    company: '',
    avatarUrl: '',
    nickName: '',
    city: '',
    province: '',
    edit: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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
    var query = new AV.Query('_User')
    var user = AV.User.current()
    query.get(user.id).then( res => {
      this.setData({
        fullName: res.get('fullName'),
        company: res.get('company'),
        city: res.get('city'),
        province: res.get('province'),
        nickName: res.get('nickName'),
        avatarUrl: res.get('avatarUrl')
      })
    })
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
  onShareAppMessage: function (res) {
    return {
      title: '自定义转发标题',
      path: '/index/index'
    }
  },
  cancel: function(){
    wx.navigateBack({
      delta: 1
    })
  },
  saveUser: function(){
    var user = AV.User.current()
    user.set('fullName', this.data.fullName)
    user.set('company', this.data.company)
    user.save().then(res => {
      wx.showToast({
        title: '用户保存正确',
        icon: 'success',
        duration: 2000
      })
      wx.navigateBack({
        delta: 1
      })
    })
  },
  goToCar: function(){
    wx.navigateTo({
      url: '../shop-car/shop-car',
    })
  },
  bindInputCompany: function(e){
    this.setData({
      company: e.detail.value
    })
  },
  bindInputFullName: function(e){
    this.setData({
      fullName: e.detail.value
    })
  },
  deleteUser: function(){
    
  },
  getWechatUserInfo: function (e) {
    var user = AV.User.current()
    var data = e.detail.rawData
    var userData = JSON.parse(data)
    if (user) {
      user.set('nickName', userData.nickName);
      user.set('avatarUrl', userData.avatarUrl);
      user.set('gender', userData.gender);
      user.set('province', userData.province);
      user.set('city', userData.city);
      user.save().then(res => {
        wx.showToast({
          title: '数据得到正确',
          icon: 'success',
          duration: 3000
        })
        this.setData({
          user: res
        })
      })
    } else {
      wx.login({
        success: res => {

          wx.showToast({
            title: '数据得到正确',
            icon: 'success',
            duration: 3000
          })

          AV.User.loginWithWeapp().then(currentUser => {
            currentUser.set('nickName', userData.nickName);
            currentUser.set('avatarUrl', userData.avatarUrl);
            currentUser.set('gender', userData.gender);
            currentUser.set('province', userData.province);
            currentUser.set('city', userData.city);
            currentUser.save().then(res => {
              this.setData({
                user: res
              })
            })
          }).catch(console.error);
        }
      })
    }
  }
})