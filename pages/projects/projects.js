// pages/projects/projects.js

const AV = require('../../utils/av-weapp-min');
const AVLive = require('../../utils/av-live-query-weapp-min');
const bind = require('../../utils/live-query-binding');

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
  fetchProducts: function (user) {
    console.log('uid', user.id);
    const query = new AVLive.Query('Project');
    query.include('creator');
    query.include('image');
    query.descending('createdAt');
    query.limit(10);
    const setProducts = this.setProducts.bind(this);
    return AVLive.Promise.all([query.find().then(setProducts), query.subscribe()]).then(([products, subscription]) => {
      this.subscription = subscription;
      if (this.unbind) this.unbind();
      this.unbind = bind(subscription, products, setProducts);
    }).catch(error => console.error(error.message));
  },
  onReady: function () {
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
  
  },
  makeAnOffer: function(){
    
  },
  goToProject: function (e) {
    wx.setStorage({
      key: "projectID",
      data: e.currentTarget.id
    })
    wx.navigateTo({
      url: '../project/project',
    })
  }
})