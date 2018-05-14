// pages/partners/partners.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    longitudeSelected: 126.605935,
    latitudeSelected: 45.759068,
    height: '',
    partners: [
      {
        id: '0',
        name: '海岸投资',
        direction: '广州市天河区金穗路3号汇美大厦1201A',
        show: true,
        latitude: 45.759068,
        longitude: 126.605935,
        phone: 13818354127
      },
      {
        id: '1',
        name: '太盟投资',
        direction: '中国上海市南京西路1366号恒隆广场2座4501及4703- 4705室邮编200040',
        show: false,
        latitude: 31.553973,
        longitude: 120.253013,
        phone: 13818354121
      },
      {
        id: '2',
        name: '上海珑心资产管理有限公司',
        direction: '上海市黄浦区湖滨路222号企业天地一号楼15层',
        show: false,
        latitude: 34.767745,
        longitude: 113.756223,
        phone: 13818354122
      },
      {
        id: '3',
        name: '上海珑心资产管理有限公司',
        direction: '上海市黄浦区湖滨路222号企业天地一号楼15层',
        show: false,
        latitude: 32.046944,
        longitude: 118.800583,
        phone: 13818354123
      },
      {
        id: '4',
        name: '上海珑心资产管理有限公司',
        direction: '上海市黄浦区湖滨路222号企业天地一号楼15层',
        show: false,
        latitude: 23.124425,
        longitude: 113.328309,
        phone: 13818354124
      },
      {
        id: '5',
        name: '上海珑心资产管理有限公司',
        direction: '上海市黄浦区湖滨路222号企业天地一号楼15层',
        show: false,
        latitude: 30.246225,
        longitude: 120.212576,
        phone: 13818354125
      }
    ],
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
    wx.getLocation({
      type: 'wgs84',
      success: res => {
        this.setData({
          latitude: res.latitude,
          longitude: res.longitude,
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
    
    for (var i = 0; i < this.data.partners.length; i++) {
      if (this.data.partners[i].id == e.currentTarget.id) {
        this.data.partners[i].show = true
        this.data.longitudeSelected = this.data.partners[i].longitude
        this.data.latitudeSelected = this.data.partners[i].latitude
      } else {
        this.data.partners[i].show = false
      }
    }
    this.setData({
      partners: this.data.partners,
      latitudeSelected: this.data.latitudeSelected,
      longitudeSelected: this.data.longitudeSelected
    })
  },
  markertap:function(e){
    console.log(e.markerId)
  },
  callPhone: function(e){
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.phone.toString()
    })
  }
})