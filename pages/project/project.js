// pages/project/project.js
const AV = require('../../utils/av-weapp-min');

Page({
  data: {
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    height: '',
    widht: '320',
    product: {},
    projectManager: {},
    sponsorsList: [],
    assetsList: [],
    borrowerList: [],
    imageList: [],
    offersCount: 0,
    visitCount: 0
  },
  onLoad: function (options) {
    wx.getSystemInfo({
      success: res => {
        this.setData({
          height: res.windowHeight,
          widht: res.windowWidth
        })
      }
    })

    const user = AV.User.current();
    if (user) {
      wx.getStorage({
        key: 'projectID',
        success: res => {
          var query = new AV.Query("Project")
          query.include('projectManager')
          query.get(res.data).then(
            project => {
              this.setData({
                product: project,
                projectManager: project.get('projectManager')
              })

              console.log(this.data.product)

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
                this.setData({
                  borrowerList: borrowers
                })
              })

              var query4 = new AV.Query("ProjectMedia")
              query4.equalTo('project', project)
              query4.find().then(images => {
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

              var visit = new AV.Object('ProjectVisit')
              visit.set('project', project)
              visit.save();
            }
          ).catch(console.error)
        }
      })
    }
  },
  goToOffer: function () {
    var user = AV.User.current()
    if (user) {
      var roleQuery = new AV.Query(AV.Role);
      roleQuery.equalTo('name', 'official');
      roleQuery.equalTo('users', user);
      roleQuery.find().then(function (results) {
        if (results.length > 0) {
          wx.navigateTo({
            url: '../offer/offer',
          })
        } else {
          wx.setStorage({
            key: 'redirect',
            data: '../offer/offer',
            success: function (res) { },
            fail: function (res) { },
            complete: function (res) { },
          })
          wx.navigateTo({
            url: '../register/register',
          })
        }
      }).catch(function (error) {
        console.log(error);
      });
    }
  },
  onShow: function (options) {
    wx.getStorage({
      key: 'projectID',
      success: res => {
        var query = new AV.Query("Project");
        query.get(res.data).then(
          project => {
            this.setData({
              product: project
            })

            // var query = new AV.Query('Offert');
            // query.equalTo('project', project);
            // query.find().then(
            //   offers => {
            //     this.setData({
            //       offer: offers.length
            //     })
            //   }
            // )

            // var query = new AV.Query('ProjectVisit');
            // query.equalTo('project', project);
            // query.find().then(
            //   visits => {
            //     this.setData({
            //       visit: visits.length
            //     })
            //   }
            // )

            // var query = new AV.Query('Offert');
            // query.equalTo('project', project);
            // query.equalTo('user', AV.User.current());
            // query.descending('createdAt');
            // query.find().then(
            //   offers => {
            //     if (offers.length > 0) {
            //       this.setData({
            //         myOffer: offers[0].attributes.amount
            //       })
            //     }                
            //   }
            // )
          }
        ).catch(console.error)
      }
    })
  },
  sendToShopCar: function () {
    const user = AV.User.current()
    if (user) {
      var shop = new AV.Object('ShopCar')
      shop.set('user', user)
      shop.set('checked', false);
      shop.set('project', this.data.product)
      shop.save()
      wx.showToast({
        title: '留言送',
        icon: 'success',
        duration: 2000
      })
    }
  },
  goToCar: function () {
    wx.navigateTo({
      url: '../shop-car/shop-car'
    })
  },
  goToRecommended: function(){
    wx.navigateTo({
      url: '../recommended/recommended'
    })
  },
  goToNearby: function () {
    wx.navigateTo({
      url: '../mapProjectNearby/mapProjectNearby'
    })
  },
  callPhoneNumber: function (e) {
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.phone.toString()
    })
  },
  goToAsset: function (e) {
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
  }
})