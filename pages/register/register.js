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
    buttonRegisterDisabled: true,
    codeText: '发送',
    user: {}
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
    this.setData({
      user: AV.User.current()
    })
    if (this.data.user) {
      var roleQuery = new AV.Query(AV.Role);
      roleQuery.equalTo('users', this.data.user);
      roleQuery.find().then(
        roles => {
          if (roles[0].attributes.name == "official") {
            this.setData({
              phone: this.data.user.attributes.mobilePhoneNumber,
              name: this.data.user.attributes.fullName,
              ci: this.data.user.attributes.ci,
              company: this.data.user.attributes.company
            })
          }
        }
      )
    }
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
  },
  sendCode: function () {
    var phoneAux = this.data.phone;
    var that = this

    // var user = AV.User.current();
    if (that.data.user) {
      // that.data.user.setMobilePhoneNumber(phoneAux);
      // that.data.user.save();

      AV.Cloud.requestSmsCode({
        mobilePhoneNumber: phoneAux,
        name: '应用名称',
        op: '某种操作',
        ttl: 2
      }).then(function () {

        that.setData({
          buttonSendCodeDisabled: true
        })

        var timer = 59, seconds;
        var intervalStart = setInterval(function () {
          seconds = parseInt(timer % 60, 10);
          seconds = seconds < 10 ? "0" + seconds : seconds;

          if (--timer <= 0) {
            seconds = '发送'
            that.setData({
              buttonSendCodeDisabled: false,
              buttonRegisterDisabled: true,
              code: ''
            })
            clearInterval(intervalStart)
          }

          that.setData({
            codeText: seconds
          })
        }, 1000);

        wx.showToast({
          title: '留言送',
          icon: 'success',
          duration: 2000
        })
      }, function (err) {
        wx.showModal({
          title: '错误',
          content: err.rawMessage,
        })
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
        buttonRegisterDisabled: false
      })
    }
  },
  codeConfirm: function (e) {
    this.setData({
      code: e.detail.value
    })
    if (this.data.name != '' && this.data.ci != '' && this.data.company != '' && this.data.phone != '' && this.data.code != '' && this.data.code.length == 6 && this.data.phone.length == 11) {
      this.setData({
        buttonRegisterDisabled: false
      })
    }
  },
  inputName: function (e) {
    this.setData({
      name: e.detail.value
    })
    if (this.data.name != '' && this.data.ci != '' && this.data.company != '' && this.data.phone != '' && this.data.code != '' && this.data.code.length == 6 && this.data.phone.length == 11) {
      this.setData({
        buttonRegisterDisabled: false
      })
    }
  },
  inputCI: function (e) {
    this.setData({
      ci: e.detail.value
    })
    if (this.data.name != '' && this.data.ci != '' && this.data.company != '' && this.data.phone != '' && this.data.code != '' && this.data.code.length == 6 && this.data.phone.length == 11) {
      this.setData({
        buttonRegisterDisabled: false
      })
    }
  },

  inputCompany: function (e) {
    this.setData({
      company: e.detail.value
    })
    if (this.data.name != '' && this.data.ci != '' && this.data.company != '' && this.data.phone != '' && this.data.code != '' && this.data.code.length == 6 && this.data.phone.length == 11) {
      this.setData({
        buttonRegisterDisabled: false
      })
    }
  },
  register: function () {
    var that = this
    var user = AV.User.current()
    if (user) {
      var that = this
      var name = this.data.name;
      var ci = this.data.ci;
      var company = this.data.company;
      var mobilePhone = this.data.phone;

      AV.Cloud.verifySmsCode(this.data.code, this.data.phone).then(function () {

        user.set('fullName', name);
        user.set('ci', ci);
        user.set('company', company);
        user.setMobilePhoneNumber(mobilePhone);
        user.save().then(function () { }, function (err) {
          wx.showModal({
            title: '错误',
            content: err.rawMessage,
          })
        })

        var roleQuery = new AV.Query(AV.Role);
        roleQuery.equalTo('name', 'official');
        roleQuery.find().then(function (results) {
          var role = results[0];
          var relation = role.getUsers();
          relation.add(that.data.user);
          return role.save();
        }).then(function (role) {
          //save role official in the storage
          wx.setStorage({
            key: 'role',
            data: 'official',
          })
        }).catch(function (error) {
          console.log(error);
        });

        // redirect to:
        wx.getStorage({
          key: 'redirect',
          success: function (res) {
            if (res.data == "../contact/contact") {
              wx.switchTab({
                url: res.data
              })
            } else if (res.data == "../user/user") {
              wx.switchTab({
                url: res.data
              })
            } else {
              wx.navigateTo({
                url: res.data,
              })
            }
          },
        })
      }, function (err) {
        wx.showModal({
          title: '错误',
          content: err.rawMessage,
          success: function (res) {
            that.setData({
              code: '',
              buttonSendCodeDisabled: false,
              buttonRegisterDisabled: true,
            })
          }
        })
      });
    }
  },

  goToHome: function () {
    wx.switchTab({
      url: '../index/index'
    })
  }
})