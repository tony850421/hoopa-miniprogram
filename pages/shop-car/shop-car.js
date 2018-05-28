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
    wx.getStorage({
      key: 'widthWithout',
      success: function (res) {
        that.setData({
          width: res.data
        })
      },
      fail: function (err) {
        wx.getSystemInfo({
          success: res => {
            that.setData({
              width: res.windowWidth
            })
            wx.setStorage({
              key: 'widthWithout',
              data: res.windowWidth
            })
          },
        })
      }
    })

    wx.getStorage({
      key: 'heightWithout',
      success: function (res) {
        that.setData({
          height: res.data
        })
      },
      fail: function (err) {
        wx.getSystemInfo({
          success: res => {
            that.setData({
              height: res.windowHeight
            })
            wx.setStorage({
              key: 'heightWithout',
              data: res.windowHeight
            })
          },
        })
      }
    })

    var query = new AV.Query('ShopCar');
    query.equalTo('user', AV.User.current());
    // query.include('creator');
    query.include('image');
    query.include('project');
    query.descending('createdAt');
    // query.limit(10);
    query.find().then(res => {
      
      var arrivalType = []
      var provinces = ''
      for (var i = 0; i < res.length; i++) {
        if (res[i].get('project')){
          var typeArr = res[i].get('project').get('typeArrivalString')
          arrivalType = typeArr.split('+')
          arrivalType.splice(0, 1)
          var arrivalTypeTags = []

          for (var x = 0; x < arrivalType.length; x++) {
            var flag = false;
            for (var t = 0; t < arrivalTypeTags.length; t++) {
              if (arrivalType[x] == arrivalTypeTags[t]) {
                flag = true;
              }
            }
            if (!flag) {
              arrivalTypeTags.push(arrivalType[x])
            }
          }

          res[i].set('tags', arrivalTypeTags)
          res[i].set('mainImage', res[i].get('project').get('image').thumbnailURL(80, 75, 100))
          res[i].set('title', res[i].get('project').get('title'))
          res[i].set('debitAmount', res[i].get('project').get('debitAmount'))
          res[i].set('companyName', res[i].get('project').get('companyName'))
          provinces = res[i].get('project').get('provinceString')
          provinces = provinces.substr(1)
          res[i].set('provincesTags', provinces)
        }        
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
  onShareAppMessage: function (res) {
    return {
      title: '自定义转发标题',
      path: '/index/index'
    }
  },
  checked: function (e) {
    var that = this
    this.setData({
      countCar: 0,
      total: 0
    })

    for (var i = 0; i < that.data.products.length; i++) {
      if (that.data.products[i].id == e.currentTarget.dataset.id) {
        that.data.products[i].set('checked', !that.data.products[i].get('checked'))
      }
      if (that.data.products[i].get('checked')) {
        that.data.countCar = that.data.countCar + 1
        that.data.total = parseFloat(that.data.total) + parseFloat(that.data.products[i].get('project').get('debitAmount'))
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
        this.data.products[i].set('checked', false)
      }
    } else {
      for (var i = 0; i < this.data.products.length; i++) {
        this.data.products[i].set('checked' ,true)
        this.data.countCar = this.data.countCar + 1
        this.data.total = parseFloat(this.data.total) + parseFloat(this.data.products[i].get('project').get('debitAmount'))
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
          AV.User.loginWithWeapp().then(user => {
            wx.setStorage({
              key: "projectID",
              data: e.currentTarget.dataset.id
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
        data: e.currentTarget.dataset.id
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
            if (that.data.products[i].get('checked')) {
              var product = AV.Object.createWithoutData('ShopCar', that.data.products[i].id);
              product.destroy().then(function (prod) {
                wx.showToast({
                  title: '项目正确删除',
                  icon: 'success',
                  duration: 2000
                })

                var query = new AV.Query('ShopCar');
                query.equalTo('user', AV.User.current());
                query.include('image');
                query.include('project');
                query.descending('createdAt');
                query.find().then(res => {

                  var arrivalType = []
                  var provinces = ''
                  for (var i = 0; i < res.length; i++) {
                    if (res[i].get('project')) {
                      var typeArr = res[i].get('project').get('typeArrivalString')
                      arrivalType = typeArr.split('+')
                      arrivalType.splice(0, 1)
                      var arrivalTypeTags = []

                      for (var x = 0; x < arrivalType.length; x++) {
                        var flag = false;
                        for (var t = 0; t < arrivalTypeTags.length; t++) {
                          if (arrivalType[x] == arrivalTypeTags[t]) {
                            flag = true;
                          }
                        }
                        if (!flag) {
                          arrivalTypeTags.push(arrivalType[x])
                        }
                      }

                      res[i].set('tags', arrivalTypeTags)
                      res[i].set('mainImage', res[i].get('project').get('image').thumbnailURL(80, 75, 100))
                      res[i].set('title', res[i].get('project').get('title'))
                      res[i].set('debitAmount', res[i].get('project').get('debitAmount'))
                      res[i].set('companyName', res[i].get('project').get('companyName'))
                      provinces = res[i].get('project').get('provinceString')
                      provinces = provinces.substr(1)
                      res[i].set('provincesTags', provinces)
                    }
                  }

                  that.setData({
                    products: res
                  })
                })
                
                
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
  },
  goToHome: function(){
    wx.switchTab({
      url: '../index/index',
    })
  },
  goToUser: function(){
    wx.switchTab({
      url: '../user/user',
    })
  }
})