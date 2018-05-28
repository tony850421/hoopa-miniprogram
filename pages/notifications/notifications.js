// pages/notifications/notifications.js
const AV = require('../../utils/av-weapp-min');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    height: '',
    width: '',
    notifications: [],
    user: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      user: AV.User.current()
    })

    var that = this

    wx.getStorage({
      key: 'width',
      success: function (res) {
        that.setData({
          width: res.data
        })
      },
    })

    wx.getStorage({
      key: 'height',
      success: function (res) {
        that.setData({
          height: res.data
        })
      },
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
    wx.getStorage({
      key: 'role',
      success: function (res) {
        if (res.data != "official") {
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
        }
      }
    })

    var user = AV.User.current()
    if (user) {
      var query = new AV.Query('OfferNotification');
      query.include('project')
      query.include('user')
      query.equalTo('user', user)
      query.find().then( notification => {
          
          if (notification.length <= 0) {
            wx.showModal({
              title: '通知',
              content: '此时您没有任何通知',
              success: function(){
                wx.switchTab({
                  url: '../user/user',
                })
              }
            })
          }


          this.setData({
            notifications: notification
          })

          for (var i = 0; i < notification.length; i++) {
            notification[i].set('readed', true)
            notification[i].save()
          }

          wx.removeTabBarBadge({
            index: 2,
          })
        }
      )
    }
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
  
  }
})