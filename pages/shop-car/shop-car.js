// pages/shop-cart/shop-cart.js

const AV = require('../../utils/av-weapp-min');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    height: '',
    widht: '',
    products: []
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

    var that = this
    var array = [];

    var query = new AV.Query('ShopCar');
    query.equalTo('user', AV.User.current());
    query.find().then(
      projects => {
        for (var i = 0; i < projects.length; i++) {
          var queryProject = new AV.Query('Project')
          var id = projects[i].get('project').id
          queryProject.get(id).then(function (object) {
            array[i] = { checked: false, url: object.attributes.image, title: object.attributes.title, price: object.attributes.price, id: object.id }
            that.setData({
              products: array
            })
          }, function (error) {
            // error is an instance of AVError.
          });
        }
      }
    )
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
  checked: function (e) {
    var that = this
    
    for (var i = 1; i < that.data.products.length; i++) {
      if (that.data.products[i].id == e.target.dataset.id){
        that.data.products[i].checked = !that.data.products[i].checked
      }
    }
    this.setData({
      products: that.data.products
    })
  }
})