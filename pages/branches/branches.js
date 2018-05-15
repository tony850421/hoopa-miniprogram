// pages/markers/markers.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    longitudeSelected: 126.605935,
    latitudeSelected: 45.759068,
    height: '',
    speed: '',
    accuracy: '',
    markers: [{
      iconPath: "../../images/markerWork.png",
      id: 0,
      latitude: 45.759068,
      longitude: 126.605935,
      width: 33,
      height: 50,
      phone: 13812354763,
      show: true,
      name: '海岸投资',
      direction: '广州市天河区金穗路3号汇美大厦1201A',
      url: 'http://www.shoreline.com.cn/shoreline/'
    }, {
      iconPath: "../../images/markerWork.png",
      id: 1,
      latitude: 31.553973,
      longitude: 120.253013,
      width: 33,
      height: 50,
      phone: 13812354763,
      show: false,
      name: '海岸投资',
      direction: '广州市天河区金穗路3号汇美大厦1201A',
      url: 'http://www.shoreline.com.cn/shoreline/'
    }, {
      iconPath: "../../images/markerWork.png",
      id: 2,
      latitude: 34.767745,
      longitude: 113.756223,
      width: 33,
      height: 50,
      phone: 13812354763,
      show: false,
      name: '海岸投资',
      direction: '广州市天河区金穗路3号汇美大厦1201A',
      url: 'http://www.shoreline.com.cn/shoreline/'
    }, {
      iconPath: "../../images/markerWork.png",
      id: 3,
      latitude: 32.046944,
      longitude: 118.800583,
      width: 33,
      height: 50,
      phone: 13812354763,
      show: false,
      name: '海岸投资',
      direction: '广州市天河区金穗路3号汇美大厦1201A',
      url: 'http://www.shoreline.com.cn/shoreline/'
    }, {
      iconPath: "../../images/markerWork.png",
      id: 4,
      latitude: 23.124425,
      longitude: 113.328309,
      width: 33,
      height: 50,
      phone: 13812354763,
      show: false,
      name: '海岸投资',
      direction: '广州市天河区金穗路3号汇美大厦1201A',
      url: 'http://www.shoreline.com.cn/shoreline/'
    }, {
      iconPath: "../../images/markerWork.png",
      id: 5,
      latitude: 30.246225,
      longitude: 120.212576,
      width: 33,
      height: 50,
      phone: 13812354763,
      show: false,
      name: '海岸投资',
      direction: '广州市天河区金穗路3号汇美大厦1201A',
      url: 'http://www.shoreline.com.cn/shoreline/'
    }, {
      iconPath: "../../images/markerWork.png",
      id: 6,
      latitude: 28.201072,
      longitude: 112.995415,
      width: 33,
      height: 50,
      phone: 13812354763,
      show: false,
      name: '海岸投资',
      direction: '广州市天河区金穗路3号汇美大厦1201A',
      url: 'http://www.shoreline.com.cn/shoreline/'
    }, {
      iconPath: "../../images/markerWork.png",
      id: 7,
      latitude: 31.855039,
      longitude: 117.293235,
      width: 33,
      height: 50,
      phone: 13812354763,
      show: false,
      name: '海岸投资',
      direction: '广州市天河区金穗路3号汇美大厦1201A',
      url: 'http://www.shoreline.com.cn/shoreline/'
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getSystemInfo({
      success: res => {
        this.setData({
          height: res.windowHeight
        })
      },
    })
    wx.getLocation({
      type: 'wgs84',
      success: res => {
        this.setData({
          longitudeSelected: res.latitude,
          longitudeSelected: res.longitude,
          speed: res.speed,
          accuracy: res.accuracy
        })
      }
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
  onShareAppMessage: function () {

  },
  tapPartner: function (e) {
    for (var i = 0; i < this.data.markers.length; i++) {
      if (this.data.markers[i].id == e.currentTarget.id) {
        this.data.markers[i].show = true
        this.data.longitudeSelected = this.data.markers[i].longitude
        this.data.latitudeSelected = this.data.markers[i].latitude
      } else {
        this.data.markers[i].show = false
      }
    }
    this.setData({
      markers: this.data.markers,
      latitudeSelected: this.data.latitudeSelected,
      longitudeSelected: this.data.longitudeSelected
    })
  },
  markertap: function (e) {
    // console.log(e.markerId)
  },
  callPhone: function (e) {
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.phone.toString()
    })
  }
})