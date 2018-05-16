// pages/mapProjectNearby/mapProjectNearby.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    longitudeSelected: 126.605935,
    latitudeSelected: 45.759068,
    height: '',
    markers: [{
      iconPath: "../../images/markerPartner.png",
      id: 0,
      latitude: 45.759068,
      longitude: 126.605935,
      width: 33,
      height: 50,
      callout: {
        content: '海岸投资',
        display: 'BYCLICK',
        padding: 10,
        bgColor: '#EFEFA0'
      }
    }, {
      iconPath: "../../images/markerPartner.png",
      id: 1,
      latitude: 31.553973,
      longitude: 120.253013,
      width: 33,
      height: 50,
      callout: {
        content: '海岸投资',
        display: 'BYCLICK',
        padding: 10,
        bgColor: '#EFEFA0'
      }
    }, {
      iconPath: "../../images/markerPartner.png",
      id: 2,
      latitude: 34.767745,
      longitude: 113.756223,
      width: 33,
      height: 50,
      callout: {
        content: '海岸投资',
        display: 'BYCLICK',
        padding: 10,
        bgColor: '#EFEFA0'
      }
    }, {
      iconPath: "../../images/markerPartner.png",
      id: 3,
      latitude: 32.046944,
      longitude: 118.800583,
      width: 33,
      height: 50,
      callout: {
        content: '海岸投资',
        display: 'BYCLICK',
        padding: 10,
        bgColor: '#EFEFA0'
      }
    }, {
      iconPath: "../../images/markerPartner.png",
      id: 4,
      latitude: 23.124425,
      longitude: 113.328309,
      width: 33,
      height: 50,
      callout: {
        content: '海岸投资',
        display: 'BYCLICK',
        padding: 10,
        bgColor: '#EFEFA0'
      }
    }, {
      iconPath: "../../images/markerPartner.png",
      id: 5,
      latitude: 30.246225,
      longitude: 120.212576,
      width: 33,
      height: 50
    }, {
      iconPath: "../../images/markerPartner.png",
      id: 6,
      latitude: 28.201072,
      longitude: 112.995415,
      width: 33,
      height: 50,
      callout: {
        content: '海岸投资',
        display: 'BYCLICK',
        padding: 10,
        bgColor: '#EFEFA0'
      }
    }, {
      iconPath: "../../images/markerPartner.png",
      id: 7,
      latitude: 31.855039,
      longitude: 117.293235,
      width: 33,
      height: 50,
      callout: {
        content: '海岸投资',
        display: 'BYCLICK',
        padding: 10,
        bgColor: '#EFEFA0'
      }
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
  markertap: function (e) {
    console.log(e.markerId)
  }
})