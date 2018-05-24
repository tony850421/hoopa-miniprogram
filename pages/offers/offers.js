// pages/offers/offers.js

const AV = require('../../utils/av-weapp-min');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    offers: [],
    width: '',
    height: ''
  },
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

    wx.login({
      success: res => {
        AV.User.loginWithWeapp().then(currentUser => {
          var query = new AV.Query('Offert');
          query.include('project')
          query.equalTo('user', currentUser);
          query.find().then(
            offer => {
              
              for (var i = 0; i < offer.length; i++) {
                if (offer[i].attributes.description.length > 50) {
                  var desc = ''
                  for (var x = 0; x < 51; x++) {
                    desc += offer[i].attributes.description[x]
                  }
                  desc += '...'
                  offer[i].attributes.description = desc
                }

                if (offer[i].attributes.project.attributes.title.length > 6) {
                  var name = ''
                  for (var x = 0; x < 6; x++) {
                    name += offer[i].attributes.project.attributes.title[x]
                  }
                  name += '...'
                  offer[i].attributes.project.attributes.title = name
                }
              }
              this.setData({
                offers: offer
              })
            }
          )
        }).catch(console.error);
      }
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
  goToHome: function () {
    wx.switchTab({
      url: '../index/index',
    })
  },
  goToUser: function () {
    wx.switchTab({
      url: '../user/user',
    })
  }
})