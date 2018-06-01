//index.js

const AV = require('../../utils/av-weapp-min');
const AVLive = require('../../utils/av-live-query-weapp-min');
const bind = require('../../utils/live-query-binding');

const appInstance = getApp()

Page({
  data: {
    productsHot: [],
    productsHouse: [],
    productsFactory: [],
    productsDebit: [],
    productsShop: []
  },
  goToProject: function (e) {
    var user = AV.User.current()
    if (!user) {
      wx.login({
        success: res => {
          // 发送 res.code 到后台换取 openId, sessionKey, unionId
          AV.User.loginWithWeapp().then(user => {
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
  goToRecommended: function (e) {
    wx.navigateTo({
      url: '../recommended/recommended',
    })
  },
  goToServices: function () {
    wx.navigateTo({
      url: '../services/services',
    })
  },
  goToProjects: function () {
    wx.navigateTo({
      url: '../projects/projects',
    })
  },
  goToFinance: function () {
    wx.navigateTo({
      url: '../finance/finance',
    })
  },
  goToPartners: function () {
    wx.navigateTo({
      url: '../partners/partners',
    })
  },
  goToBranches: function () {
    wx.navigateTo({
      url: '../branches/branches',
    })
  },
  goToNews: function () {
    wx.navigateTo({
      url: '../news/news',
    })
  },
  goToAboutUs: function () {
    wx.navigateTo({
      url: '../aboutUs/aboutUs',
    })
  },
  goToTeam: function () {
    wx.navigateTo({
      url: '../team/team',
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
          }).then(function (role) {
          }).catch(function (error) {
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
  },
  onPullDownRefresh: function () {
  },
  onShow: function () {
    const user = AV.User.current()
    if (user) {
      var query = new AV.Query('Message')
      query.equalTo('receiver', user)
      query.equalTo('readed', false)
      query.count().then(
        count => {
          if (count > 0) {
            wx.setTabBarBadge({
              index: 1,
              text: count.toString()
            })
          }
        })

      var query = new AV.Query('OfferNotification');
      query.include('project')
      query.include('user')
      query.equalTo('user', user)
      query.equalTo('readed', false)
      query.count().then(count => {
        if (count > 0) {
          wx.setTabBarBadge({
            index: 2,
            text: count.toString()
          })
        }
      })
    }
  },
  onShareAppMessage: function (res) {
    return {
      title: '自定义转发标题',
      path: '/index/index'
    }
  },
  onLoad: function () {
    this.fetchProductsHot()
    this.fetchProductsHouse()
    this.fetchProductsFactory()
    this.fetchProductsShop()
  },
  fetchProductsHot: function () {
    const query = new AV.Query('Project');
    query.equalTo('isHot', true);
    query.descending('createdAt');
    query.find().then(res => {

      var arrivalType = []
      for (var i = 0; i < res.length; i++) {
        var typeArr = res[i].get('typeArrivalString')
        arrivalType = typeArr.split('+')
        arrivalType.splice(0, 1)
        
        if (res[i].get('title').length >= 15) {
          var title = ''
          for (var x = 0; x < 14; x++) {
            title = title + res[i].get('title')[x]
          }
          title = title + "..."
          res[i].set('title', title)
        }

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
      }

      this.setData({
        productsHot: res
      })
    })
  },
  fetchProductsHouse: function () {
    const query = new AV.Query('Project');
    query.equalTo('isHouse', true);
    query.descending('createdAt');
    query.find().then(res => {

      var arrivalType = []
      for (var i = 0; i < res.length; i++) {
        var typeArr = res[i].get('typeArrivalString')
        arrivalType = typeArr.split('+')
        arrivalType.splice(0, 1)
        var arrivalTypeTags = []

        if (res[i].get('title').length >= 15) {
          var title = ''
          for (var x = 0; x < 14; x++) {
            title = title + res[i].get('title')[x]
          }
          title = title + "..."
          res[i].set('title', title)
        }

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
      }

      this.setData({
        productsHouse: res
      })
    })
  },
  fetchProductsFactory: function () {
    const query = new AV.Query('Project');
    query.equalTo('isFactory', true);
    query.descending('createdAt');
    query.find().then(res => {

      var arrivalType = []
      for (var i = 0; i < res.length; i++) {
        var typeArr = res[i].get('typeArrivalString')
        arrivalType = typeArr.split('+')
        arrivalType.splice(0, 1)
        var arrivalTypeTags = []

        if (res[i].get('title').length >= 15) {
          var title = ''
          for (var x = 0; x < 14; x++) {
            title = title + res[i].get('title')[x]
          }
          title = title + "..."
          res[i].set('title', title)
        }

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
      }

      this.setData({
        productsFactory: res
      })
    })
  },
  fetchProductsShop: function () {
    const query = new AV.Query('Project');
    query.equalTo('isShop', true);
    query.descending('createdAt');
    query.find().then(res => {

      var arrivalType = []
      for (var i = 0; i < res.length; i++) {
        var typeArr = res[i].get('typeArrivalString')
        arrivalType = typeArr.split('+')
        arrivalType.splice(0, 1)
        var arrivalTypeTags = []

        if (res[i].get('title').length >= 15) {
          var title = ''
          for (var x = 0; x < 14; x++) {
            title = title + res[i].get('title')[x]
          }
          title = title + "..."
          res[i].set('title', title)
        }

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
      }

      this.setData({
        productsShop: res
      })
    })
  }
});