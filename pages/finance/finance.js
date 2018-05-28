// pages/finance/finance.js

const AV = require('../../utils/av-weapp-min');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    countProject: 0,
    countOffers: 0,
    // countUsers: 0,
    countOfficialUsers: 0,
    countGuestUsers: 0,
    valueProject: 0
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    // total number of projects
    var queryProject = new AV.Query('Project');
    queryProject.count().then(res => {
      this.setData({
        countProject: res
      })
    })

    var queryValueProject = new AV.Query('Project');
    queryValueProject.find().then(res => {
      var sum = 0
      for (var i = 0; i < res.length; i++) {
        sum = sum + res[i].get('debitAmount')
      }
      this.setData({
        valueProject: sum
      })
    })

    var queryOffers = new AV.Query('Offert');
    queryOffers.count().then(res => {
      this.setData({
        countOffers: res
      })
    })

    // var queryUser = new AV.Query('User');
    // queryUser.count().then(res => {
    //   this.setData({
    //     countUsers: res
    //   })
    // })

    var that = this
    var roleQuery = new AV.Query(AV.Role);
    roleQuery.equalTo('name', 'official');
    roleQuery.first().then(function (role) {
      var userRelation = role.relation('users');
      return userRelation.query().count();
    }).then(function (res) {
      that.setData({
        countOfficialUsers: res
      })
    }).catch(function (error) {
      console.log(error);
    });

    var roleQuery = new AV.Query(AV.Role);
    roleQuery.equalTo('name', 'guest');
    roleQuery.first().then(function (role) {
      var userRelation = role.relation('users');
      return userRelation.query().count();
    }).then(function (res) {
      that.setData({
        countGuestUsers: res
      })
    }).catch(function (error) {
      console.log(error);
    });
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
  goToProjects: function(){
    wx.navigateTo({
      url: '../projects/projects',
    })
  },
  goToOffers: function () {
    wx.navigateTo({
      url: '../offers/offers',
    })
  }
})