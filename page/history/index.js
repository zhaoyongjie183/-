// page/history/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      list:[]
  },
  bindData(e) {
    let that=this;
    let idx = e.currentTarget.dataset.id;
    var item = that.data.list[idx];//获取指定元素的值 
    wx.setStorage({
      key: 'hotelDetailData',
      data: item,
      success(res) {
        wx.navigateTo({
          url: '../historydetail/index'
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getStorage({
      key: 'hotelData',
      success(res) {
        let id = res.data;
        wx.request({
          url: 'https://www.bighotel.vip/Api/getHotelDatalist',
          method: 'post',
          data: {
            id: id
          },
          header: {
            'content-type': 'application/json',
            'accept': 'application/json'
          },
          success(res) {
            that.setData({
              list: res.data.data
            })
          }
        })
      },
      fail(res) {
        // wx.showToast({
        //   title: '请重新登录',
        //   icon: 'none',
        //   duration: 1000
        // })
      }
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