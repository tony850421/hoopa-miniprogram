// pages/project/project.js
const AV = require('../../utils/av-weapp-min');

Page({
  data: {
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    height: '',
    width: '',
    product: {},
    projectManager: {},
    sponsorsList: [],
    assetsList: [],
    borrowerList: [],
    imageList: [],
    offersCount: 0,
    visitCount: 0,
    loveCount: 0,
    officialFlag: false,
    showModalLogin: false,
    codeText: '发送',
    phone: '',
    code: '',
    buttonSendCodeDisabled: true,
    buttonRegisterDisabled: true
  },
  onLoad: function(options) {
    var that = this
    // wx.getStorage({
    //   key: 'widthWithout',
    //   success: function (res) {
    //     that.setData({
    //       width: res.data
    //     })
    //   },
    //   fail: function (err) {
    //     wx.getSystemInfo({
    //       success: res => {
    //         that.setData({
    //           width: res.windowWidth
    //         })
    //         wx.setStorage({
    //           key: 'widthWithout',
    //           data: res.windowWidth
    //         })
    //       },
    //     })
    //   }
    // })

    // wx.getStorage({
    //   key: 'heightWithout',
    //   success: function (res) {
    //     that.setData({
    //       height: res.data
    //     })
    //   },
    //   fail: function (err) {
    //     wx.getSystemInfo({
    //       success: res => {
    //         that.setData({
    //           height: res.windowHeight
    //         })
    //         wx.setStorage({
    //           key: 'heightWithout',
    //           data: res.windowHeight
    //         })
    //       },
    //     })
    //   }
    // })

    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          width: res.windowWidth,
          height: res.windowHeight
        })
      },
    })

    const user = AV.User.current();
    if (user) {
      var query = new AV.Query("Project")
      query.include('projectManager')
      query.get(options.projectID).then(project => {

        this.setData({
          product: project,
          projectManager: project.get('projectManager')
        })

        var query1 = new AV.Query("Sponsorship")
        query1.equalTo('project', project)
        query1.find().then(sponsors => {
          this.setData({
            sponsorsList: sponsors
          })
        })

        var query2 = new AV.Query("Asset")
        query2.equalTo('project', project)
        query2.find().then(assets => {
          this.setData({
            assetsList: assets
          })
        })

        var query3 = new AV.Query("Borrower")
        query3.equalTo('project', project)
        query3.find().then(borrowers => {
          for (var i = 0; i < borrowers.length; i++) {
            borrowers[i].set('totalInterest', parseInt(borrowers[i].get('principalDebit')) + parseInt(borrowers[i].get('interestCreditor')))
          }
          this.setData({
            borrowerList: borrowers
          })
        })

        var query4 = new AV.Query("ProjectMedia")
        query4.equalTo('project', project)
        query4.find().then(images => {

          for (var i = 0; i < images.length; i++) {
            images[i].set('imageUrl', images[i].get('image').thumbnailURL(this.data.width, 480, 100))
          }

          this.setData({
            imageList: images
          })
        })

        var query5 = new AV.Query("Offert")
        query5.equalTo('project', project)
        query5.count().then(offers => {
          this.setData({
            offersCount: offers
          })
        })

        var query6 = new AV.Query("ProjectVisit")
        query6.equalTo('project', project)
        query6.count().then(visit => {
          this.setData({
            visitCount: visit
          })
        })

        var query7 = new AV.Query("ShopCar")
        query7.equalTo("project", project)
        query7.equalTo("user", user)
        query7.count().then(res => {
          this.setData({
            loveCount: res
          })
        })

        var visit = new AV.Object('ProjectVisit')
        visit.set('project', project)
        visit.set('user', user)
        visit.save();
      }).catch(console.error)
    }
  },
  goToOffer: function(e) {
    var that = this
    if (that.data.officialFlag) {
      wx.navigateTo({
        url: '../offer/offer?projectID=' + e.currentTarget.id,
      })
    } else {
      wx.setStorage({
        key: 'redirect',
        data: '../project/project',
        success: function(res) {},
        fail: function(res) {},
        complete: function(res) {},
      })
      // wx.navigateTo({
      //   url: '../register/register',
      // })
      that.setData({
        showModalLogin: true
      })
    }
  },
  goToHome: function() {
    wx.switchTab({
      url: '../home/home',
    })
  },
  onShow: function(options) {
    var that = this
    var user = AV.User.current()
    if (user) {
      var roleQuery = new AV.Query(AV.Role);
      roleQuery.equalTo('name', 'official');
      roleQuery.equalTo('users', user);
      roleQuery.find().then(function(results) {
        if (results.length > 0) {
          that.setData({
            officialFlag: true
          })
        } else {
          that.setData({
            officialFlag: false
          })
        }
      }).catch(function(error) {
        console.log(error);
      });
    }

    wx.setNavigationBarTitle({
      title: '资产信息',
    })
  },
  sendToShopCar: function() {
    const user = AV.User.current()
    if (user) {
      var shop = new AV.Object('ShopCar')
      shop.set('user', user)
      shop.set('checked', false);
      shop.set('project', this.data.product)
      shop.save()
      wx.showToast({
        title: '已收藏成功',
        icon: 'success',
        duration: 2000
      })
    }
  },
  goToCar: function() {
    wx.navigateTo({
      url: '../shop-car/shop-car'
    })
  },
  goToForum: function() {
    wx.navigateTo({
      url: '../forumProject/forumProject'
    })
  },
  goToRecommended: function() {
    wx.navigateTo({
      url: '../recommended/recommended'
    })
  },
  goToNearby: function() {
    wx.navigateTo({
      url: '../mapProjectNearby/mapProjectNearby?projectID=' + this.data.product.id
    })
  },
  callPhoneNumber: function(e) {
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.phone.toString()
    })
  },
  goToAsset: function(e) {
    wx.setStorage({
      key: 'latitude',
      data: e.currentTarget.dataset.latitude,
    })
    wx.setStorage({
      key: 'longitude',
      data: e.currentTarget.dataset.longitude,
    })
    wx.navigateTo({
      url: '../assetsMap/assetsMap'
    })
  },
  onShareAppMessage: function(res) {
    if (res.from == 'menu') {
      return {
        title: '自定义转发标题',
        path: 'pages/home/home'
      }
    } else {
      return {
        title: '自定义转发标题',
        path: 'pages/project/project?projectID=' + this.data.product.id
      }
    }
  },
  sendCode: function() {
    var phoneAux = this.data.phone;
    var that = this

    var user = AV.User.current();
    if (user) {
      // that.data.user.setMobilePhoneNumber(phoneAux);
      // that.data.user.save();
      AV.Cloud.requestSmsCode({
        mobilePhoneNumber: phoneAux,
        name: '应用名称',
        op: '某种操作',
        ttl: 2
      }).then(function() {

        that.setData({
          buttonSendCodeDisabled: true
        })

        var timer = 59,
          seconds;
        var intervalStart = setInterval(function() {
          seconds = parseInt(timer % 60, 10);
          seconds = seconds < 10 ? "0" + seconds : seconds;

          if (--timer <= 0) {
            seconds = '发送'
            that.setData({
              buttonSendCodeDisabled: false,
              buttonRegisterDisabled: true,
              code: ''
            })
            clearInterval(intervalStart)
          }

          that.setData({
            codeText: seconds
          })
        }, 1000);

        wx.showToast({
          title: '留言送',
          icon: 'success',
          duration: 2000
        })
      }, function(err) {
        wx.showModal({
          title: '错误',
          content: err.rawMessage,
        })
      });
    }
  },
  inputPhone: function(e) {
    this.setData({
      phone: e.detail.value
    })
    if (e.detail.value.length == 11) {
      this.setData({
        buttonSendCodeDisabled: false
      })
    } else {
      this.setData({
        buttonSendCodeDisabled: true
      })
    }
    if (this.data.phone != '' && this.data.code != '' && this.data.code.length == 6 && this.data.phone.length == 11) {
      this.setData({
        buttonRegisterDisabled: false
      })
    }
  },
  codeConfirm: function(e) {
    this.setData({
      code: e.detail.value
    })
    if (this.data.phone != '' && this.data.code != '' && this.data.code.length == 6 && this.data.phone.length == 11) {
      this.setData({
        buttonRegisterDisabled: false
      })
    }
  },
  register: function() {
    var that = this
    var user = AV.User.current()
    if (user) {
      var mobilePhone = this.data.phone;
      AV.Cloud.verifySmsCode(this.data.code, this.data.phone).then(function() {
        user.setMobilePhoneNumber(mobilePhone);
        user.save().then(function() {

        }, function(err) {
          wx.showModal({
            title: '错误',
            content: err.rawMessage,
          })
        })

        var roleQuery = new AV.Query(AV.Role);
        roleQuery.equalTo('name', 'official');
        roleQuery.find().then(function(results) {
          var role = results[0];
          var relation = role.getUsers();
          relation.add(user);
          return role.save();
        }).then(function(role) {
          //save role official in the storage
          wx.setStorage({
            key: 'role',
            data: 'official',
          })
          that.setData({
            officialFlag: true
          })
        }).catch(function(error) {
          console.log(error);
        });
        that.setData({
          showModalLogin: false
        })
      }, function(err) {
        wx.showModal({
          title: '错误',
          content: err.rawMessage,
          success: function(res) {
            that.setData({
              code: '',
              buttonSendCodeDisabled: false,
              buttonRegisterDisabled: true,
            })
          }
        })
      });
    }
  },
  quitModal: function() {
    this.setData({
      showModalLogin: false
    })
  }
})