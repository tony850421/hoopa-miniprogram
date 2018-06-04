// pages/offer/offer.js

const AV = require('../../utils/av-weapp-min');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    offer: '',
    description: '',
    disableOffer: true
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
  onShareAppMessage: function (res) {
    return {
      title: '自定义转发标题',
      path: '/index/index'
    }
  },

  inputOffer: function (e) {
    this.setData({
      offer: e.detail.value
    })
    if (this.data.offer.length > 0){
       this.setData({
         disableOffer: false
       })
    } else {
      this.setData({
        disableOffer: true
      })
    }
  },

  inputDescription: function (e) {
    this.setData({
      description: e.detail.value
    })
    if (this.data.offer.length > 0) {
      this.setData({
        disableOffer: false
      })
    } else {
      this.setData({
        disableOffer: true
      })
    }
  },

  makeOffer: function () {
    const user = AV.User.current();
    if (user) {
      var offer = new AV.Object('Offert');
      offer.set('user', user);
      wx.getStorage({
        key: 'projectID',
        success: res => {
          var query = new AV.Query("Project");
          query.get(res.data).then(
            project => {
              offer.set('project', project)
              offer.set('amount', this.data.offer)
              offer.set('description', this.data.description)
              offer.set('pending', true)

              var acl = new AV.ACL();
              acl.setPublicReadAccess(true);
              acl.setPublicWriteAccess(true);
              offer.setACL(acl);

              offer.save();
              wx.navigateTo({
                url: '../offers/offers',
              })
            }).catch(console.error)
        }
      })
    }
  },
  cancel: function () {
    wx.navigateTo({
      url: '../project/project',
    })
  }
})