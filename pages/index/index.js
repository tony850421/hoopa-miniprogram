//index.js

const AV = require('../../utils/av-weapp-min');
const AVLive = require('../../utils/av-live-query-weapp-min');
const bind = require('../../utils/live-query-binding');

const appInstance = getApp()

Page({
  data: {
    inputShowed: false,
    inputVal: "",
    products: []
  },
  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function () {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
  },
  clearInput: function () {
    this.setData({
      inputVal: ""
    });
  },
  inputTyping: function (e) {
    this.setData({
      inputVal: e.detail.value
    });
  },
  goToProject: function (e) {
    wx.setStorage({
      key: "projectID",
      data: e.currentTarget.id
    })
    wx.navigateTo({
      url: '../project/project',
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
  fetchProducts: function (user) {
    const query = new AVLive.Query('Project');
    query.include('creator');
    query.include('image');
    query.descending('createdAt');
    query.limit(5);
    const setProducts = this.setProducts.bind(this);
    return AVLive.Promise.all([query.find().then(setProducts), query.subscribe()]).then(([products, subscription]) => {
      this.subscription = subscription;
      if (this.unbind) this.unbind();
      this.unbind = bind(subscription, products, setProducts);
    }).catch(error => console.error(error.message));
  },
  onReady: function () {
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.record']) {
          wx.authorize({
            scope: 'scope.userInfo',
            success() {
              wx.getUserInfo({
                success: res => {
                  var user = AV.User.current();
                  if (user) {
                    user.set('nickName', res.userInfo.nickName);
                    user.set('avatarUrl', res.userInfo.avatarUrl);
                    user.set('gender', res.userInfo.gender);
                    user.set('province', res.userInfo.province);
                    user.set('city', res.userInfo.city);
                    user.save();

                    var roleQuery = new AV.Query(AV.Role);
                    roleQuery.equalTo('users', user);
                    roleQuery.find().then(function (results) {
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
                  if (this.userInfoReadyCallback) {
                    this.userInfoReadyCallback(res)
                  }
                }
              })
            }
          })
        }
      }
    })

    const user = AV.User.current();
    this.fetchProducts(user);
  },
  onUnload: function () {
    this.subscription.unsubscribe();
    this.unbind();
  },
  onPullDownRefresh: function () {
    const user = AV.User.current();
    if (!user) return wx.stopPullDownRefresh();
    this.fetchProducts(user).catch(error => console.error(error.message)).then(wx.stopPullDownRefresh);
  },
  setProducts: function (products) {
    this.setData({
      products,
    });
    return products;
  },
  onShow: function(){
    // wx.setTabBarBadge({
    //   index: 1,
    //   text: '1'
    // })
  }
});