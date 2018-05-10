// pages/projects/projects.js

// const AV = require('./../../utils/av-weapp-min');
const AV = require('./../../utils/av-live-query-weapp-min');
const bind = require('./../../utils/live-query-binding');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    products: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  // onReady: function () {
  //   var auxProducts = []
  //   var query = new AV.Query('Project');
  //   query.include('creator');
  //   query.include('image');
  //   query.descending('createdAt');
  //   query.limit(10);
  //   query.find().then(function (products) {
  //     products.forEach(function (product) {
  //       console.log(product);
  //       var productTitle = product.get('title');
  //       var productPrice = product.get('price');
  //       var productDescription = product.get('description');
  //       var releaseTime = (product.createdAt.getMonth() + 1) + '/' + product.createdAt.getDate() + '/' + product.createdAt.getFullYear();
  //       var ownerUsername = product.get('creator').get('username');
  //       var productImage = product.get('image');
  //       var productImageUrl;
  //       if (productImage) {
  //         productImageUrl = productImage.get('url');
  //       } else {
  //         productImageUrl = './../storage.png'
  //       }
  //       auxProducts.push({
  //         imageUrl: productImageUrl,
  //         title: productTitle,
  //         price: productPrice,
  //         description: productDescription,
  //         ownerUsername: ownerUsername,
  //         releaseTime: releaseTime
  //       })
  //       var p = { title: productTitle, price: productPrice};
  //       this.customSetData([p, ...this.data.products]);
  //     });
  //     console.log('hola mundo');
  //     this.customSetData(auxProducts);

  //   }).catch(function (error) {
  //     alert(JSON.stringify(error));
  //   });
  // },

  fetchProducts: function (user) {
    console.log('uid', user.id);
    const query = new AV.Query('Project');
    query.include('creator');
    query.include('image');
    query.descending('createdAt');
    query.limit(10);
    const setProducts = this.setProducts.bind(this);
    return AV.Promise.all([query.find().then(setProducts), query.subscribe()]).then(([products, subscription]) => {
      this.subscription = subscription;
      if (this.unbind) this.unbind();
      this.unbind = bind(subscription, products, setProducts);
    }).catch(error => console.error(error.message));
  },
  onReady: function () {
    console.log('page ready');
    const user = AV.User.current();
    this.fetchProducts(user);
  },
  onUnload: function () {
    this.subscription.unsubscribe();
    this.unbind();
  },
  onPullDownRefresh: function () {
    const user = AV.User.current();
    if (!user) return wx.stopPullDownRefresh();
    this.fetchProducts(user).catch(error => console.error(error.message)).then(wx.stopPullDownRefresh);
  },
  setProducts: function (products) {
    console.log(products);
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
  
  }
})