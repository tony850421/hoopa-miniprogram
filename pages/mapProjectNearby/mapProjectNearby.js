// pages/mapProjectNearby/mapProjectNearby.js

const AV = require('../../utils/av-weapp-min');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    height: '',
    assets: []   
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
    var that = this
    wx.getStorage({
      key: 'projectID',
      success: function (res) {
        var project = AV.Object.createWithoutData('Project', res.data)
        var query = new AV.Query('Asset')
        query.equalTo('project', project)
        query.find().then(asset => {
          var arrayAssets = []
          var cont = 0
          var ids = []
          for (var i = 0; i < asset.length; i++) {
            ids.push(asset[i].id)

            var point1 = new AV.GeoPoint(asset[i].attributes.location.latitude - 1.5, asset[i].attributes.location.longitude - 1.5);
            var point2 = new AV.GeoPoint(asset[i].attributes.location.latitude + 1.5, asset[i].attributes.location.longitude + 1.5);

            var queryAsset = new AV.Query('Asset');
            queryAsset.include('location');
            queryAsset.withinGeoBox('location', point1, point2);
            queryAsset.find().then(nearby => {

              for (var x = 0; x < nearby.length; x++) {
                var found = false
                for (var t = 0; t < arrayAssets.length; t++) {
                  if (arrayAssets[t].id == nearby[x].id) {
                    found = true;
                  }
                }
                if (!found) {
                  var flag = false
                  for (var j = 0; j < ids.length; j++) {
                    if (ids[j] == nearby[x].id) {
                      flag = true;
                    }
                  }
                  var assetAux = {}

                  if (flag) {
                    assetAux = {
                      name: nearby[x].attributes.typeArrival,
                      direction: nearby[x].attributes.plainAddress,
                      latitude: nearby[x].attributes.location.latitude,
                      longitude: nearby[x].attributes.location.longitude,
                      iconPath: "../../images/projectBlue.png",
                      width: 42,
                      height: 50,
                      callout: {
                        content: nearby[x].attributes.plainAddress,
                        display: 'BYCLICK',
                        padding: 10,
                        bgColor: '#FFFFFF',
                        borderRadius: 5
                      }
                    }
                  } else {
                    assetAux = {
                      name: nearby[x].attributes.typeArrival,
                      direction: nearby[x].attributes.plainAddress,
                      latitude: nearby[x].attributes.location.latitude,
                      longitude: nearby[x].attributes.location.longitude,
                      iconPath: "../../images/project.png",
                      width: 42,
                      height: 50,
                      callout: {
                        content: nearby[x].attributes.plainAddress,
                        display: 'BYCLICK',
                        padding: 10,
                        bgColor: '#FFFFFF',
                        borderRadius: 5
                      }
                    }
                  }

                  arrayAssets.push(nearby[x])

                  that.data.assets.push(assetAux)
                  that.setData({
                    assets: that.data.assets
                  })
                }
              }
            }).catch(function (error) {
              alert(JSON.stringify(error));
            });
          }
        })
      },
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

  },
  markertap: function (e) {
    for (var i = 0; i < this.data.partners.length; i++) {
      if (this.data.partners[i].id == e.markerId) {
        wx.setStorage({
          key: "projectID",
          data: this.data.partners[i].projectId
        })
        wx.navigateTo({
          url: '../project/project',
        })
      }
    }
  }
})