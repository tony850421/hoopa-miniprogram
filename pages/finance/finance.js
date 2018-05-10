// pages/finance/finance.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    Val_max: '',
    Val_min: '',
    sections: '',
    xScale: '',
    yScale: ''    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      sections: 7,
      Val_max: 130,
      Val_min: -40
    })

    var stepSize = 10;
    var columnSize = 50;
    var rowSize = 50;
    var margin = 10;
    var xAxis = [" ", "Jan", "Feb", "Mar", "Apr",
      "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    //

    var context = wx.createCanvasContext('firstCanvas')
    context.fillStyle = "#0099ff"

    this.setData({
      yScale: (200 - columnSize - margin) / (this.data.Val_max - this.data.Val_min),
      xScale: (300 - rowSize) / this.data.sections
    })

    context.strokeStyle = "#4764B5"; // color of grid lines
    context.beginPath();

    context.moveTo(20, 50);
    context.lineTo(20, 190);
    context.moveTo(20, 190);
    context.lineTo(300, 190);
    var step = 40;
    for (var i = 0; i <= 7; i++) {
      context.fillRect(i + step, 190, 5, 5);
      step += 40;
    }   

    var functionLine = [200, 102, 87, 150, 33, 100, 170];
    var functionLineOrd = [200, 102, 87, 150, 33, 100, 170];

    for (var i = 0; i < functionLineOrd.length - 1; i++) {
      for (var x = i; x < functionLineOrd.length; x++) {
        if (functionLineOrd[i] > functionLineOrd[x]) {
          var aux = functionLineOrd[x];
          functionLineOrd[x] = functionLineOrd[i];
          functionLineOrd[i] = aux;
        }
      }
    }

    var minVale = functionLineOrd[0];
    var maxValue = functionLineOrd[functionLine.length-1]

    var factor = (maxValue - minVale) / 90;
    var halfUmbral = ((maxValue/factor) + (minVale/factor))/ 2;

    step = 40;
    var firtsValue = functionLine[0] / factor;
    context.setFontSize(10);
    context.setLineJoin('round');
    if (firtsValue > halfUmbral) {
      context.moveTo(step, halfUmbral - (firtsValue - halfUmbral) + 50);
      if (functionLine[0] < 100) {
        context.fillText(functionLine[0], step - 2, halfUmbral - (firtsValue - halfUmbral) + 40);
      } else {
        context.fillText(functionLine[0], step - 4, halfUmbral - (firtsValue - halfUmbral) + 40);
      }      
    } else {
      context.moveTo(step, halfUmbral + (halfUmbral - firtsValue) + 50);
      if (functionLine[0] < 100){
        context.fillText(functionLine[0], step - 2, halfUmbral + (halfUmbral - firtsValue) + 40);
      } else {
        context.fillText(functionLine[0], step - 4, halfUmbral + (halfUmbral - firtsValue) + 40);
      }      
    }

    for (var i = 1; i < this.data.sections; i++) {
      step += 40;
      var value = functionLine[i] / factor;
      if (value > halfUmbral) {
        context.lineTo(i + step, halfUmbral - (value - halfUmbral) + 50);
        if (functionLine[i] < 100) {
          context.fillText(functionLine[i], step - 2, halfUmbral - (value - halfUmbral) + 40);
        } else {
          context.fillText(functionLine[i], step - 4, halfUmbral - (value - halfUmbral) + 40);
        }
      } else {
        context.lineTo(i + step, halfUmbral + (halfUmbral - value) + 50);
        if (functionLine[i] < 100) {
          context.fillText(functionLine[i], step - 2, halfUmbral + (halfUmbral - value) + 40);
        } else {
          context.fillText(functionLine[i], step - 4, halfUmbral + (halfUmbral - value) + 40);
        }
      }
    }
    context.stroke();
    context.draw()
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
  onShareAppMessage: function () {
  
  }
})