// pages/projects/projects.js

const AV = require('../../utils/av-weapp-min');
const AVLive = require('../../utils/av-live-query-weapp-min');
const bind = require('../../utils/live-query-binding');

var offersProduct = [];

Page({

  /**
   * 页面的初始数据
   */
  data: {
    products: [],
    offers: [],
    inputShowed: false,
    inputVal: "",
    products: [],
    height: '',
    list: [
      {
        id: 'province',
        name: '安徽省',
        open: false,
        pages: ['安徽省', '北京市', '重庆市', '福建省', '广东省']
      },
      {
        id: 'price',
        name: '不',
        open: false,
        pages: ['不', '500万', '500-1000万', '1000-1500万', '1500-2000万', '2000-2500万', '2500-3000万', '3000-3500万', '3500-4000万', '4000-4500万', '4500-5000万', '5000-5500万', '5500-6000万', '6000万']
      },
      {
        id: 'feedback',
        name: '操作反馈',
        open: false,
        pages: ['actionsheet', 'dialog', 'msg', 'picker', 'toast']
      },
      {
        id: 'feedback',
        name: '操作反馈',
        open: false,
        pages: ['actionsheet', 'dialog', 'msg', 'picker', 'toast']
      }
    ]
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

    const query = new AV.Query('Project');
    query.include('creator');
    query.include('image');
    query.descending('createdAt');
    query.limit(10);
    query.find().then( res=> {
        this.setData({
          products: res
        })
    })
  },
  // fetchProducts: function (user) {
  //   const query = new AVLive.Query('Project');
  //   query.include('creator');
  //   query.include('image');
  //   query.descending('createdAt');
  //   query.limit(10);
  //   const setProducts = this.setProducts.bind(this);
  //   return AVLive.Promise.all([query.find().then(setProducts), query.subscribe()]).then(([products, subscription]) => {
  //     this.subscription = subscription;
  //     if (this.unbind) this.unbind();
  //     this.unbind = bind(subscription, products, setProducts);

  //     const length = products.length
  //     for (let i = 0; i < length; i++) {
  //       var query = new AV.Query("Project");
  //       query.get(products[i].id).then(
  //         project => {
  //           this.data.products[i] = project
  //           var query = new AV.Query('Offert');
  //           query.equalTo('project', project);
  //           query.find().then(
  //             offer => {
  //               this.data.products[i].attributes.offers = offer.length
  //               this.setData({
  //                 products: this.data.products
  //               })
  //             }
  //           )
  //         }
  //       )
  //     }
  //   }).catch(error => console.error(error.message));
  // },
  onReady: function () {
    const user = AV.User.current();
    // this.fetchProducts(user);
  },
  onUnload: function () {
    // this.subscription.unsubscribe();
    // this.unbind();
  },
  onPullDownRefresh: function () {
    // const user = AV.User.current();
    // if (!user) return wx.stopPullDownRefresh();
    // this.fetchProducts(user).catch(error => console.error(error.message)).then(wx.stopPullDownRefresh);
  },
  setProducts: function (products) {
    this.setData({
      products,
    });
    return products;
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
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  makeAnOffer: function () {

  },
  goToProject: function (e) {
    wx.setStorage({
      key: "projectID",
      data: e.currentTarget.id
    })
    wx.navigateTo({
      url: '../project/project',
    })
  },
  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function () {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
  },
  clearInput: function () {
    this.setData({
      inputVal: ""
    });
  },
  inputTyping: function (e) {
    this.setData({
      inputVal: e.detail.value
    });
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
  selectFilter: function(e){
    
    for (var i = 0; i < this.data.list.length; i++){
      if (this.data.list[i].id == e.target.dataset.filterheader) {        
        this.data.list[i].name = this.data.list[i].pages[e.target.dataset.filter]
      }
      this.data.list[i].open = false
    }
    this.setData({
      list: this.data.list
    })
 
    var queryProvince = new AV.Query('Project');
    queryProvince.equalTo('province', this.data.list[0].name);    
    
    var query = '';
    switch (this.data.list[1].name){
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
    
    var queryAnd = AV.Query.and(queryProvince, query);

    queryAnd.find().then( res => {
      this.setData({
        products: res
      })
    })
  }
  // tapFilterGeneral: function(e){
  //   this.setData({
  //     generalFilter: e.currentTarget.dataset.id
  //   })

  //   console.log(e.currentTarget.dataset.id)
  //   var queryFilterGeneral = new AV.Query('Project')
  //   queryFilterGeneral.contains('typeArrivalString', e.currentTarget.dataset.id)

  //   var queryProvince = new AV.Query('Project');
  //   queryProvince.equalTo('province', this.data.list[0].name);

  //   var query = '';
  //   switch (this.data.list[1].name) {
  //     case '不':
  //       query = new AV.Query('Project');
  //       break;
  //     case '500万':
  //       query = new AV.Query('Project');
  //       query.lessThanOrEqualTo('debitAmount', 500);
  //       break;
  //     case '500-1000万':
  //       var query2 = new AV.Query('Project');
  //       query2.greaterThan('debitAmount', 500);
  //       var query1 = new AV.Query('Project');
  //       query1.lessThanOrEqualTo('debitAmount', 1000);
  //       var query = AV.Query.and(query2, query1);
  //       break;
  //     case '1000-1500万':
  //       var query2 = new AV.Query('Project');
  //       query2.greaterThan('debitAmount', 1000);
  //       var query1 = new AV.Query('Project');
  //       query1.lessThanOrEqualTo('debitAmount', 1500);
  //       var query = AV.Query.and(query2, query1);
  //       break;
  //     case '1500-2000万':
  //       var query2 = new AV.Query('Project');
  //       query2.greaterThan('debitAmount', 1500);
  //       var query1 = new AV.Query('Project');
  //       query1.lessThanOrEqualTo('debitAmount', 2000);
  //       var query = AV.Query.and(query2, query1);
  //       break;
  //     case '2000-2500万':
  //       var query2 = new AV.Query('Project');
  //       query2.greaterThan('debitAmount', 2000);
  //       var query1 = new AV.Query('Project');
  //       query1.lessThanOrEqualTo('debitAmount', 2500);
  //       var query = AV.Query.and(query2, query1);
  //       break;
  //     case '2500-3000万':
  //       var query2 = new AV.Query('Project');
  //       query2.greaterThan('debitAmount', 2500);
  //       var query1 = new AV.Query('Project');
  //       query1.lessThanOrEqualTo('debitAmount', 3000);
  //       var query = AV.Query.and(query2, query1);
  //       break;
  //     case '3000-3500万':
  //       var query2 = new AV.Query('Project');
  //       query2.greaterThan('debitAmount', 3000);
  //       var query1 = new AV.Query('Project');
  //       query1.lessThanOrEqualTo('debitAmount', 3500);
  //       var query = AV.Query.and(query2, query1);
  //       break;
  //     case '3500-4000万':
  //       var query2 = new AV.Query('Project');
  //       query2.greaterThan('debitAmount', 3500);
  //       var query1 = new AV.Query('Project');
  //       query1.lessThanOrEqualTo('debitAmount', 4000);
  //       var query = AV.Query.and(query2, query1);
  //       break;
  //     case '4000-4500万':
  //       var query2 = new AV.Query('Project');
  //       query2.greaterThan('debitAmount', 4000);
  //       var query1 = new AV.Query('Project');
  //       query1.lessThanOrEqualTo('debitAmount', 4500);
  //       var query = AV.Query.and(query2, query1);
  //       break;
  //     case '4500-5000万':
  //       var query2 = new AV.Query('Project');
  //       query2.greaterThan('debitAmount', 4500);
  //       var query1 = new AV.Query('Project');
  //       query1.lessThanOrEqualTo('debitAmount', 5000);
  //       var query = AV.Query.and(query2, query1);
  //       break;
  //     case '5000-5500万':
  //       var query2 = new AV.Query('Project');
  //       query2.greaterThan('debitAmount', 5000);
  //       var query1 = new AV.Query('Project');
  //       query1.lessThanOrEqualTo('debitAmount', 5500);
  //       var query = AV.Query.and(query2, query1);
  //       break;
  //     case '5500-6000万':
  //       var query2 = new AV.Query('Project');
  //       query2.greaterThan('debitAmount', 5500);
  //       var query1 = new AV.Query('Project');
  //       query1.lessThanOrEqualTo('debitAmount', 6000);
  //       var query = AV.Query.and(query2, query1);
  //       break;
  //     case '6000万':
  //       query = new AV.Query('Project');
  //       query.greaterThan('debitAmount', 6000);
  //       break;
  //     default:
  //       query = new AV.Query('Project');
  //       break;
  //   }

  //   var queryAnd = AV.Query.and(queryProvince, query, queryFilterGeneral);

  //   queryAnd.find().then(res => {
  //     this.setData({
  //       products: res
  //     })
  //   })
  // }
})