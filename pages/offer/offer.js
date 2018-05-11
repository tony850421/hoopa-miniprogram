// pages/offer/offer.js

const AV = require('../../utils/av-weapp-min');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    offer: '',
    description: ''
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

  inputOffer: function (e) {
    this.setData({
      offer: e.detail.value
    })
  },

  inputDescription: function (e) {
    this.setData({
      description: e.detail.value
    })
  },

  makeOffer: function () {
    console.log(this.data.offer + " " + this.data.description)

    //we need to ask about roles, only official users are be able to make and offer
    const user = AV.User.current();
    if (user) {
      var offer = new AV.Object('Offert');
      offer.set('user', user);
      // offer.set('project', project);
      offer.set('amount', this.data.offer);
      offer.set('description', this.data.description);
      offer.save();
      wx.showToast({
        title: '留言送',
        icon: 'success',
        duration: 2000,
        success: function (res) {
          wx.navigateBack({
            delta: 1
          })
        }
      })
    }
  },

  cancel: function () {
    wx.navigateBack({
      delta: 1
    })
  }
})