// pages/assetsMap/assetsMap.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    longitude: '',
    latitude: '',
    height: '',
    asset: [{
      name: '海岸投资',
      direction: '广州市天河区金穗路3号汇美大厦1201A',
      avatar: '../../images/LogoHoopa.png',
      iconPath: "../../images/project.png",
      width: 42,
      height: 50,
      longitude: '',
      latitude: ''
      // callout: {
      //   content: '单击此处查看此项目',
      //   display: 'ALWAYS',
      //   padding: 10,
      //   bgColor: '#FFFFFF',
      //   borderRadius: 5
      // }
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.getStorage({
      key: 'latitude',
      success: function (res) {
        that.setData({
          latitude: res.data,
          'asset[0].latitude': res.data
        })
      },
    })

    wx.getStorage({
      key: 'longitude',
      success: function (res) {
        that.setData({
          longitude: res.data,
          'asset[0].longitude': res.data
        })
      },
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    wx.getSystemInfo({
      success: res => {
        this.setData({
          height: res.windowHeight
        })
      },
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    return {
      title: '自定义转发标题',
      path: '/index/index'
    }
  }
})