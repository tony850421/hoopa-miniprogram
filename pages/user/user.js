// pages/user/user.js

const AV = require('../../utils/av-weapp-min');

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    offers: [],
    products: [],
    recommended: [],
    user: '',
    rol: false,
    width: '',
    height: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this

    wx.getStorage({
      key: 'width',
      success: function(res) {
        that.setData({
          width: res.data
        })
      },
    })

    wx.getStorage({
      key: 'height',
      success: function(res) {
        that.setData({
          height: res.data
        })
      },
    })

    var user = AV.User.current()
    if (user) {
      const query = new AV.Query('Project');
      query.equalTo('isRecommended', true)
      query.include('creator');
      query.include('image');
      query.descending('createdAt');
      query.find().then(res => {

        var arrivalType = []
        var provinces = ''
        for (var i = 0; i < res.length; i++) {
          var typeArr = res[i].get('typeArrivalString')
          provinces = res[i].get('provinceString')
          arrivalType = typeArr.split('+')
          arrivalType.splice(0, 1)
          provinces = provinces.substr(1)

          var pAux = provinces
          if (provinces.length > 12) {
            var pAux = ''
            for (var t = 0; t < 12; t++) {
              pAux = pAux + provinces[t]
            }
            pAux = pAux + "..."
          }
          provinces = pAux

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

          var title = res[i].get('title')
          var tAux = title
          if (title.length >= 15) {
            var tAux = ''
            for (var x = 0; x < 14; x++) {
              tAux = tAux + title[x]
            }
            tAux = tAux + "..."
          }
          title = tAux

          res[i].set('title', title)
          res[i].set('provincesTags', provinces)
          res[i].set('tags', arrivalTypeTags)
          res[i].set('mainImage', res[i].get('image').thumbnailURL(320, 240, 100))
        }

        this.setData({
          recommended: res
        })
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
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
  verifyRole: function() {
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
  onShow: function() {
    wx.removeStorage({
      key: 'type',
      success: function(res) {},
    })

    wx.setNavigationBarTitle({
      title: '个人中心',
    })

    var user = AV.User.current()
    if (user) {
      var query = new AV.Query('Offert');
      query.include('project')
      query.equalTo('user', user);
      query.find().then(offer => {
        for (var i = 0; i < offer.length; i++) {
          if (offer[i].get("description") != undefined) {
            if (offer[i].get("description").length > 50) {
              var desc = ''
              for (var x = 0; x < 51; x++) {
                desc += offer[i].get("description")[x]
              }
              desc += '...'
              offer[i].set("description", desc)
            }
          }
          if (offer[i].get("project").get("title").length > 5) {
            var name = ''
            for (var x = 0; x < 5; x++) {
              name += offer[i].get("project").get("title")[x]
            }
            name += '...'
            offer[i].set("title", name)
          }
        }
        this.setData({
          offers: offer
        })
      })

      if (this.data.offers.length == 0) {
        var query = new AV.Query('ShopCar');
        query.equalTo('user', user);
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
              provinces = res[i].get('project').get('provinceString')
              provinces = provinces.substr(1)

              var pAux = provinces
              if (provinces.length > 7) {
                var pAux = ''
                for (var t = 0; t < 7; t++) {
                  pAux = pAux + provinces[t]
                }
                pAux = pAux + "..."
              }
              provinces = pAux

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

              var title = res[i].get('project').get('title')
              var tAux = title
              if (title.length >= 11) {
                var tAux = ''
                for (var x = 0; x < 10; x++) {
                  tAux = tAux + title[x]
                }
                tAux = tAux + "..."
              }
              title = tAux

              res[i].set('tags', arrivalTypeTags)
              res[i].set('mainImage', res[i].get('project').get('image').thumbnailURL(320, 240, 100))
              res[i].set('title', title)
              res[i].set('debitAmount', res[i].get('project').get('debitAmount'))
              res[i].set('companyName', res[i].get('project').get('companyName'))
              res[i].set('provincesTags', provinces)
            }
          }

          this.setData({
            products: res
          })
        })
      }

      this.setData({
        user: AV.User.current()
      })
    }
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
  },
  getWechatUserInfo: function(e) {
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
            currentUser.save().then(u => {

              var query = new AV.Query('Offert');
              query.include('project')
              query.equalTo('user', user);
              query.find().then(offer => {
                for (var i = 0; i < offer.length; i++) {
                  if (offer[i].get("description") != undefined) {
                    if (offer[i].get("description").length > 50) {
                      var desc = ''
                      for (var x = 0; x < 51; x++) {
                        desc += offer[i].get("description")[x]
                      }
                      desc += '...'
                      offer[i].set("description", desc)
                    }
                  }
                  if (offer[i].get("project").get("title").length > 5) {
                    var name = ''
                    for (var x = 0; x < 5; x++) {
                      name += offer[i].get("project").get("title")[x]
                    }
                    name += '...'
                    offer[i].set("title", name)
                  }
                }
                this.setData({
                  offers: offer
                })
              })

              if (this.data.offers.length == 0) {
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
                      provinces = res[i].get('project').get('provinceString')
                      provinces = provinces.substr(1)

                      var pAux = provinces
                      if (provinces.length > 7) {
                        var pAux = ''
                        for (var t = 0; t < 7; t++) {
                          pAux = pAux + provinces[t]
                        }
                        pAux = pAux + "..."
                      }
                      provinces = pAux

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

                      var title = res[i].get('project').get('title')
                      var tAux = title
                      if (title.length >= 11) {
                        var tAux = ''
                        for (var x = 0; x < 10; x++) {
                          tAux = tAux + title[x]
                        }
                        tAux = tAux + "..."
                      }
                      title = tAux

                      res[i].set('tags', arrivalTypeTags)
                      res[i].set('mainImage', res[i].get('project').get('image').thumbnailURL(320, 240, 100))
                      res[i].set('title', title)
                      res[i].set('debitAmount', res[i].get('project').get('debitAmount'))
                      res[i].set('companyName', res[i].get('project').get('companyName'))
                      res[i].set('provincesTags', provinces)
                    }
                  }

                  this.setData({
                    products: res
                  })
                })
              }

              this.setData({
                user: u
              })
            })
          }).catch(console.error);
        }
      })
    }
  },
  goToContact: function() {
    wx.navigateTo({
      url: '../contact/contact',
    })
  },
  goToNotifications: function() {
    wx.navigateTo({
      url: '../notifications/notifications',
    })
  },
  goToOffers: function() {
    wx.navigateTo({
      url: '../offers/offers',
    })
  },
  logout: function() {
    AV.User.logOut().then(res => {
      this.setData({
        user: null,
        rol: '',
        offers: []
      })
    })
  },
  login: function() {
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        AV.User.loginWithWeapp().then(currentUser => {
          var query = new AV.Query('Offert');
          query.include('project')
          query.equalTo('user', user);
          query.find().then(offer => {
            for (var i = 0; i < offer.length; i++) {
              if (offer[i].get("description") != undefined) {
                if (offer[i].get("description").length > 50) {
                  var desc = ''
                  for (var x = 0; x < 51; x++) {
                    desc += offer[i].get("description")[x]
                  }
                  desc += '...'
                  offer[i].set("description", desc)
                }
              }
              if (offer[i].get("project").get("title").length > 5) {
                var name = ''
                for (var x = 0; x < 5; x++) {
                  name += offer[i].get("project").get("title")[x]
                }
                name += '...'
                offer[i].set("title", name)
              }
            }
            this.setData({
              offers: offer
            })
          })

          if (this.data.offers.length == 0) {
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
                  provinces = res[i].get('project').get('provinceString')
                  provinces = provinces.substr(1)

                  var pAux = provinces
                  if (provinces.length > 7) {
                    var pAux = ''
                    for (var t = 0; t < 7; t++) {
                      pAux = pAux + provinces[t]
                    }
                    pAux = pAux + "..."
                  }
                  provinces = pAux

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

                  var title = res[i].get('project').get('title')
                  var tAux = title
                  if (title.length >= 11) {
                    var tAux = ''
                    for (var x = 0; x < 10; x++) {
                      tAux = tAux + title[x]
                    }
                    tAux = tAux + "..."
                  }
                  title = tAux

                  res[i].set('tags', arrivalTypeTags)
                  res[i].set('mainImage', res[i].get('project').get('image').thumbnailURL(320, 240, 100))
                  res[i].set('title', title)
                  res[i].set('debitAmount', res[i].get('project').get('debitAmount'))
                  res[i].set('companyName', res[i].get('project').get('companyName'))
                  res[i].set('provincesTags', provinces)
                }
              }

              this.setData({
                products: res
              })
            })
          }

          this.setData({
            user: currentUser
          })
          this.verifyRole()
        }).catch(console.error);
      }
    })
  },
  goToProject: function(e) {
    wx.navigateTo({
      url: '../project/project?projectID=' + e.currentTarget.id,
    })
  }
})