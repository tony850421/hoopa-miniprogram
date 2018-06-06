// pages/news/news.js

const AV = require('../../utils/av-weapp-min');

Page({
  data: {
    news: [],
    height: '',
    width: ''
  },
  onLoad: function (options) {
    var that = this
    wx.getSystemInfo({
      success: res => {
        that.setData({
          width: res.windowWidth
        })
      },
    })
  },
  onReady: function () {
  
  },
  onShow: function () {
    wx.showToast({
      title: '加载新闻',
      icon: 'loading',
      duration: 2000
    })

    var user = AV.User.current()
    if (user) {
      var query = new AV.Query('News')
      query.descending('createdAt')
      query.find().then( res => {
        
        for( var i=0; i< res.length; i++){
          res[i].set('imageUrl', res[i].get('image').thumbnailURL(this.data.width, 200))
        }

        this.setData({
          news: res
        })
      })
    }
  },
  onHide: function () {
  
  },
  onUnload: function () {
  
  },
  onPullDownRefresh: function () {
  
  },
  onReachBottom: function () {
  
  },
  onShareAppMessage: function (res) {
    return {
      title: '自定义转发标题',
      path: '/index/index'
    }
  },
  goToNews: function(e){
    wx.setStorage({
      key: 'news',
      data: e.currentTarget.dataset.id,
    })

    wx.navigateTo({
      url: '../newsDetail/newsDetail',
    })
  }
})