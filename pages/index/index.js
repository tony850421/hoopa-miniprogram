//index.js

const AV = require('../../utils/av-weapp-min');

const appInstance = getApp()

Page({
  data: {
    inputShowed: false,
    inputVal: ""
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
  goToProject: function(){
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
  onReady: function () {
    wx.getUserInfo({
      success: res => {
        // 可以将 res 发送给后台解码出 unionId
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
                console.log("role asigned ok");
              }).catch(function (error) {
                console.log(error);
              });
            }
          }).then(function (administratorRole) {
            //此时 administratorRole 已经包含了当前用户
          }).catch(function (error) {
            // 输出错误
            console.log(error);
          });
        }

        // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
        // 所以此处加入 callback 以防止这种情况
        if (this.userInfoReadyCallback) {
          this.userInfoReadyCallback(res)
        }
      }
    })
  },
  goToPartners: function(){
    wx.navigateTo({
      url: '../partners/partners',
    })
  }
});