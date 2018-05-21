// pages/shop-cart/shop-cart.js

const AV = require('../../utils/av-weapp-min');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    height: '',
    products: [],
    countCar: 0,
    checkedAll: false,
    total: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this

    var query = new AV.Query('ShopCar');
    query.equalTo('user', AV.User.current());
    query.descending('createdAt');
    query.include('project')
    query.find().then(
      projects => {
        that.setData({
          products: projects
        })
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
    wx.getSystemInfo({
      success: res => {
        this.setData({
          height: res.windowHeight
        })
      },
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
  checked: function (e) {
    var that = this
    this.setData({
      countCar: 0,
      total: 0
    })

    for (var i = 0; i < that.data.products.length; i++) {
      if (that.data.products[i].id == e.currentTarget.dataset.id) {
        that.data.products[i].attributes.checked = !that.data.products[i].attributes.checked
      }
      if (that.data.products[i].attributes.checked) {
        that.data.countCar = that.data.countCar + 1
        that.data.total = parseFloat(that.data.total) + parseFloat(that.data.products[i].attributes.project.attributes.debitAmount)
      }
    }
    that.setData({
      products: that.data.products,
      countCar: that.data.countCar,
      total: that.data.total
    })

    if (that.data.countCar == that.data.products.length) {
      this.setData({
        checkedAll: true
      })
    } else {
      this.setData({
        checkedAll: false
      })
    }
  },
  checkedAllTap: function () {
    var that = this
    this.setData({
      countCar: 0,
      total: 0
    })

    if (this.data.checkedAll) {
      for (var i = 0; i < that.data.products.length; i++) {
        this.data.products[i].attributes.checked = false
      }
    } else {
      for (var i = 0; i < this.data.products.length; i++) {
        this.data.products[i].attributes.checked = true
        this.data.countCar = this.data.countCar + 1
        this.data.total = parseFloat(this.data.total) + parseFloat(this.data.products[i].attributes.project.attributes.debitAmount)
      }
    }

    this.setData({
      products: this.data.products,
      countCar: this.data.countCar,
      checkedAll: !this.data.checkedAll,
      total: this.data.total
    })
  },
  goToProject: function (e) {
    var user = AV.User.current()
    if (!user) {
      wx.login({
        success: res => {
          // 发送 res.code 到后台换取 openId, sessionKey, unionId
          AV.User.loginWithWeapp().then(user => {
            // this.globalData.user = user.toJSON();
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
  },
  deleteShopCarItem: function () {
    var that = this
    wx.showModal({
      title: '删除',
      content: '你真的想删除你的清单愿望项目吗',
      success: function (res) {
        if (res.confirm) {
          for (var i = 0; i < that.data.products.length; i++) {
            if (that.data.products[i].attributes.checked) {
              var product = AV.Object.createWithoutData('ShopCar', that.data.products[i].id);
              product.destroy().then(function (prod) {
                wx.showToast({
                  title: '项目正确删除',
                  icon: 'success',
                  duration: 2000
                })

                var query = new AV.Query('ShopCar');
                query.equalTo('user', AV.User.current());
                query.include('project')
                query.find().then(
                  projects => {
                    that.setData({
                      products: projects
                    })
                  }
                )
              }).catch(function (error) {
                
              });
            }
          }
          that.setData({
            products: 0,
            countCar: 0,
            checkedAll: false,
            total: 0
          })
        } else if (res.cancel) {
          console.log(res)
        }
      }
    })
  }
})