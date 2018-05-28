// pages/projects/projects.js

const AV = require('../../utils/av-weapp-min');
const AVLive = require('../../utils/av-live-query-weapp-min');
const bind = require('../../utils/live-query-binding');

var offersProduct = [];

Page({
  data: {
    height: '',
    products: [],
    offers: [],
    inputShowed: false,
    inputVal: "",
    list: [
      {
        id: 'type',
        name: '抵押物类型',
        nameShow: '抵押物类型',
        open: false,
        pages: ['抵押物类型', '住宅', '商铺', '写字楼', '厂房', '在建工程', '机械设备，存货，原材料', '土地（无厂房', '林权', '海城使用权', '商住', '无抵押', '其他']
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
    searchLoadingComplete: false  //“没有数据”的变量，默认false，隐藏  
  },
  onLoad: function (options) {
    this.applyFilters()

    wx.getSystemInfo({
      success: res => {
        this.setData({
          height: res.windowHeight
        })
      },
    })
  },
  onReady: function () {
    const user = AV.User.current();
  },
  onUnload: function () {
  },
  onPullDownRefresh: function () {
  },
  onShow: function () {

  },
  onHide: function () {

  },
  onReachBottom: function () {

  },
  onShareAppMessage: function () {

  },
  makeAnOffer: function () {

  },
  goToProject: function (e) {
    var user = AV.User.current()
    if (!user) {
      wx.login({
        success: res => {
          AV.User.loginWithWeapp().then(user => {
            wx.setStorage({
              key: "projectID",
              data: e.currentTarget.id
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
        data: e.currentTarget.id
      })
      wx.navigateTo({
        url: '../project/project',
      })
    }
  },
  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function () {
    this.search();
  },
  clearInput: function () {
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
  inputTyping: function (e) {
    this.setData({
      inputVal: e.detail.value
    });
    this.closeFilters();
  },
  kindToggle: function (e) {
    var id = e.currentTarget.id, list = this.data.list;
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
  selectFilter: function (e) {
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
  search: function () {
    this.data.products = []

    this.setData({
      products: this.data.products
    })

    this.applyFilters()
  },
  closeFilters: function () {
    for (var i = 0; i < this.data.list.length; i++) {
      this.data.list[i].open = false
    }

    this.setData({
      list: this.data.list
    })
  },
  bindscrolltolower: function (e) {
    this.applyFilters()
  },
  applyFilters: function () {

    var queryType = new AV.Query('Project')
    if (this.data.list[0].name != '抵押物类型') {
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
      for (var i = 0; i < res.length; i++) {
        var typeArr = res[i].get('typeArrivalString')
        provinces = res[i].get('provinceString')
        arrivalType = typeArr.split('+')
        arrivalType.splice(0, 1)
        provinces = provinces.substr(1)

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

        res[i].set('provincesTags', provinces)
        res[i].set('tags', arrivalTypeTags)
        res[i].set('mainImage', res[i].get('image').thumbnailURL(80, 75, 100))
        this.data.products = this.data.products.concat(res[i])
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
  }
})