// pages/markers/markers.js

const AV = require('../../utils/av-weapp-min.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    longitudeSelected: '',
    latitudeSelected: '',
    height: '',
    speed: '',
    accuracy: '',
    nameSelected: '',
    directionSelected: '',
    phoneSelected: '',
    partners: []
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

    var that = this

    var Branchs = new AV.Query('Branch');
    Branchs.find().then(function(res) {      
      for (var i = 0; i < res.length; i++) {
        var id = res[i].id;
        var address = res[i].get('address');
        var name = res[i].get('name');
        var phone = res[i].get('phone');
        var latitude = parseFloat(res[i].get('latitude'));
        var longitude = parseFloat(res[i].get('longitude'));
        var iconPath = "../../images/markerWork.png";
        var width = 50;
        var height = 50;
        var selected = false;
        var show = false;
        var classSelected = 'branchesUnselected';
        if (i == 0) {
          selected = true;
          show = false;
          classSelected = 'branchesSelected';
        } else {
          selected = true;
          show = false;
          classSelected = 'branchesUnselected';
        }

        res[i].set("id", id);
        res[i].set("direction", address);
        res[i].set("name", name);
        res[i].set("phone", phone);
        res[i].set("latitude", latitude);
        res[i].set("longitude", longitude);
        res[i].set("iconPath", iconPath);
        res[i].set("width", width);
        res[i].set("height", height);
        res[i].set("selected", selected);
        res[i].set("show", show);
        res[i].set("classSelected", classSelected);

      }

      that.setData({
        partners: res,
        longitudeSelected: res[0].get('longitude'),
        latitudeSelected: res[0].get('latitude'),
        nameSelected: res[0].get('name'),
        directionSelected: res[0].get('address'),
        phoneSelected: res[0].get('phone')
      })
    });
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
      if (this.data.partners[i].get('id') == e.currentTarget.id) {
        this.data.partners[i].set('show', true)
        this.data.longitudeSelected = this.data.partners[i].get('longitude')
        this.data.latitudeSelected = this.data.partners[i].get('latitude')
        this.data.partners[i].set('classSelected', 'branchesSelected')
        this.data.partners[i].set('selected', true)
        name = this.data.partners[i].get('name')
        address = this.data.partners[i].get('direction')
        phone = this.data.partners[i].get('phone')
      } else {
        this.data.partners[i].set('show', false)
        this.data.partners[i].set('classSelected','branchesUnselected')
        this.data.partners[i].set('selected', false)
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