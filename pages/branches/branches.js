// pages/markers/markers.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    longitudeSelected: 120.200631,
    latitudeSelected: 30.211588,
    height: '',
    speed: '',
    accuracy: '',
    nameSelected: '杭州总部',
    directionSelected: '杭州市滨江区滨盛路1786号汉氏大厦15F',
    phoneSelected: '+864008001682',
    partners: [{
        id: 0,
        name: '杭州总部',
        direction: '杭州市滨江区滨盛路1786号汉氏大厦15F',
        show: true,
        latitude: 30.208980,
        longitude: 120.205131,
        iconPath: "../../images/markerWork.png",
        width: 50,
        height: 50,
        classSelected: 'branchesSelected',
        selected: true,
        phone: '+864008001682'
      },
      {
        id: 1,
        name: '浙江宝融胡巴投资管理有限公司',
        direction: '黑龙江省哈尔滨市道里区建国北六道街8号院内独栋四楼',
        show: false,
        latitude: 45.759068,
        longitude: 126.605935,
        iconPath: "../../images/markerWork.png",
        width: 50,
        height: 50,
        classSelected: 'branchesUnselected',
        selected: false,
        phone: '+86045158958877'
      },
      {
        name: '无锡乐道胡巴投资管理有限公司',
        direction: '无锡市滨海区建筑西路599号无锡国家工业设计园1栋12楼',
        show: false,
        latitude: 31.553973,
        longitude: 120.253013,
        iconPath: "../../images/markerWork.png",
        id: 2,
        width: 50,
        height: 50,
        classSelected: 'branchesUnselected',
        selected: false,
        phone: '+86051085162133'
      },
      {
        name: '河南事业部',
        direction: '郑州市民生路与祥盛街交叉口福晟国际2号楼7楼  ',
        show: false,
        latitude: 34.767745,
        longitude: 113.756223,
        iconPath: "../../images/markerWork.png",
        id: 3,
        width: 50,
        height: 50,
        classSelected: 'branchesUnselected',
        selected: false,
        phone: '+8617398963601'
      },
      {
        name: '南京事业部',
        direction: '南京市中山东路东路218号长安国际中心905室',
        show: false,
        latitude: 32.046944,
        longitude: 118.800583,
        iconPath: "../../images/markerWork.png",
        id: 4,
        width: 50,
        height: 50,
        classSelected: 'branchesUnselected',
        selected: false,
        phone: '+8602552240552'
      },
      {
        name: '广州事业部',
        direction: '广州市珠江新城华夏路16号富力盈凯广场3407室',
        show: false,
        latitude: 23.124425,
        longitude: 113.328309,
        iconPath: "../../images/markerWork.png",
        id: 5,
        width: 50,
        height: 50,
        classSelected: 'branchesUnselected',
        selected: false,
        phone: '+8618947286690'
      },
      {
        name: '杭州总部',
        direction: '杭州市江干区城星路111号钱江国际时代广场3幢2701室',
        show: false,
        latitude: 30.246225,
        longitude: 120.212576,
        iconPath: "../../images/markerWork.png",
        id: 6,
        width: 50,
        height: 50,
        classSelected: 'branchesUnselected',
        selected: false,
        phone: '+86057185267521'
      },
      {
        name: '长沙锐达胡巴商务咨询有限公司',
        direction: '长沙市芙蓉区银华大酒店4楼',
        show: false,
        latitude: 28.201072,
        longitude: 112.995415,
        iconPath: "../../images/markerWork.png",
        id: 7,
        width: 50,
        height: 50,
        classSelected: 'branchesUnselected',
        selected: false,
        phone: '+8615857133501'
      },
      {
        name: '合肥胡巴资产管理有限公司',
        direction: '合肥市徽州大道396号东方广场B座12层',
        show: false,
        latitude: 31.855039,
        longitude: 117.293235,
        iconPath: "../../images/markerWork.png",
        id: 8,
        width: 50,
        height: 50,
        classSelected: 'branchesUnselected',
        selected: false,
        phone: '+86055165616683'
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
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
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    wx.setNavigationBarTitle({
      title: '机构',
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function(res) {
    return {
      title: '自定义转发标题',
      path: '/index/index'
    }
  },
  tapPartner: function(e) {
    var name = ''
    var address = ''
    var phone = ''

    for (var i = 0; i < this.data.partners.length; i++) {
      if (this.data.partners[i].id == e.currentTarget.id) {
        this.data.partners[i].show = true
        this.data.longitudeSelected = this.data.partners[i].longitude
        this.data.latitudeSelected = this.data.partners[i].latitude
        this.data.partners[i].classSelected = 'branchesSelected'
        this.data.partners[i].selected = true
        name = this.data.partners[i].name
        address = this.data.partners[i].direction
        phone = this.data.partners[i].phone
      } else {
        this.data.partners[i].show = false
        this.data.partners[i].classSelected = 'branchesUnselected'
        this.data.partners[i].selected = false
      }
    }
    this.setData({
      partners: this.data.partners,
      latitudeSelected: this.data.latitudeSelected,
      longitudeSelected: this.data.longitudeSelected,
      nameSelected: name,
      directionSelected: address,
      phoneSelected: phone
    })
  },
  callPhoneNumber: function(e) {
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.phone.toString()
    })
  },
  navigationToPartnet: function() {
    wx.openLocation({
      latitude: this.data.latitudeSelected,
      longitude: this.data.longitudeSelected,
      name: this.data.nameSelected,
      scale: 28
    })
  }
})