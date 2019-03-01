// page/historydetail/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    averagePrice:'',
    occupancy:'',
    entryTime:'',
    operatingIncome:'',
    roomIncome:'',
    foodIncome:'',
    recreationIncome:'',
    employees:'',
    operatingProfit:'',
    address:'',
    imageList: []
  },
  previewImage(e) {
    var that=this;
    const current = e.target.dataset.src
    wx.previewImage({
      current: current, // 当前显示图片的http链接
      urls: that.data.imageList // 需要预览的图片http链接列表
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    wx.getStorage({
      key: 'hotelDetailData',
      success: function(res) {
        let strs = new Array(); //定义一数组 
        strs = res.data.pic.substring(0, res.data.pic.length - 1).split(";");
        for (var i = 0; i < strs.length;i++)
        {
          strs[i] = "https://www.bighotel.vip/" + strs[i];
        } 
        that.setData({
          averagePrice: res.data.averagePrice,
          occupancy: res.data.occupancy,
          entryTime: res.data.entryTime,
          operatingIncome: res.data.operatingIncome,
          roomIncome: res.data.roomIncome,
          foodIncome: res.data.foodIncome,
          recreationIncome: res.data.recreationIncome,
          employees: res.data.employees,
          operatingProfit: res.data.operatingProfit,
          address: res.data.address,
          imageList:strs,
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