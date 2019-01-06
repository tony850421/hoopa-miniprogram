// pages/projects/projects.js

const AV = require('../../utils/av-weapp-min');
const AVLive = require('../../utils/av-live-query-weapp-min');
const bind = require('../../utils/live-query-binding');

var offersProduct = [];

Page({
  data: {
    height: '',
    width: '',
    products: [],
    offers: [],
    permitScroll: false,
    inputShowed: false,
    inputVal: "",
    list: [{
        id: 'type',
        name: '类型',
        nameShow: '类型',
        open: false,
        pages: ['类型', '住宅', '写字楼', '厂房', '土地', '商住', '商铺', '在建工程', '机械设备，存货，原材料', '林权', '海域使用权', '无抵押', '其他']
      },
      {
        id: 'province',
        name: '区域无限制',
        nameShow: '区域无限制',
        open: false,
        pages: ['区域无限制', '安徽省', '北京市', '重庆市', '福建省', '广东省', '甘肃省', '广西壮族自治区', '贵州省', '河南省', '湖北省', '河北省', '海南省', '香港特别行政区', '黑龙江省', '湖南省', '吉林省', '江苏省', '江西省', '辽宁省', '澳门特别行政区', '內蒙古自治区', '宁夏回族自治区', '青海省', '四川省', '山东省', '上海市', '陕西省', '山西省', '天津市', '台湾省', '新疆维吾尔自治区', '西藏自治区', '云南省', '浙江省']
      },
      {
        id: 'price',
        name: '本金无限制',
        nameShow: '本金无限制',
        open: false,
        pages: ['本金无限制', '500万', '500-1000万', '1000-1500万', '1500-2000万', '2000-2500万', '2500-3000万', '3000-3500万', '3500-4000万', '4000-4500万', '4500-5000万', '5000-5500万', '5500-6000万', '6000万']
      }
    ],
    searchLoading: false, //"上拉加载"的变量，默认false，隐藏  
    searchLoadingComplete: false //“没有数据”的变量，默认false，隐藏  
  },
  onLoad: function(options) {
    wx.getSystemInfo({
      success: res => {
        this.setData({
          height: res.windowHeight,
          width: res.windowWidth
        })
      },
    })

    var that = this
    wx.getStorage({
      key: 'type',
      success: function(res) {
        const query = new AV.Query('Project');
        if (res.data == '推荐') {
          query.equalTo('isRecommended', true)
          query.include('creator');
          query.include('image');
          query.descending('createdAt');
          query.find().then(res => {

            that.setData({
              products: []
            })
            var arrivalType = []
            var provinces = ''
            for (var i = 0; i < res.length; i++) {
              var typeArr = res[i].get('typeArrivalString')
              arrivalType = typeArr.split('+')
              arrivalType.splice(0, 1)
              provinces = res[i].get('provinceString')
              provinces = provinces.substr(1)

              var pAux = provinces
              if (provinces.length > 12) {
                var pAux = ''
                for (var t = 0; t < 12; t++) {
                  pAux = pAux + provinces[t]
                }
                pAux = pAux + "..."
              }
              provinces = pAux

              var arrivalTypeTags = []

              for (var x = 0; x < arrivalType.length; x++) {
                var flag = false;
                for (var t = 0; t < arrivalTypeTags.length; t++) {
                  if (arrivalType[x] == arrivalTypeTags[t]) {
                    flag = true;
                  }
                }
                if (!flag) {
                  arrivalTypeTags.push(arrivalType[x])
                }
              }

              var lengthTitle = 50;

              if (this.data.width < 360) {
                lengthTitle = 12
              } else if (this.data.width < 361) {
                lengthTitle = 15
              } else if (this.data.width < 376) {
                lengthTitle = 16
              } else if (this.data.width < 415) {
                lengthTitle = 19
              } else if (this.data.width < 481) {
                lengthTitle = 23
              }

              var title = res[i].get('title')
              var tAux = title
              if (title.length >= lengthTitle) {
                var tAux = ''
                for (var x = 0; x < lengthTitle-1; x++) {
                  tAux = tAux + title[x]
                }
                tAux = tAux + "..."
              }
              title = tAux

              res[i].set('title', title)
              res[i].set('provincesTags', provinces)
              res[i].set('province', res[i].get('province'))
              res[i].set('tags', arrivalTypeTags)
              res[i].set('mainImage', res[i].get('image').thumbnailURL(320, 240, 100))
            }

            that.setData({
              products: res
            })
          })
        } else if (res.data == '热门资产') {
          query.equalTo('isHot', true);
          query.include('creator');
          query.include('image');
          query.descending('createdAt');
          query.find().then(res => {

            that.setData({
              products: []
            })
            var arrivalType = []
            var provinces = ''
            for (var i = 0; i < res.length; i++) {
              var typeArr = res[i].get('typeArrivalString')
              arrivalType = typeArr.split('+')
              arrivalType.splice(0, 1)
              provinces = res[i].get('provinceString')
              provinces = provinces.substr(1)

              var pAux = provinces
              if (provinces.length > 12) {
                var pAux = ''
                for (var t = 0; t < 12; t++) {
                  pAux = pAux + provinces[t]
                }
                pAux = pAux + "..."
              }
              provinces = pAux

              var arrivalTypeTags = []

              for (var x = 0; x < arrivalType.length; x++) {
                var flag = false;
                for (var t = 0; t < arrivalTypeTags.length; t++) {
                  if (arrivalType[x] == arrivalTypeTags[t]) {
                    flag = true;
                  }
                }
                if (!flag) {
                  arrivalTypeTags.push(arrivalType[x])
                }
              }

              var lengthTitle = 50;

              if (this.data.width < 360) {
                lengthTitle = 12
              } else if (this.data.width < 361) {
                lengthTitle = 15
              } else if (this.data.width < 376) {
                lengthTitle = 16
              } else if (this.data.width < 415) {
                lengthTitle = 19
              } else if (this.data.width < 481) {
                lengthTitle = 23
              }

              var title = res[i].get('title')
              var tAux = title
              if (title.length >= lengthTitle) {
                var tAux = ''
                for (var x = 0; x < lengthTitle - 1; x++) {
                  tAux = tAux + title[x]
                }
                tAux = tAux + "..."
              }
              title = tAux

              res[i].set('title', title)
              res[i].set('provincesTags', provinces)
              res[i].set('province', res[i].get('province'))
              res[i].set('tags', arrivalTypeTags)
              res[i].set('mainImage', res[i].get('image').thumbnailURL(320, 240, 100))
            }

            that.setData({
              products: res
            })
          })
        } else if (res.data == '高性价比住宅') {
          query.equalTo('isHouse', true);
          query.include('creator');
          query.include('image');
          query.descending('createdAt');
          query.find().then(res => {

            that.setData({
              products: []
            })
            var arrivalType = []
            var provinces = ''
            for (var i = 0; i < res.length; i++) {
              var typeArr = res[i].get('typeArrivalString')
              arrivalType = typeArr.split('+')
              arrivalType.splice(0, 1)
              provinces = res[i].get('provinceString')
              provinces = provinces.substr(1)

              var pAux = provinces
              if (provinces.length > 12) {
                var pAux = ''
                for (var t = 0; t < 12; t++) {
                  pAux = pAux + provinces[t]
                }
                pAux = pAux + "..."
              }
              provinces = pAux

              var arrivalTypeTags = []

              for (var x = 0; x < arrivalType.length; x++) {
                var flag = false;
                for (var t = 0; t < arrivalTypeTags.length; t++) {
                  if (arrivalType[x] == arrivalTypeTags[t]) {
                    flag = true;
                  }
                }
                if (!flag) {
                  arrivalTypeTags.push(arrivalType[x])
                }
              }

              var lengthTitle = 50;

              if (this.data.width < 360) {
                lengthTitle = 12
              } else if (this.data.width < 361) {
                lengthTitle = 15
              } else if (this.data.width < 376) {
                lengthTitle = 16
              } else if (this.data.width < 415) {
                lengthTitle = 19
              } else if (this.data.width < 481) {
                lengthTitle = 23
              }

              var title = res[i].get('title')
              var tAux = title
              if (title.length >= lengthTitle) {
                var tAux = ''
                for (var x = 0; x < lengthTitle - 1; x++) {
                  tAux = tAux + title[x]
                }
                tAux = tAux + "..."
              }
              title = tAux

              res[i].set('title', title)
              res[i].set('provincesTags', provinces)
              res[i].set('province', res[i].get('province'))
              res[i].set('tags', arrivalTypeTags)
              res[i].set('mainImage', res[i].get('image').thumbnailURL(320, 240, 100))
            }

            that.setData({
              products: res
            })
          })
        } else if (res.data == '江浙沪地区优质厂房') {
          query.equalTo('isFactory', true);
          query.include('creator');
          query.include('image');
          query.descending('createdAt');
          query.find().then(res => {

            that.setData({
              products: []
            })
            var arrivalType = []
            var provinces = ''
            for (var i = 0; i < res.length; i++) {
              var typeArr = res[i].get('typeArrivalString')
              arrivalType = typeArr.split('+')
              arrivalType.splice(0, 1)
              provinces = res[i].get('provinceString')
              provinces = provinces.substr(1)

              var pAux = provinces
              if (provinces.length > 12) {
                var pAux = ''
                for (var t = 0; t < 12; t++) {
                  pAux = pAux + provinces[t]
                }
                pAux = pAux + "..."
              }
              provinces = pAux

              var arrivalTypeTags = []

              for (var x = 0; x < arrivalType.length; x++) {
                var flag = false;
                for (var t = 0; t < arrivalTypeTags.length; t++) {
                  if (arrivalType[x] == arrivalTypeTags[t]) {
                    flag = true;
                  }
                }
                if (!flag) {
                  arrivalTypeTags.push(arrivalType[x])
                }
              }

              var lengthTitle = 50;

              if (this.data.width < 360) {
                lengthTitle = 12
              } else if (this.data.width < 361) {
                lengthTitle = 15
              } else if (this.data.width < 376) {
                lengthTitle = 16
              } else if (this.data.width < 415) {
                lengthTitle = 19
              } else if (this.data.width < 481) {
                lengthTitle = 23
              }

              var title = res[i].get('title')
              var tAux = title
              if (title.length >= lengthTitle) {
                var tAux = ''
                for (var x = 0; x < lengthTitle - 1; x++) {
                  tAux = tAux + title[x]
                }
                tAux = tAux + "..."
              }
              title = tAux

              res[i].set('title', title)
              res[i].set('provincesTags', provinces)
              res[i].set('province', res[i].get('province'))
              res[i].set('tags', arrivalTypeTags)
              res[i].set('mainImage', res[i].get('image').thumbnailURL(320, 240, 100))
            }

            that.setData({
              products: res
            })
          })
        } else if (res.data == '热推商铺土地全包资产') {
          const query = new AV.Query('Project');
          query.equalTo('isShop', true);
          query.include('creator');
          query.include('image');
          query.descending('createdAt');
          query.find().then(res => {

            that.setData({
              products: []
            })
            var arrivalType = []
            var provinces = ''
            for (var i = 0; i < res.length; i++) {
              var typeArr = res[i].get('typeArrivalString')
              arrivalType = typeArr.split('+')
              arrivalType.splice(0, 1)
              provinces = res[i].get('provinceString')
              provinces = provinces.substr(1)

              var pAux = provinces
              if (provinces.length > 12) {
                var pAux = ''
                for (var t = 0; t < 12; t++) {
                  pAux = pAux + provinces[t]
                }
                pAux = pAux + "..."
              }
              provinces = pAux

              var arrivalTypeTags = []

              for (var x = 0; x < arrivalType.length; x++) {
                var flag = false;
                for (var t = 0; t < arrivalTypeTags.length; t++) {
                  if (arrivalType[x] == arrivalTypeTags[t]) {
                    flag = true;
                  }
                }
                if (!flag) {
                  arrivalTypeTags.push(arrivalType[x])
                }
              }

              var lengthTitle = 50;

              if (this.data.width < 360) {
                lengthTitle = 12
              } else if (this.data.width < 361) {
                lengthTitle = 15
              } else if (this.data.width < 376) {
                lengthTitle = 16
              } else if (this.data.width < 415) {
                lengthTitle = 19
              } else if (this.data.width < 481) {
                lengthTitle = 23
              }

              var title = res[i].get('title')
              var tAux = title
              if (title.length >= lengthTitle) {
                var tAux = ''
                for (var x = 0; x < lengthTitle - 1; x++) {
                  tAux = tAux + title[x]
                }
                tAux = tAux + "..."
              }
              title = tAux

              res[i].set('title', title)
              res[i].set('provincesTags', provinces)
              res[i].set('province', res[i].get('province'))
              res[i].set('tags', arrivalTypeTags)
              res[i].set('mainImage', res[i].get('image').thumbnailURL(320, 240, 100))
            }

            that.setData({
              products: res
            })
          })
        }
        that.setData({
          permitScroll: false
        })
      },
      fail: function() {
        that.setData({
          permitScroll: true
        })
        that.applyFilters()
      }
    })
  },
  onReady: function() {
    const user = AV.User.current();
  },
  onUnload: function() {},
  onPullDownRefresh: function() {},
  onShow: function() {

  },
  onHide: function() {

  },
  onReachBottom: function() {

  },
  onShareAppMessage: function(res) {
    return {
      title: '自定义转发标题',
      path: '/index/index'
    }
  },
  makeAnOffer: function() {

  },
  goToProject: function(e) {
    var user = AV.User.current()
    if (!user) {
      wx.login({
        success: res => {
          AV.User.loginWithWeapp().then(user => {
            wx.navigateTo({
              url: '../project/project?projectID=' + e.currentTarget.id,
            })
          }).catch(console.error);
        }
      })
    } else {
      wx.navigateTo({
        url: '../project/project?projectID=' + e.currentTarget.id,
      })
    }
  },
  showInput: function() {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function() {
    this.search();
  },
  clearInput: function() {
    this.setData({
      inputVal: "",
      inputShowed: false
    });

    this.data.products = []

    this.setData({
      products: this.data.products
    })

    this.applyFilters()
  },
  inputTyping: function(e) {
    this.setData({
      inputVal: e.detail.value
    });
    this.closeFilters();
  },
  kindToggle: function(e) {
    var id = e.currentTarget.id,
      list = this.data.list;
    for (var i = 0, len = list.length; i < len; ++i) {
      if (list[i].id == id) {
        list[i].open = !list[i].open
      } else {
        list[i].open = false
      }
    }
    this.setData({
      list: list
    });
  },
  selectFilter: function(e) {
    for (var i = 0; i < this.data.list.length; i++) {
      if (this.data.list[i].id == e.target.dataset.filterheader) {
        this.data.list[i].name = this.data.list[i].pages[e.target.dataset.filter]
      }
      this.data.list[i].open = false
    }

    this.setData({
      list: this.data.list
    })

    this.data.products = []

    this.setData({
      products: this.data.products
    })

    this.applyFilters()
  },
  search: function() {
    this.data.products = []

    this.setData({
      products: this.data.products
    })

    this.applyFilters()
  },
  closeFilters: function() {
    for (var i = 0; i < this.data.list.length; i++) {
      this.data.list[i].open = false
    }

    this.setData({
      list: this.data.list
    })
  },
  bindscrolltolower: function(e) {
    if (this.data.permitScroll) {
      this.applyFilters()
    }
  },
  applyFilters: function() {
    wx.removeStorage({
      key: 'type',
      success: function(res) {},
    })

    const user = AV.User.current()
    wx.showToast({
      title: '加载包',
      icon: 'loading',
      duration: 1000
    })

    var queryType = new AV.Query('Project')
    if (this.data.list[0].name != '类型') {
      queryType.contains('typeArrivalString', this.data.list[0].name)
    }

    var queryProvince = new AV.Query('Project');
    if (this.data.list[1].name != '区域无限制') {
      queryProvince.contains('provinceString', this.data.list[1].name);
    }

    var query = '';
    switch (this.data.list[2].name) {
      case '本金无限制':
        query = new AV.Query('Project');
        break;
      case '500万':
        query = new AV.Query('Project');
        query.lessThanOrEqualTo('debitAmount', 500);
        break;
      case '500-1000万':
        var query2 = new AV.Query('Project');
        query2.greaterThan('debitAmount', 500);
        var query1 = new AV.Query('Project');
        query1.lessThanOrEqualTo('debitAmount', 1000);
        var query = AV.Query.and(query2, query1);
        break;
      case '1000-1500万':
        var query2 = new AV.Query('Project');
        query2.greaterThan('debitAmount', 1000);
        var query1 = new AV.Query('Project');
        query1.lessThanOrEqualTo('debitAmount', 1500);
        var query = AV.Query.and(query2, query1);
        break;
      case '1500-2000万':
        var query2 = new AV.Query('Project');
        query2.greaterThan('debitAmount', 1500);
        var query1 = new AV.Query('Project');
        query1.lessThanOrEqualTo('debitAmount', 2000);
        var query = AV.Query.and(query2, query1);
        break;
      case '2000-2500万':
        var query2 = new AV.Query('Project');
        query2.greaterThan('debitAmount', 2000);
        var query1 = new AV.Query('Project');
        query1.lessThanOrEqualTo('debitAmount', 2500);
        var query = AV.Query.and(query2, query1);
        break;
      case '2500-3000万':
        var query2 = new AV.Query('Project');
        query2.greaterThan('debitAmount', 2500);
        var query1 = new AV.Query('Project');
        query1.lessThanOrEqualTo('debitAmount', 3000);
        var query = AV.Query.and(query2, query1);
        break;
      case '3000-3500万':
        var query2 = new AV.Query('Project');
        query2.greaterThan('debitAmount', 3000);
        var query1 = new AV.Query('Project');
        query1.lessThanOrEqualTo('debitAmount', 3500);
        var query = AV.Query.and(query2, query1);
        break;
      case '3500-4000万':
        var query2 = new AV.Query('Project');
        query2.greaterThan('debitAmount', 3500);
        var query1 = new AV.Query('Project');
        query1.lessThanOrEqualTo('debitAmount', 4000);
        var query = AV.Query.and(query2, query1);
        break;
      case '4000-4500万':
        var query2 = new AV.Query('Project');
        query2.greaterThan('debitAmount', 4000);
        var query1 = new AV.Query('Project');
        query1.lessThanOrEqualTo('debitAmount', 4500);
        var query = AV.Query.and(query2, query1);
        break;
      case '4500-5000万':
        var query2 = new AV.Query('Project');
        query2.greaterThan('debitAmount', 4500);
        var query1 = new AV.Query('Project');
        query1.lessThanOrEqualTo('debitAmount', 5000);
        var query = AV.Query.and(query2, query1);
        break;
      case '5000-5500万':
        var query2 = new AV.Query('Project');
        query2.greaterThan('debitAmount', 5000);
        var query1 = new AV.Query('Project');
        query1.lessThanOrEqualTo('debitAmount', 5500);
        var query = AV.Query.and(query2, query1);
        break;
      case '5500-6000万':
        var query2 = new AV.Query('Project');
        query2.greaterThan('debitAmount', 5500);
        var query1 = new AV.Query('Project');
        query1.lessThanOrEqualTo('debitAmount', 6000);
        var query = AV.Query.and(query2, query1);
        break;
      case '6000万':
        query = new AV.Query('Project');
        query.greaterThan('debitAmount', 6000);
        break;
      default:
        query = new AV.Query('Project');
        break;
    }

    var queryAnd = AV.Query.and(queryProvince, query, queryType);

    var queryProjectTitle = new AV.Query('Project')
    queryProjectTitle.contains('title', this.data.inputVal)

    var queryDescription = new AV.Query('Project')
    queryDescription.contains('description', this.data.inputVal)

    var compoundQuery = AV.Query.or(queryDescription, queryProjectTitle)
    var queryAndSearchBar = AV.Query.and(queryAnd, compoundQuery);

    queryAndSearchBar.limit(7);
    queryAndSearchBar.skip(this.data.products.length);
    queryAndSearchBar.descending('createdAt')
    queryAndSearchBar.find().then(res => {

      var arrivalType = []
      var provinces = ''
      var province = ''
      for (var i = 0; i < res.length; i++) {
        var typeArr = res[i].get('typeArrivalString')
        provinces = res[i].get('provinceString')
        province = res[i].get('province')
        arrivalType = typeArr.split('+')
        arrivalType.splice(0, 1)
        provinces = provinces.substr(1)

        var pAux = provinces
        if (provinces.length > 12) {
          var pAux = ''
          for (var t = 0; t < 12; t++) {
            pAux = pAux + provinces[t]
          }
          pAux = pAux + "..."
        }
        provinces = pAux

        var arrivalTypeTags = []

        for (var x = 0; x < arrivalType.length; x++) {
          var flag = false;
          for (var t = 0; t < arrivalTypeTags.length; t++) {
            if (arrivalType[x] == arrivalTypeTags[t]) {
              flag = true;
            }
          }
          if (!flag) {
            arrivalTypeTags.push(arrivalType[x])
          }
        }

        var lengthTitle = 50;
        
        if (this.data.width < 360) {
          lengthTitle = 12
        } else if (this.data.width < 361) {
          lengthTitle =  15
        } else if (this.data.width < 376) {
          lengthTitle =  16
        } else if (this.data.width < 415) {
          lengthTitle = 19
        } else if (this.data.width < 481) {
          lengthTitle = 23
        }

        var title = res[i].get('title')
        var tAux = title
        if (title.length >= lengthTitle) {
          var tAux = ''
          for (var x = 0; x < lengthTitle-1; x++) {
            tAux = tAux + title[x]
          }
          tAux = tAux + "..."
        }
        title = tAux

        res[i].set('provincesTags', provinces)
        res[i].set('province', province)
        res[i].set('title', title)
        res[i].set('tags', arrivalTypeTags)
        res[i].set('mainImage', res[i].get('image').thumbnailURL(320, 240, 100))


        this.setWish(res, i, res[i], user)
        // this.setCountLove(res, i, res[i], user)
        // this.setCountVisit(res, i, res[i], user)
        // this.data.products = this.data.products.concat(res[i])
      }

      this.setData({
        products: this.data.products
      })
    })

    if (this.data.list[0].name.length > 5) {
      this.data.list[0].nameShow = this.data.list[0].name[0] + this.data.list[0].name[1] + this.data.list[0].name[2] + this.data.list[0].name[3] + "..."
    } else {
      this.data.list[0].nameShow = this.data.list[0].name
    }

    if (this.data.list[1].name.length > 5) {
      this.data.list[1].nameShow = this.data.list[1].name[0] + this.data.list[1].name[1] + this.data.list[1].name[2] + this.data.list[1].name[3] + "..."
    } else {
      this.data.list[1].nameShow = this.data.list[1].name
    }

    if (this.data.list[2].name.length > 5) {
      this.data.list[2].nameShow = this.data.list[2].name[0] + this.data.list[2].name[1] + this.data.list[2].name[2] + this.data.list[2].name[3] + "..."
    } else {
      this.data.list[2].nameShow = this.data.list[2].name
    }

    this.setData({
      list: this.data.list
    });
  },
  sendToShopCar: function(e) {
    const user = AV.User.current()
    if (user) {
      var query = new AV.Query("Project")
      query.include('projectManager')
      query.get(e.currentTarget.id).then(project => {
        var shop = new AV.Object('ShopCar')
        shop.set('user', user)
        shop.set('checked', false);
        shop.set('project', project)
        shop.save().then(res => {
          for (var i = 0; i < this.data.products.length; i++) {
            if (this.data.products[i].id == e.currentTarget.id) {
              this.data.products[i].set('wished', true);
              break;
            }
          }
          this.setData({
            products: this.data.products
          })
        }).catch(console.error);
      }).catch(console.error);
    }
  },
  setWish: function(array, index, project, user) {
    var query = new AV.Query("ShopCar")
    query.equalTo("project", project)
    query.equalTo("user", user)
    query.count().then(res => {
      if (res > 0) {
        array[index].set("wished", true)
      } else {
        array[index].set("wished", false)
      }
      array[index].set("countLove", res)
      this.data.products.splice(index, 0, array[index])
      // this.data.products = this.data.products.concat(array[index])
      this.setData({
        products: this.data.products
      })
    }).catch(console.error);

    // var query6 = new AV.Query("ProjectVisit")
    // query6.equalTo('project', project)
    // query6.count().then(visit => {
    //   array[index].set("countVisit", visit)
    //   this.data.products.splice(index, 0, array[index])
    //   // this.data.products = this.data.products.concat(array[index])
    //   this.setData({
    //     products: this.data.products
    //   })
    // }).catch(console.error);
  },
  // setCountLove: function (array, index, project, user) {
  //   var query = new AV.Query("ShopCar")
  //   query.equalTo("project", project)
  //   query.equalTo("user", user)
  //   query.count().then(res => {
  //     array[index].set("countLove", res)
  //     this.data.products.splice(index, 1)
  //     this.data.products = this.data.products.concat(array[index])
  //     this.setData({
  //       products: this.data.products
  //     })
  //   }).catch(console.error);
  // },
  // setCountVisit: function (array, index, project, user) {
  //   var query6 = new AV.Query("ProjectVisit")
  //   query6.equalTo('project', project)
  //   query6.count().then(visit => {
  //     array[index].set("countVisit", visit)
  //     this.data.products.splice(index, 1)
  //     this.data.products = this.data.products.concat(array[index])
  //     this.setData({
  //       products: this.data.products
  //     })
  //   }).catch(console.error);
  // },
  removeWish: function(e) {
    var that = this
    const user = AV.User.current()
    var query = new AV.Query("Project")
    query.include('projectManager')
    query.get(e.currentTarget.id).then(project => {
      var query = new AV.Query("ShopCar")
      query.equalTo("project", project)
      query.equalTo("user", user)
      query.find().then(res => {
        for (var i = 0; i < res.length; i++) {
          var product = AV.Object.createWithoutData('ShopCar', res[i].id);
          product.destroy().then(function(prod) {
            for (var i = 0; i < that.data.products.length; i++) {
              if (that.data.products[i].id == e.currentTarget.id) {
                that.data.products[i].set('wished', false);
                break;
              }
            }
            that.setData({
              products: that.data.products
            })
          }).catch(console.error);
        }
      }).catch(console.error);
    }).catch(console.error);
  },
  goToOffer: function(e) {
    wx.setStorage({
      key: "projectID",
      data: e.currentTarget.id
    })
    wx.navigateTo({
      url: '../offer/offer',
    })
  }
})