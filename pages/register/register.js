// pages/register/register.js

const AV = require('../../utils/av-weapp-min');

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
  sendCode: function () {
    var phoneAux = this.data.phone;
    var user = AV.User.current();

    if (user) {
      user.setMobilePhoneNumber(phoneAux);
      user.save().then(function () {
        AV.Cloud.requestSmsCode({
          mobilePhoneNumber: phoneAux,
          name: '应用名称',
          op: '某种操作',
          ttl: 2
        }).then(function () {
          wx.showToast({
            title: '留言送',
            icon: 'success',
            duration: 2000
          })
          this.setData({
            buttonSendCodeDisabled: true
          })
        }, function (err) {
          console.log(err)
        });
      }, function (err) {
        console.log(err)
      });
    }
  },
  inputPhone: function (e) {
    this.setData({
      phone: e.detail.value
    })
    if (e.detail.value.length == 11) {
      this.setData({
        buttonSendCodeDisabled: false
      })
    } else {
      this.setData({
        buttonSendCodeDisabled: true
      })
    }
    if (this.data.name != '' && this.data.ci != '' && this.data.company != '' && this.data.phone != '' && this.data.code != '' && this.data.code.length == 6 && this.data.phone.length == 11) {
      this.setData({
        butonRegisterDisable: false
      })
    }
  },
  codeConfirm: function (e) {
    this.setData({
      code: e.detail.value
    })
    if (this.data.name != '' && this.data.ci != '' && this.data.company != '' && this.data.phone != '' && this.data.code != '' && this.data.code.length == 6 && this.data.phone.length == 11) {
      this.setData({
        butonRegisterDisable: false
      })
    }
  },
  inputName: function (e) {
    this.setData({
      name: e.detail.value
    })
    if (this.data.name != '' && this.data.ci != '' && this.data.company != '' && this.data.phone != '' && this.data.code != '' && this.data.code.length == 6 && this.data.phone.length == 11) {
      this.setData({
        butonRegisterDisable: false
      })
    }
  },
  inputCI: function (e) {
    this.setData({
      ci: e.detail.value
    })
    if (this.data.name != '' && this.data.ci != '' && this.data.company != '' && this.data.phone != '' && this.data.code != '' && this.data.code.length == 6 && this.data.phone.length == 11) {
      this.setData({
        butonRegisterDisable: false
      })
    }
  },
  inputCompany: function (e) {
    this.setData({
      company: e.detail.value
    })
    if (this.data.name != '' && this.data.ci != '' && this.data.company != '' && this.data.phone != '' && this.data.code != '' && this.data.code.length == 6 && this.data.phone.length == 11) {
      this.setData({
        butonRegisterDisable: false
      })
    }
  },
  register: function () {
    var user = AV.User.current();
    user.set('fullName', this.data.name);
    user.set('ci', this.data.ci);
    user.set('company', this.data.company);
    user.save();

    AV.Cloud.verifySmsCode(this.data.code, this.data.phone).then(function () {
      wx.showToast({
        title: '留言送',
        icon: 'success',
        duration: 2000,
        success: function (res) {
          wx.switchTab({
            url: '../user/user',
          })
        }
      })
    }, function (err) {
      console.log(err)
    });
  }
})