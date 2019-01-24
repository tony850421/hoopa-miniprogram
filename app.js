//app.js
const AV = require('./utils/av-weapp-min.js');
// const AVLive = require('./utils/av-live-query-weapp-min.js');
// const bind = require('./utils/live-query-binding.js');

AV.init({
  appId: 'JFuqWjSPODy08snVJFtXD6IP-gzGzoHsz',
  appKey: 'vaUr4WV0p1nRFKlypzN374jx',
});

// AVLive.init({
//   appId: 'JFuqWjSPODy08snVJFtXD6IP-gzGzoHsz',
//   appKey: 'vaUr4WV0p1nRFKlypzN374jx',
// });

App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    wx.getSystemInfo({
      success: res => {
          wx.setStorage({
            key: 'height',
            data: res.windowHeight,
          })
          wx.setStorage({
            key: 'width',
            data: res.windowWidth,
          })
      },
    })

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId

        AV.User.loginWithWeapp().then(user => {          
          this.globalData.user = user.toJSON();
        }).catch(console.error);
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })

    wx.showShareMenu({
      withShareTicket: true
    })
  },
  globalData: {
    userInfo: null
  }
})