// pages/userInformation/userInformation.js

const AV = require('../../utils/av-weapp-min');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    fullName: '',
    ci: '',
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
        ci: res.get('ci'),
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
  onShareAppMessage: function () {
  
  },
  cancel: function(){
    wx.navigateBack({
      delta: 1
    })
  },
  saveUser: function(){
    var user = AV.User.current()
    user.set('fullName', this.data.fullName)
    user.set('ci', this.data.ci)
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
  bindInputCI: function(e){
    this.setData({
      ci: e.detail.value
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
    
  }
})