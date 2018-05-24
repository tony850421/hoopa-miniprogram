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
    rol: false,
    width: '',
    height: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
    this.setData({
      user: AV.User.current()
    })

    if (this.data.user) {
      this.verifyRole()
    } else {
      wx.login({
        success: res => {
          // 发送 res.code 到后台换取 openId, sessionKey, unionId
          AV.User.loginWithWeapp().then(currentUser => {
            this.setData({
              user: currentUser
            })
            this.verifyRole()
          }).catch(console.error);
        }
      })
    }
  },

  verifyRole: function () {
    var user = AV.User.current()
    if (user) {
      var roleQuery = new AV.Query(AV.Role);
      roleQuery.equalTo('users', user);
      roleQuery.find().then(
        roles => {
          if (roles[0].attributes.name == "official") {
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
    var user = AV.User.current()
    if (user) {
      var query = new AV.Query('Offert');
      query.include('project')
      query.equalTo('user', user);
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
      this.setData({
        user: AV.User.current()
      })
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

  },
  getWechatUserInfo: function (e) {
    var user = AV.User.current()
    var data = e.detail.rawData
    var userData = JSON.parse(data)
    if (user) {
      user.set('nickName', userData.nickName);
      user.set('avatarUrl', userData.avatarUrl);
      user.set('gender', userData.gender);
      user.set('province', userData.province);
      user.set('city', userData.city);
      user.save().then(res => {
        wx.showToast({
          title: '数据得到正确',
          icon: 'success',
          duration: 3000
        })
        this.setData({
          user: res
        })
      })
    } else {
      wx.login({
        success: res => {

          wx.showToast({
            title: '数据得到正确',
            icon: 'success',
            duration: 3000
          })

          AV.User.loginWithWeapp().then(currentUser => {
            currentUser.set('nickName', userData.nickName);
            currentUser.set('avatarUrl', userData.avatarUrl);
            currentUser.set('gender', userData.gender);
            currentUser.set('province', userData.province);
            currentUser.set('city', userData.city);
            currentUser.save().then(res => {

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

              this.setData({
                user: res
              })
            })
          }).catch(console.error);
        }
      })
    }
  },
  goToCar: function () {
    wx.navigateTo({
      url: '../shop-car/shop-car',
    })
  },
  goToNotifications: function () {
    wx.switchTab({
      url: '../notifications/notifications',
    })
  },
  goToOffers: function () {
    wx.navigateTo({
      url: '../offers/offers',
    })
  },
  goToUserInformation: function () {
    var user = AV.User.current()
    if (user) {
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
  },
  login: function () {
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
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

          this.setData({
            user: currentUser
          })
          this.verifyRole()
        }).catch(console.error);
      }
    })
  }
})