// pages/register/register.js

const AV = require('../../utils/av-live-query-weapp-min');
const bind = require('../../utils/live-query-binding');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    height: '',
    widht: '320',
    phone: '',
    code: '',
    name: '',
    ci: '',
    company: '',
    buttonSendCodeDisabled: true,
    butonRegisterDisable: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getSystemInfo({
      success: res => {
        this.setData({
          height: res.windowHeight,
          widht: res.windowWidth
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
  senCode: function(){
    var phoneAux = this.data.phone;
    var user = AV.User.current();
    if (user) {      
      user.setMobilePhoneNumber(phoneAux);
      user.save();
      AV.User.requestMobilePhoneVerify(phoneAux).then(function () {
        // toaster when send message to phone number
        wx.showToast({
          title: 'Message sended',
          icon: 'success',
          duration: 2000
        })
        this.setData({
          buttonSendCodeDisabled: true
        })
      }, function (err) {
        console.log(err)
      });      
    }    
  },
  inputPhone: function(e){
    this.setData({
      phone: e.detail.value
    })
    if(e.detail.value.length == 11){
      this.setData({
        buttonSendCodeDisabled: false
      })
    } else {
      this.setData({
        buttonSendCodeDisabled: true
      })
    }
    if(this.data.name != '' && this.data.ci != '' && this.data.company != '' && this.data.phone != '' && this.data.code != ''){
      this.setData({
        butonRegisterDisable: false
      })
    }
  },
  codeConfirm: function(e){
    this.setData({
      code: e.detail.value
    })
    if (this.data.name != '' && this.data.ci != '' && this.data.company != '' && this.data.phone != '' && this.data.code != '') {
      this.setData({
        butonRegisterDisable: false
      })
    }
  },
  inputName: function (e) {
    this.setData({
      name: e.detail.value
    })
    if (this.data.name != '' && this.data.ci != '' && this.data.company != '' && this.data.phone != '' && this.data.code != '') {
      this.setData({
        butonRegisterDisable: false
      })
    }
  },
  inputCI: function (e) {
    this.setData({
      ci: e.detail.value
    })
    if (this.data.name != '' && this.data.ci != '' && this.data.company != '' && this.data.phone != '' && this.data.code != '') {
      this.setData({
        butonRegisterDisable: false
      })
    }
  },
  inputCompany: function (e) {
    this.setData({
      company: e.detail.value
    })
    if (this.data.name != '' && this.data.ci != '' && this.data.company != '' && this.data.phone != '' && this.data.code != '') {
      this.setData({
        butonRegisterDisable: false
      })
    }
  },
  register: function(){
    var user = AV.User.current();
    if (user) {
      user.set('fullName', this.data.name);
      user.set('ci', this.data.name);
      user.set('company', this.data.name);      
    }

    // AV.User.verifyMobilePhone(this.data.code).then(function () {
    //   console.log("good")
    // }, function (err) {
    //   console.log("bad")
    // });
  }
})