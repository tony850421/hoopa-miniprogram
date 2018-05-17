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
    partners: [
      {
        id: 0,
        name: '海岸投资',
        direction: '广州市天河区金穗路3号汇美大厦1201A',
        url: 'http://www.shoreline.com.cn/shoreli_Userne/',
        show: true,
        latitude: 45.759068,
        longitude: 126.605935,
        phone: 13818354127,
        avatar: '../../images/LogoHoopa.png',
        iconPath: "../../images/markerWork.png",
        width: 40,
        height: 50,
        callout: {
          content: '单击以调用',
          display: 'ALWAYS',
          padding: 10,
          bgColor: '#FFFFFF',
          borderRadius: 5,
        },
        classSelected: 'branchesSelected'
      },
      {
        name: '太盟投资',
        direction: '中国上海市南京西路1366号恒隆广场2座4501及4703- 4705室邮编200040',
        url: 'http://www.pagasia.com/zh-cn/',
        show: false,
        latitude: 31.553973,
        longitude: 120.253013,
        phone: 13818354121,
        avatar: '../../images/LogoHoopa.png',
        iconPath: "../../images/markerWork.png",
        id: 1,
        width: 40,
        height: 50,
        callout: {
          content: '单击以调用',
          display: 'ALWAYS',
          padding: 10,
          bgColor: '#FFFFFF',
          borderRadius: 5,
        },
        classSelected: 'branchesUnselected'
      },
      {
        name: '上海珑心资产管理有限公司',
        direction: '上海市黄浦区湖滨路222号企业天地一号楼15层',
        url: 'http://www.jsamc.com.cn/',
        show: false,
        latitude: 34.767745,
        longitude: 113.756223,
        phone: 13818354122,
        avatar: '../../images/LogoHoopa.png',
        iconPath: "../../images/markerWork.png",
        id: 2,
        width: 40,
        height: 50,
        callout: {
          content: '单击以调用',
          display: 'ALWAYS',
          padding: 10,
          bgColor: '#FFFFFF',
          borderRadius: 5,
        },
        classSelected: 'branchesUnselected'
      },
      {
        name: '上海珑心资产管理有限公司',
        direction: '上海市黄浦区湖滨路222号企业天地一号楼15层',
        url: 'http://www.longxinassets.com/',
        show: false,
        latitude: 32.046944,
        longitude: 118.800583,
        phone: 13818354123,
        avatar: '../../images/LogoHoopa.png',
        iconPath: "../../images/markerWork.png",
        id: 3,
        width: 40,
        height: 50,
        callout: {
          content: '单击以调用',
          display: 'ALWAYS',
          padding: 10,
          bgColor: '#FFFFFF',
          borderRadius: 5,
        },
        classSelected: 'branchesUnselected'
      },
      {
        name: '上海珑心资产管理有限公司',
        direction: '上海市黄浦区湖滨路222号企业天地一号楼15层',
        url: 'https://www.taobao.com/',
        show: false,
        latitude: 23.124425,
        longitude: 113.328309,
        phone: 13818354124,
        avatar: '../../images/LogoHoopa.png',
        iconPath: "../../images/markerWork.png",
        id: 4,
        width: 40,
        height: 50,
        callout: {
          content: '单击以调用',
          display: 'ALWAYS',
          padding: 10,
          bgColor: '#FFFFFF',
          borderRadius: 5,
        },
        classSelected: 'branchesUnselected'
      },
      {
        name: '上海珑心资产管理有限公司',
        direction: '上海市黄浦区湖滨路222号企业天地一号楼15层',
        url: 'http://www.zju.edu.cn/',
        show: false,
        latitude: 30.246225,
        longitude: 120.212576,
        phone: 13818354125,
        avatar: '../../images/LogoHoopa.png',
        iconPath: "../../images/markerWork.png",
        id: 5,
        width: 40,
        height: 50,
        callout: {
          content: '单击以调用',
          display: 'ALWAYS',
          padding: 10,
          bgColor: '#FFFFFF',
          borderRadius: 5,
        },
        classSelected: 'branchesUnselected'
      }
    ]
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
  tapPartner: function (e) {
    for (var i = 0; i < this.data.partners.length; i++) {
      if (this.data.partners[i].id == e.currentTarget.id) {
        this.data.partners[i].show = true
        this.data.longitudeSelected = this.data.partners[i].longitude
        this.data.latitudeSelected = this.data.partners[i].latitude
        this.data.partners[i].classSelected = 'branchesSelected'
      } else {
        this.data.partners[i].show = false
        this.data.partners[i].classSelected = 'branchesUnselected'
      }
    }
    this.setData({
      partners: this.data.partners,
      latitudeSelected: this.data.latitudeSelected,
      longitudeSelected: this.data.longitudeSelected
    })
  },
  markertap: function (e) {
    for (var i = 0; i < this.data.partners.length; i++) {
      if (this.data.partners[i].id == e.markerId) {
        wx.makePhoneCall({
          phoneNumber: this.data.partners[i].phone.toString()
        })
      }
    }
  }
})