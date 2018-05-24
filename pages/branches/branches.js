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
        name: '浙江宝融胡巴',
        direction: '黑龙江省哈尔滨市道里区建国北六道街8号',
        show: true,
        latitude: 45.759068,
        longitude: 126.605935,
        iconPath: "../../images/markerWork.png",
        width: 42,
        height: 50,
        // callout: {
        //   content: '单击以调用',
        //   display: 'ALWAYS',
        //   padding: 10,
        //   bgColor: '#FFFFFF',
        //   borderRadius: 5,
        // },
        classSelected: 'branchesSelected'
      },
      {
        name: '无锡乐道胡巴',
        direction: '江苏省无锡市滨湖区建筑西路599号无锡国家工业设计园1栋12楼',
        show: false,
        latitude: 31.553973,
        longitude: 120.253013,
        iconPath: "../../images/markerWork.png",
        id: 1,
        width: 42,
        height: 50,
        classSelected: 'branchesUnselected'
      },
      {
        name: '河南事业部',
        direction: '河南省郑州市金水区祥盛街与民生路交叉口福晟国际2号楼7楼金台律师事务所  ',
        show: false,
        latitude: 34.767745,
        longitude: 113.756223,
        iconPath: "../../images/markerWork.png",
        id: 2,
        width: 42,
        height: 50,
        classSelected: 'branchesUnselected'
      },
      {
        name: '南京事业部',
        direction: '江苏省南京市秦淮区中山东路218号长安国际中心905室',
        show: false,
        latitude: 32.046944,
        longitude: 118.800583,
        iconPath: "../../images/markerWork.png",
        id: 3,
        width: 42,
        height: 50,
        classSelected: 'branchesUnselected'
      },
      {
        name: '擎天柱事业部',
        direction: '广东省广州市珠江新城华夏路16号盈凯广场3407室',
        show: false,
        latitude: 23.124425,
        longitude: 113.328309,
        iconPath: "../../images/markerWork.png",
        id: 4,
        width: 42,
        height: 50,
        classSelected: 'branchesUnselected'
      },
      {
        name: '创新事业部、浙江大区事业部',
        direction: '杭州市江干区城星路111号钱江国际时代广场3幢2701室',
        show: false,
        latitude: 30.246225,
        longitude: 120.212576,
        iconPath: "../../images/markerWork.png",
        id: 5,
        width: 42,
        height: 50,
        classSelected: 'branchesUnselected'
      },
      {
        name: '湖南锐达胡巴',
        direction: '湖南省长沙市芙蓉区五一大道618号',
        show: false,
        latitude: 28.201072,
        longitude: 112.995415,
        iconPath: "../../images/markerWork.png",
        id: 5,
        width: 42,
        height: 50,
        classSelected: 'branchesUnselected'
      },
      {
        name: '安徽事业部',
        direction: '安徽省合肥市徽州大道396号东方广场B座1207室',
        show: false,
        latitude: 31.855039,
        longitude: 117.293235,
        iconPath: "../../images/markerWork.png",
        id: 5,
        width: 42,
        height: 50,
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