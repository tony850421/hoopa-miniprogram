// pages/home/home.js
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
    height: '',
    activeNews: true,
    activeData: false,
    activeAbout: false,
    showModal: false
  },
  goToServices: function () {
    wx.navigateTo({
      url: '../services/services',
    })
  },
  goToAboutUs: function () {
    wx.navigateTo({
      url: '../aboutUs/aboutUs',
    })
  },
  onReady: function () {
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
          wx.setStorage({
            key: 'role',
            data: 'guest',
          })
        }

        if (results.length > 0) {
          var role = results[0];
        } else {
          var roleQueryGuest = new AV.Query(AV.Role);
          roleQueryGuest.equalTo('name', 'guest');
          roleQueryGuest.find().then(function (results) {
            var role = results[0];
            var relation = role.getUsers();
            relation.add(user);
            return role.save();
          }).then(function (role) { }).catch(function (error) {
            console.log(error);
          });
        }
      }).then(function (administratorRole) {

      }).catch(function (error) {
        console.log(error);
      });
    }

  },
  onUnload: function () { 
    this.setData({
      showModal: false
    })
  },
  onPullDownRefresh: function () { },
  onShow: function () {
    wx.removeStorage({
      key: 'type',
      success: function (res) { },
    })
  },
  onShareAppMessage: function (res) {
    return {
      title: '自定义转发标题',
      path: 'pages/index/index'
    }
  },
  onLoad: function () {
    this.setData({
      showModal: true
    })

    // wx.showToast({
    //   title: '加载包',
    //   icon: 'loading',
    //   duration: 2000
    // })

    var that = this
    wx.getSystemInfo({
      success: res => {
        that.setData({
          width: res.windowWidth
        })
      },
    })

    wx.getSystemInfo({
      success: res => {
        if (res.windowHeight> 420){
          that.setData({
            height: res.windowHeight+40
          })
        } else {
          that.setData({
            height: res.windowHeight
          })
        }        
      },
    })

    var querySlide = new AV.Query('Slide')
    querySlide.find().then(slide => {
      for (var i = 0; i < slide.length; i++) {
        slide[i].set('imageUrl', slide[i].get('image').thumbnailURL(1080, 720))
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
        res[i].set('imageUrl', res[i].get('image').thumbnailURL(1080, 720))
        res[i].set('id', res[i].id)
      }

      that.setData({
        news: res
      })
    })
  },
  goToNews: function (e) {
    wx.navigateTo({
      url: '../newsDetail/newsDetail?news=' + e.currentTarget.id,
    })
  },
  goToBranches: function (e) {
    wx.navigateTo({
      url: '../branches/branches',
    })
  },
  goToTeam: function (e) {
    wx.navigateTo({
      url: '../team/team',
    })
  },
  goToFilterProject: function (e) {
    wx.setStorage({
      key: 'type',
      data: e.currentTarget.dataset.type,
    })
    wx.switchTab({
      url: '../projects/projects',
    })
  },
  quitModal: function(){
    this.setData({
      showModal: false
    })
  }
});