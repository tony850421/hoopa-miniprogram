// pages/newsDetail/newsDetail.js

const AV = require('../../utils/av-weapp-min');

Page({
  data: {
    newsId: '',
    news: {},
    medias: [],
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

    var query = new AV.Query("News")
    query.get(options.news).then(newsObject => {
      var queryMedias = new AV.Query("NewsMedia")
      queryMedias.equalTo('news', newsObject)
      queryMedias.find().then(mediasObject => {

        for (var i = 0; i < mediasObject.length; i++) {
          if (mediasObject[i].get('image')) {
            mediasObject[i].set('imageUrl', mediasObject[i].get('image').thumbnailURL(that.data.width, 200))
          }
        }

        that.setData({
          medias: mediasObject
        })
      })

      newsObject.set('imageUrl', newsObject.get('image').thumbnailURL(that.data.width, 200))

      that.setData({
        news: newsObject
      })
    })
  },
  onReady: function () {

  },
  onShow: function () {
    
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
  }
})