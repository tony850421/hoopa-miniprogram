//index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    height: '',
    width: '',
    textSkip: ''
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

    var timer = 10, seconds;
    var intervalStart = setInterval(function () {
      seconds = parseInt(timer % 60, 10);
      seconds = seconds < 10 ? "0" + seconds : seconds;

      if (--timer <= 0) {
        wx.switchTab({
          url: '../home/home',
        })       
        clearInterval(intervalStart)
      }

      that.setData({
        textSkip: seconds
      })
    }, 1000);
  },
  quitSplash: function(){
    wx.switchTab({
      url: '../home/home',
    })
  }
})