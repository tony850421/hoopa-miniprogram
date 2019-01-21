// pages/aboutUs/aboutUs.js

const AV = require('../../utils/av-weapp-min');
const AVLive = require('../../utils/av-live-query-weapp-min');
const bind = require('../../utils/live-query-binding');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    team: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    var coreTeam = new AV.Query('CoreTeam');
    coreTeam.find().then(function(res) {
      var array = []
      res.forEach(function(element) {
        var mainImage = element.get('image').thumbnailURL(100, 100);
        var charge = element.get('charge');
        var id = element.id;
        var name = element.get('name');
        var description = element.get('description');

        var member = {
          id: id,
          name: name,
          charge: charge,
          description: description,
          image: mainImage,
        }

        array.push(member)
      });

      that.setData({
        team: array
      })
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    wx.setNavigationBarTitle({
      title: '公司介绍',
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function(res) {
    return {
      title: '自定义转发标题',
      path: 'pages/index/index'
    }
  }
})