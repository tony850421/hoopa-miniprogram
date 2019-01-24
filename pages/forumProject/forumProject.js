// pages/forumProject/forumProject.js

const AV = require('../../utils/av-weapp-min.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    height: '',
    width: '',
    inputText: '',
    messages: [],
    project: {},
    intoView: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
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
    var that = this
    wx.getStorage({
      key: 'projectID',
      success: res => {
        var query = new AV.Query("Project")
        query.get(res.data).then(p => {
          
          that.setData({
            project: p
          })
          
          var query1 = new AV.Query('ForumComment');
          query1.equalTo('project', p)
          query1.find().then( comments => {

            for (var i = 0; i < comments.length; i++) {
              comments[i].createdAt = comments[i].createdAt.toLocaleDateString('zh-CN') + " " + comments[i].createdAt.toLocaleTimeString('zh-CN')
            }

            that.setData({
              messages: comments,
              intoView: comments[comments.length - 1].id
            })
          })
        })
      }
    })
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
    return {
      title: '自定义转发标题',
      path: 'pages/index/index'
    }
  },
  bindKeyInput: function (e) {
    this.setData({
      inputText: e.detail.value
    })
  },
  confirmText: function () {
    var user = AV.User.current();
    if (user && this.data.inputText != '') {
      var query = new AV.Object('ForumComment');
      query.set('content', this.data.inputText);
      query.set('user', user);
      query.set('avatarUrl', user.get('avatarUrl'));
      query.set('project', this.data.project);
      query.save().then( comment => {

        comment.createdAt = comment.createdAt.toLocaleDateString('zh-CN') + " " + comment.createdAt.toLocaleTimeString('zh-CN')

        wx.showToast({
          title: '正确的注释',
          icon: 'success',
          duration: 2000
        })

        this.data.messages[this.data.messages.length] = comment

        this.setData({
          messages: this.data.messages,
          intoView: comment.id
        })
      })
    }

    this.setData({
      inputText: ''
    })
  },
  sendText: function () {
    this.confirmText()
  }
})