// pages/project/project.js
Page({
  data: {
    imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    height: '',
    widht: '320',
  },
  onLoad: function (options) {
    wx.getSystemInfo({
      success: res => {
        this.setData({
          height: res.windowHeight,
          widht: res.windowWidth
        })
      },
    })
  },
  goToOffer: function(){
    wx.navigateTo({
      url: '../offer/offer',
    })
  }
})