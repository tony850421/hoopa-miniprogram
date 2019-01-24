// pages/offers/offers.js

const AV = require('../../utils/av-weapp-min.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    offers: [],
    width: '',
    height: '',
    pending: 0
  },
  onLoad: function (options) {
    var that = this
    wx.getStorage({
      key: 'widthWithout',
      success: function (res) {
        that.setData({
          width: res.data
        })
      },
      fail: function (err) {
        wx.getSystemInfo({
          success: res => {
            that.setData({
              width: res.windowWidth
            })
            wx.setStorage({
              key: 'widthWithout',
              data: res.windowWidth
            })
          },
        })
      }
    })

    wx.getStorage({
      key: 'heightWithout',
      success: function (res) {
        that.setData({
          height: res.data
        })
      },
      fail: function (err) {
        wx.getSystemInfo({
          success: res => {
            that.setData({
              height: res.windowHeight
            })
            wx.setStorage({
              key: 'heightWithout',
              data: res.windowHeight
            })
          },
        })
      }
    })

    var user = AV.User.current()
    if (!user) {
      wx.login({
        success: res => {
          AV.User.loginWithWeapp().then(currentUser => {
            var query = new AV.Query('Offert');
            query.include('project')
            query.equalTo('user', currentUser);
            query.find().then(
              offer => {
                var countPending = 0
                for (var i = 0; i < offer.length; i++) {
                  if (offer[i].attributes.description.length > 40) {
                    var desc = ''
                    for (var x = 0; x < 41; x++) {
                      desc += offer[i].attributes.description[x]
                    }
                    desc += '...'
                    offer[i].attributes.description = desc
                  }

                  if (offer[i].attributes.project.attributes.title.length > 5) {
                    var name = ''
                    for (var x = 0; x < 5; x++) {
                      name += offer[i].attributes.project.attributes.title[x]
                    }
                    name += '...'
                    offer[i].attributes.project.attributes.title = name
                  }

                  if (offer[i].get('pending') == true) {
                    countPending = countPending + 1;
                  }
                }
                this.setData({
                  offers: offer,
                  pending: countPending
                })
              }
            )
          }).catch(console.error);
        }
      })
    } else {
      var query = new AV.Query('Offert');
      query.include('project')
      query.equalTo('user', user);
      query.find().then(
        offer => {
          var countPending = 0
          for (var i = 0; i < offer.length; i++) {

            if (offer[i].get('description').length > 40) {
              var desc = ''
              for (var x = 0; x < 41; x++) {
                desc += offer[i].get('description')[x]
              }
              desc += '...'
              offer[i].set('description', desc)
            }

            if (offer[i].get('project')) {
              if (offer[i].get('project').get('title').length > 5) {
                var name = ''
                for (var x = 0; x < 5; x++) {
                  name += offer[i].get('project').get('title')[x]
                }
                name += '...'
                offer[i].get('project').set('title', name)
              }

              if (offer[i].get('pending') == true) {
                countPending = countPending + 1;
              }
            }
          }
          
          this.setData({
            offers: offer,
            pending: countPending
          })
        }
      )
    }
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
  onShareAppMessage: function (res) {
    return {
      title: '自定义转发标题',
      path: '/index/index'
    }
  },
  goToProject: function (e) {
    var user = AV.User.current()
    if (!user) {
      wx.login({
        success: res => {
          AV.User.loginWithWeapp().then(user => {
            wx.setStorage({
              key: "projectID",
              data: e.currentTarget.dataset.id
            })
            wx.navigateTo({
              url: '../project/project',
            })
          }).catch(console.error);
        }
      })
    } else {
      wx.setStorage({
        key: "projectID",
        data: e.currentTarget.dataset.id
      })
      wx.navigateTo({
        url: '../project/project',
      })
    }
  },
  goToHome: function () {
    wx.switchTab({
      url: '../index/index',
    })
  },
  goToUser: function () {
    wx.switchTab({
      url: '../user/user',
    })
  }
})