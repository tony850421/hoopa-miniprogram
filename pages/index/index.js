//index.js

const AV = require('../../utils/av-weapp-min');
const AVLive = require('../../utils/av-live-query-weapp-min');
const bind = require('../../utils/live-query-binding');

const appInstance = getApp()

Page({
  data: {
    interval: 5000,
    duration: 1000,
    imageList: [],
    productsHot: [],
    productsHouse: [],
    productsFactory: [],
    productsDebit: [],
    productsShop: [],
    news: [],
    slides: [],
    width: '',
    activeNews: true,
    activeData: false,
    activeAbout: false
  },
  // goToProject: function(e) {
  //   var user = AV.User.current()
  //   if (!user) {
  //     wx.login({
  //       success: res => {
  //         // 发送 res.code 到后台换取 openId, sessionKey, unionId
  //         AV.User.loginWithWeapp().then(user => {
  //           wx.navigateTo({
  //             url: '../project/project?projectID=' + e.currentTarget.id,
  //           })            
  //         }).catch(console.error);
  //       }
  //     })
  //   } else {
  //     wx.navigateTo({
  //       url: '../project/project?projectID=' + e.currentTarget.id,
  //     })
  //   }
  // }, 
  goToServices: function() {
    wx.navigateTo({
      url: '../services/services',
    })
  },
  goToAboutUs: function() {
    wx.navigateTo({
      url: '../aboutUs/aboutUs',
    })
  },
  onReady: function() {
    var user = AV.User.current();
    if (user) {
      var roleQuery = new AV.Query(AV.Role);
      roleQuery.equalTo('users', user);
      roleQuery.find().then(results => {
        var officialFlag = false;
        for (var i = 0; i < results.length; i++) {
          if (results[i].attributes.name == "official") {
            officialFlag = true;
          }
        }

        if (officialFlag) {
          wx.setStorage({
            key: 'role',
            data: 'official',
          })
        } else {
          // wx.setStorage({
          //   key: 'role',
          //   data: 'guest',
          // })
          wx.navigateTo({
            url: '../register/register',
          })
        }

        if (results.length > 0) {
          var role = results[0];
        } else {
          var roleQueryGuest = new AV.Query(AV.Role);
          roleQueryGuest.equalTo('name', 'guest');
          roleQueryGuest.find().then(function(results) {
            var role = results[0];
            var relation = role.getUsers();
            relation.add(user);
            return role.save();
          }).then(function(role) {}).catch(function(error) {
            console.log(error);
          });
        }
      }).then(function(administratorRole) {

      }).catch(function(error) {
        console.log(error);
      });
    }

  },
  onUnload: function() {},
  onPullDownRefresh: function() {},
  onShow: function() {
    // const user = AV.User.current()
    // if (user) {
    //   var query = new AV.Query('Message')
    //   query.equalTo('receiver', user)
    //   query.equalTo('readed', false)
    //   query.count().then(count => {
    //     if (count > 0) {
    //       wx.setTabBarBadge({
    //         index: 1,
    //         text: count.toString()
    //       })
    //     }
    //   })

    //   var queryN = new AV.Query('OfferNotification');
    //   queryN.include('project')
    //   queryN.include('user')
    //   queryN.equalTo('user', user)
    //   queryN.equalTo('readed', false)
    //   queryN.count().then(count => {
    //     if (count > 0) {
    //       wx.setTabBarBadge({
    //         index: 2,
    //         text: count.toString()
    //       })
    //     }
    //   })

    //   var query = new AV.Query("Project")
    //   query.include('projectManager')
    //   query.get("5b0d2f6f7f6fd300639794c3").then(project => {
    //     var query4 = new AV.Query("ProjectMedia")
    //     query4.equalTo('project', project)
    //     query4.find().then(images => {

    //       for (var i = 0; i < images.length; i++) {
    //         images[i].set('imageUrl', images[i].get('image').thumbnailURL(this.data.width, 150, 100))
    //       }

    //       this.setData({
    //         imageList: images
    //       })
    //     })
    //   })
    // }
  },
  onShareAppMessage: function(res) {
    return {
      title: '自定义转发标题',
      path: 'pages/index/index'
    }
  },
  onLoad: function() {
    wx.showToast({
      title: '加载包',
      icon: 'loading',
      duration: 2000
    })

    var that = this
    wx.getSystemInfo({
      success: res => {
        that.setData({
          width: res.windowWidth
        })
      },
    })

    var querySlide = new AV.Query('Slide')
    querySlide.find().then(slide => {
        for (var i=0; i<slide.length; i++){
          slide[i].set('imageUrl', slide[i].get('image').thumbnailURL(that.data.width, 200))
          slide[i].set('type', slide[i].get('type'))
        }

        this.setData({
          slides: slide
        })
    })

    var queryNews = new AV.Query('News')
    queryNews.descending('createdAt')
    queryNews.find().then(res => {
      for (var i = 0; i < res.length; i++) {
        res[i].set('imageUrl', res[i].get('image').thumbnailURL(that.data.width, 200))
        res[i].set('id', res[i].id)
      }

      that.setData({
        news: res
      })
    })
  },
  // fetchProductsHot: function() {
  //   const query = new AV.Query('Project');
  //   query.equalTo('isHot', true);
  //   query.descending('createdAt');
  //   query.find().then(res => {

  //     var arrivalType = []
  //     for (var i = 0; i < res.length; i++) {
  //       var typeArr = res[i].get('typeArrivalString')
  //       arrivalType = typeArr.split('+')
  //       arrivalType.splice(0, 1)

  //       if (res[i].get('title').length >= 15) {
  //         var title = ''
  //         for (var x = 0; x < 14; x++) {
  //           title = title + res[i].get('title')[x]
  //         }
  //         title = title + "..."
  //         res[i].set('title', title)
  //       }

  //       var arrivalTypeTags = []

  //       for (var x = 0; x < arrivalType.length; x++) {
  //         var flag = false;
  //         for (var t = 0; t < arrivalTypeTags.length; t++) {
  //           if (arrivalType[x] == arrivalTypeTags[t]) {
  //             flag = true;
  //           }
  //         }
  //         if (!flag) {
  //           arrivalTypeTags.push(arrivalType[x])
  //         }
  //       }

  //       res[i].set('tags', arrivalTypeTags)
  //     }

  //     this.setData({
  //       productsHot: res
  //     })
  //   })
  // },
  // fetchProductsHouse: function() {
  //   const query = new AV.Query('Project');
  //   query.equalTo('isHouse', true);
  //   query.descending('createdAt');
  //   query.find().then(res => {

  //     var arrivalType = []
  //     for (var i = 0; i < res.length; i++) {
  //       var typeArr = res[i].get('typeArrivalString')
  //       arrivalType = typeArr.split('+')
  //       arrivalType.splice(0, 1)
  //       var arrivalTypeTags = []

  //       if (res[i].get('title').length >= 15) {
  //         var title = ''
  //         for (var x = 0; x < 14; x++) {
  //           title = title + res[i].get('title')[x]
  //         }
  //         title = title + "..."
  //         res[i].set('title', title)
  //       }

  //       for (var x = 0; x < arrivalType.length; x++) {
  //         var flag = false;
  //         for (var t = 0; t < arrivalTypeTags.length; t++) {
  //           if (arrivalType[x] == arrivalTypeTags[t]) {
  //             flag = true;
  //           }
  //         }
  //         if (!flag) {
  //           arrivalTypeTags.push(arrivalType[x])
  //         }
  //       }

  //       res[i].set('tags', arrivalTypeTags)
  //     }

  //     this.setData({
  //       productsHouse: res
  //     })
  //   })
  // },
  // fetchProductsFactory: function() {
  //   const query = new AV.Query('Project');
  //   query.equalTo('isFactory', true);
  //   query.descending('createdAt');
  //   query.find().then(res => {

  //     var arrivalType = []
  //     for (var i = 0; i < res.length; i++) {
  //       var typeArr = res[i].get('typeArrivalString')
  //       arrivalType = typeArr.split('+')
  //       arrivalType.splice(0, 1)
  //       var arrivalTypeTags = []

  //       if (res[i].get('title').length >= 15) {
  //         var title = ''
  //         for (var x = 0; x < 14; x++) {
  //           title = title + res[i].get('title')[x]
  //         }
  //         title = title + "..."
  //         res[i].set('title', title)
  //       }

  //       for (var x = 0; x < arrivalType.length; x++) {
  //         var flag = false;
  //         for (var t = 0; t < arrivalTypeTags.length; t++) {
  //           if (arrivalType[x] == arrivalTypeTags[t]) {
  //             flag = true;
  //           }
  //         }
  //         if (!flag) {
  //           arrivalTypeTags.push(arrivalType[x])
  //         }
  //       }

  //       res[i].set('tags', arrivalTypeTags)
  //     }

  //     this.setData({
  //       productsFactory: res
  //     })
  //   })
  // },
  // fetchProductsShop: function() {
  //   const query = new AV.Query('Project');
  //   query.equalTo('isShop', true);
  //   query.descending('createdAt');
  //   query.find().then(res => {

  //     var arrivalType = []
  //     for (var i = 0; i < res.length; i++) {
  //       var typeArr = res[i].get('typeArrivalString')
  //       arrivalType = typeArr.split('+')
  //       arrivalType.splice(0, 1)
  //       var arrivalTypeTags = []

  //       if (res[i].get('title').length >= 15) {
  //         var title = ''
  //         for (var x = 0; x < 14; x++) {
  //           title = title + res[i].get('title')[x]
  //         }
  //         title = title + "..."
  //         res[i].set('title', title)
  //       }

  //       for (var x = 0; x < arrivalType.length; x++) {
  //         var flag = false;
  //         for (var t = 0; t < arrivalTypeTags.length; t++) {
  //           if (arrivalType[x] == arrivalTypeTags[t]) {
  //             flag = true;
  //           }
  //         }
  //         if (!flag) {
  //           arrivalTypeTags.push(arrivalType[x])
  //         }
  //       }

  //       res[i].set('tags', arrivalTypeTags)
  //     }

  //     this.setData({
  //       productsShop: res
  //     })
  //   })
  // },  
  goToNews: function(e) {
    wx.navigateTo({
      url: '../newsDetail/newsDetail?news=' + e.currentTarget.id,
    })
  },
  goToBranches: function(e) {
    wx.navigateTo({
      url: '../branches/branches',
    })
  },
  goToTeam: function(e) {
    wx.navigateTo({
      url: '../team/team',
    })
  },
  goToFilterProject: function(e){
    console.log(e.currentTarget.dataset.type)
  }
});