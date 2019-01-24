// pages/mapProjectNearby/mapProjectNearby.js

const AV = require('../../utils/av-weapp-min.js');

Page({
  data: {
    height: '',
    assets: [],
    projectId: ''
  },
  onLoad: function(options) {
    wx.getSystemInfo({
      success: res => {
        this.setData({
          height: res.windowHeight
        })
      },
    })

    this.setData({
      projectId: options.projectID
    })

    var project = AV.Object.createWithoutData('Project', options.projectID)
    var query = new AV.Query('Asset')
    query.equalTo('project', project)
    query.find().then(asset => {
      var arrayAssets = []
      var cont = 0
      var ids = []

      for (var i = 0; i < asset.length; i++) {
        ids.push(asset[i].id)
        var point1 = new AV.GeoPoint(asset[i].get('location').latitude - 1.5, asset[i].get('location').longitude - 1.5);
        var point2 = new AV.GeoPoint(asset[i].get('location').latitude + 1.5, asset[i].get('location').longitude + 1.5);

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
                  id: nearby[x].id,
                  projectId: nearby[x].get('project').id,
                  name: nearby[x].get('typeArrival'),
                  direction: nearby[x].get('plainAddress'),
                  latitude: nearby[x].get('location').latitude,
                  longitude: nearby[x].get('location').longitude,
                  iconPath: "../../images/projectBlue.png",
                  width: 42,
                  height: 50
                }
              } else {
                assetAux = {
                  id: nearby[x].id,
                  projectId: nearby[x].get('project').id,
                  name: nearby[x].get('typeArrival'),
                  direction: nearby[x].get('plainAddress'),
                  latitude: nearby[x].get('location').latitude,
                  longitude: nearby[x].get('location').longitude,
                  iconPath: "../../images/project.png",
                  width: 42,
                  height: 50
                }
              }

              arrayAssets.push(nearby[x])

              this.data.assets.push(assetAux)
              this.setData({
                assets: this.data.assets
              })
            }
          }
        }).catch(function(error) {
          alert(JSON.stringify(error));
        });
      }
    })
  },
  onReady: function() {

  },
  onShow: function() {

  },
  onHide: function() {

  },
  onUnload: function() {

  },
  onPullDownRefresh: function() {

  },
  onReachBottom: function() {

  },
  onShareAppMessage: function(res) {
    return {
      title: '自定义转发标题',
      path: 'pages/index/index'
    }
  },
  markertap(e) {    
    for (var i = 0; i < this.data.assets.length; i++) {
      if (this.data.assets[i].id == e.markerId) {
        wx.navigateTo({
          url: '../project/project?projectID=' + this.data.assets[i].projectId,
        })
      }
    }
  },
})