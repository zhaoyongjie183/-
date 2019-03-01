Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: []
  },
  bindData(e){
    wx.setStorage({
      key: 'hotelData',
      data: e.currentTarget.dataset.id,
      success(res)
      {
        wx.navigateTo({
          url: '../history/index'
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    });
    var that=this;
    wx.getStorage({
      key: 'user',
      success(res) {
        let userid = res.data.openid;
        wx.request({
          url: 'https://www.bighotel.vip/Api/getHotellist',
          method: 'post',
          data: {
            str: userid
          },
          header: {
            'content-type': 'application/json',
            'accept': 'application/json'
          },
          success(res)
          {
            that.setData({
              list: res.data.data
            })
            wx.hideLoading();
          },
          fail(res)
          {
            wx.hideLoading();
            wx.showToast({
              title: '获取数据失败',
              icon: 'none',
              duration: 1000
            })
          }
        })
      },
      fail(res)
      {
        wx.hideLoading();
        wx.showToast({
          title: '请重新登录',
          icon: 'none',
          duration: 1000
        })
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