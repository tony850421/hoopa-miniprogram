// pages/recommended/recommended.js

const AV = require('../../utils/av-weapp-min');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    products: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const query = new AV.Query('Project');
    query.equalTo('isRecommended', true)
    query.include('creator');
    query.include('image');
    query.descending('createdAt');
    query.find().then(res => {

console.log(res)
      var arrivalType = []
      var provinces = ''
      for (var i = 0; i < res.length; i++) {
        var typeArr = res[i].get('typeArrivalString')
        provinces = res[i].get('provinceString')
        arrivalType = typeArr.split('+')
        arrivalType.splice(0, 1)
        provinces = provinces.substr(1)
        res[i].set('provincesTags', provinces)
        res[i].set('tags', arrivalType)
        res[i].set('mainImage', res[i].get('image').thumbnailURL(80, 75, 100))
      }

      this.setData({
        products: res
      })
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
  goToProject: function (e) {
    var user = AV.User.current()
    if (!user) {
      wx.login({
        success: res => {
          AV.User.loginWithWeapp().then(user => {
            wx.setStorage({
              key: "projectID",
              data: e.currentTarget.id
            })
            wx.navigateTo({
              url: '../project/project',
            })
          }).catch(console.error);
        }
      })
    } else {
      wx.setStorage({
        key: "projectID",
        data: e.currentTarget.id
      })
      wx.navigateTo({
        url: '../project/project',
      })
    }
  }
})