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
        name: '住宅用地',
        open: false,
        pages: ['住宅用地', '仓储用地', '商业服务业用地', '旅游业用地', '金融服务业用地', '市政公用设施用地', '绿代用地', '公共建筑用地', '文/体/娱用地', '机关/宣传用地', '科研设计用地', '教育用地', '医卫用地', '交通用地', '铁路用地', '民用机场用地', '港口码头用地', '其他交通用地', '土地+房产', '写字楼', '仓储', '商铺', '商业住宅', '住宅', '车位', '林地', '停车场', '宅基地', '在建工程', '厂房', '预售房产', '矿产', '动产', '项目信息', '金融账户', '股权信息', '应收账款', '承租权', '特许经营权', '知识产权']
      },
      {
        id: 'province',
        name: '安徽省',
        open: false,
        pages: ['安徽省', '北京市', '重庆市', '福建省', '广东省', '甘肃省', '广西壮族自治区', '贵州省', '河南省', '湖北省', '河北省', '海南省', '香港特别行政区', '黑龙江省', '湖南省', '吉林省', '江苏省', '江西省', '辽宁省', '澳门特别行政区', '內蒙古自治区', '宁夏回族自治区', '青海省', '四川省', '山东省', '上海市', '陕西省', '山西省', '天津市', '台湾省', '新疆维吾尔自治区', '西藏自治区', '云南省', '浙江省']
      },
      {
        id: 'price',
        name: '不',
        open: false,
        pages: ['不', '500万', '500-1000万', '1000-1500万', '1500-2000万', '2000-2500万', '2500-3000万', '3000-3500万', '3500-4000万', '4000-4500万', '4500-5000万', '5000-5500万', '5500-6000万', '6000万']
      }
    ]
  },
  onLoad: function (options) {
    const query = new AV.Query('Project');
    query.include('creator');
    query.include('image');
    query.descending('createdAt');
    // query.limit(10);
    query.find().then(res => {
      
      var arrivalType = []
      var provinces = ''
      for (var i=0; i< res.length; i++){
        var typeArr = res[i].get('typeArrivalString')
        provinces = res[i].get('provinceString')
        arrivalType = typeArr.split('+')
        arrivalType.splice(0,1)
        provinces = provinces.substr(1)
        res[i].set('provincesTags', provinces)
        res[i].set('tags',arrivalType)
        res[i].set('mainImage', res[i].get('image').thumbnailURL(80, 75, 100))
      }
      
      this.setData({
        products: res
      })
    })

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

    const query = new AV.Query('Project');
    query.include('creator');
    query.include('image');
    query.descending('createdAt');
    // query.limit(10);
    query.find().then(res => {
      this.setData({
        products: res
      })
    })

    for (var i = 0; i < this.data.list.length; i++) {
      this.data.list[i].name = this.data.list[i].pages[0]
      this.data.list[i].open = false
    }

    this.setData({
      list: this.data.list
    });
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

    var queryType = new AV.Query('Project')
    queryType.contains('typeArrivalString', this.data.list[0].name)

    var queryProvince = new AV.Query('Project');
    queryProvince.equalTo('province', this.data.list[1].name);

    var query = '';
    switch (this.data.list[2].name) {
      case '不':
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

    queryAnd.find().then(res => {
      this.setData({
        products: res
      })
    })

    if (this.data.list[0].name.length > 4) {
      this.data.list[0].name = this.data.list[0].name[0] + this.data.list[0].name[1] + this.data.list[0].name[2] + "..."
    }
    if (this.data.list[1].name.length > 4) {
      this.data.list[1].name = this.data.list[1].name[0] + this.data.list[1].name[1] + this.data.list[1].name[2] + "..."
    }
    if (this.data.list[2].name.length > 4) {
      this.data.list[2].name = this.data.list[2].name[0] + this.data.list[2].name[1] + this.data.list[2].name[2] + "..."
    }

    this.setData({
      list: this.data.list
    });
  },
  search: function () {
    var query = new AV.Query('Project')
    query.contains('title', this.data.inputVal)

    var query1 = new AV.Query('Project')
    query1.contains('description', this.data.inputVal)

    var compoundQuery = AV.Query.or(query1, query)
    compoundQuery.find().then(res => {
      this.setData({
        products: res
      })
    })
  },
  closeFilters: function () {
    for (var i = 0; i < this.data.list.length; i++) {
      this.data.list[i].open = false
    }

    this.setData({
      list: this.data.list
    })
  }
})