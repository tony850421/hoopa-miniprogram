// pages/shop-cart/shop-cart.js

const AV = require('../../utils/av-weapp-min');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    height: '',
    widht: '',
    products: [],
    countCar: 0,
    checkedAll: false,
    total: 0
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

    var query = new AV.Query('ShopCar');
    query.equalTo('user', AV.User.current());
    query.find().then(
      projects => {
        for (var i = 0; i < projects.length; i++) {
          var queryProject = new AV.Query('Project')
          var id = projects[i].get('project').id
          queryProject.get(id).then(function (object) {
            var array = { checked: false, url: object.attributes.image, title: object.attributes.title, price: object.attributes.price, id: object.id }
            that.data.products.push(array)
            that.setData({
              products: that.data.products
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
    this.setData({
      countCar: 0,
      total: 0
    })
    
    for (var i = 0; i < that.data.products.length; i++) {
      if (that.data.products[i].id == e.target.dataset.id){
        that.data.products[i].checked = !that.data.products[i].checked        
      }
      if (that.data.products[i].checked){
        that.data.countCar = that.data.countCar + 1
        that.data.total = parseFloat(that.data.total) + parseFloat(that.data.products[i].price)
      }
    }
    this.setData({
      products: that.data.products,
      countCar: that.data.countCar,
      total: that.data.total
    })

    if (that.data.countCar == that.data.products.length){
      this.setData({
        checkedAll: true
      }) 
    } else {
      this.setData({
        checkedAll: false
      }) 
    }
  },
  checkedAllTap: function(){
    var that = this
    this.setData({
      countCar: 0,
      total: 0
    })

    if (this.data.checkedAll) {
      for (var i = 0; i < that.data.products.length; i++) {
        that.data.products[i].checked = false
      }
    } else {
      for (var i = 0; i < that.data.products.length; i++) {
        that.data.products[i].checked = true
        that.data.countCar = that.data.countCar + 1
        that.data.total = parseFloat(that.data.total) + parseFloat(that.data.products[i].price)
      }      
    }

    this.setData({
      products: that.data.products,
      countCar: that.data.countCar,
      checkedAll: !that.data.checkedAll,
      total: that.data.total
    })
  },
  goToProject: function(e){
    wx.setStorage({
      key: "projectID",
      data: e.currentTarget.id
    })
    wx.navigateTo({
      url: '../project/project',
    })
  }
})