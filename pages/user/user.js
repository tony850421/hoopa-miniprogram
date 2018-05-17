// pages/user/user.js

const AV = require('../../utils/av-weapp-min');

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    offers: [],
    user: '',
    rol: false
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
    this.setData({
      user: AV.User.current()
    })
    if (this.data.user){
      var roleQuery = new AV.Query(AV.Role);
      roleQuery.equalTo('users', this.data.user);
      roleQuery.find().then(
        roles => {
          if (roles[0].attributes.name == "official"){
            this.setData({
              rol: true
            })
          } else {
            this.setData({
              rol: true
            })
          }          
        }
      )
    }
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var query = new AV.Query('Offert');
    query.equalTo('user', AV.User.current());
    query.find().then(
      offer => {
        this.setData({
          offers: offer
        })
      }
    )
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
  goToRegister: function () {
    wx.setStorage({
      key: 'redirect',
      data: '../user/user',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
    wx.navigateTo({
      url: '../register/register',
    })
  },
  goToCar: function () {
    wx.navigateTo({
      url: '../shop-car/shop-car',
    })
  },
  goToUserInformation: function(){
    var roleQuery = new AV.Query(AV.Role);
    roleQuery.equalTo('name', 'official');
    roleQuery.equalTo('users', this.data.user);
    roleQuery.find().then(function (results) {
      if (results.length <= 0) {
        wx.setStorage({
          key: 'redirect',
          data: '../user/user',
          success: function (res) { },
          fail: function (res) { },
          complete: function (res) { },
        })
        wx.navigateTo({
          url: '../register/register',
        })
      } else {
        wx.navigateTo({
          url: '../userInformation/userInformation',
        })
      }
    })    
  }
})