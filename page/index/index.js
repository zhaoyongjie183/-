// page/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userid:'',
    saveData:{
      uid:'',
      hotelType:0,
      hotelName:'',
      addres:'',
      tel1:'',
      hid:0,
      roomsNumber:'',
      tablesNumber:'',
      venueArea:'',
      totalInvestment:'',
      propertyType:1,
      businessDistrict:0,
      businessDistrictName:'',
    },
    items: [
      { name: '自持', value: 1, checked: 'true'},
      { name: '租赁', value: 2 }
    ]
  },
  radioChange(e) {
    this.data.saveData.propertyType=e.detail.value;
  },
  bindCircleChange:function(e)
  {
    wx.navigateTo({
      url: '../circle/index'
    })
  },
  //根据名称查询相应信息
  bindKeyInput: function (e) {
    var mythis=this;
    var obj=new Object();
    if(e.detail.value.length>2){
      wx.request({
        url: 'https://www.bighotel.vip/Api/checkExistHotel', 
        method: 'post',
        data: {
          str: e.detail.value
        },
        header: {
          'content-type': 'application/json' 
        },
        success(res) {
          if (res.data.code == 1) {
            obj=res.data.data;
            wx.showModal({
              title: '提示',
              content: '查询已存在酒店【' + res.data.data.hotelName + '】,地址' + res.data.data.addres+'，是否使用此酒店信息',
              success(resconfirm) {
                if (resconfirm.confirm) {
                  mythis.data.saveData.hid = obj.ID;
                  mythis.data.saveData.hotelName = obj.hotelName;
                  mythis.data.saveData.addres = obj.addres;
                  mythis.data.saveData.tel1 = obj.tel1;
                  mythis.data.saveData.roomsNumber = obj.roomsNumber;
                  mythis.data.saveData.tablesNumber = obj.tablesNumber;
                  mythis.data.saveData.venueArea = obj.venueArea;
                  mythis.data.saveData.totalInvestment = obj.totalInvestment;
                  mythis.data.saveData.propertyType = obj.propertyType;
                  mythis.data.saveData.businessDistrictName = obj.businessDistrict;
                  mythis.setData({
                    saveData: mythis.data.saveData
                  })
                  if (obj.propertyType==2)
                  {
                    mythis.data.items[1].checked=true;
                    mythis.setData({
                      items: mythis.data.items
                    });
                  }
                } else if (resconfirm.cancel) {
                  console.log('用户点击取消')
                }
              }
            })
          }
          else {
            mythis.setData({
              'saveData.hotelName': e.detail.value,
            })
          }
          
        }
      })
    }
    else
    {
      mythis.setData({
        'saveData.hotelName': e.detail.value,
      })
    }
    
  },
  /**
   * 保存数据
   */
  formSubmit: function (e) {
    var that=this;
    var obj=e;
    if (e.detail.value.hotelName=='')
    {
      wx.showToast({
        title: '请输入名称',
        icon: 'none',
        duration: 1000
      })
      return;
    }
    if (e.detail.value.addres == '') {
      wx.showToast({
        title: '请输入地址',
        icon: 'none',
        duration: 1000
      })
      return;
    }
    if (e.detail.value.tel1 == '') {
      wx.showToast({
        title: '请输入电话',
        icon: 'none',
        duration: 1000
      })
      return;
    }
    if (e.detail.value.roomsNumber == '') {
      wx.showToast({
        title: '请输入房间数量',
        icon: 'none',
        duration: 1000
      })
      return;
    }
    if (e.detail.value.tablesNumber == '') {
      wx.showToast({
        title: '请输入餐位数量',
        icon: 'none',
        duration: 1000
      })
      return;
    }
    if (e.detail.value.venueArea == '') {
      wx.showToast({
        title: '请输入会场面积',
        icon: 'none',
        duration: 1000
      })
      return;
    }
    if (e.detail.value.totalInvestment == '') {
      wx.showToast({
        title: '请输入投资金额（万元）',
        icon: 'none',
        duration: 1000
      })
      return;
    }
    that.data.saveData.totalInvestment = e.detail.value.totalInvestment;
    that.data.saveData.venueArea = e.detail.value.venueArea;
    that.data.saveData.tablesNumber = e.detail.value.tablesNumber;
    that.data.saveData.hotelName = e.detail.value.hotelName;
    that.data.saveData.addres = e.detail.value.addres;
    that.data.saveData.tel1 = e.detail.value.tel1;
    that.data.saveData.roomsNumber = e.detail.value.roomsNumber;
    that.data.saveData.uid = that.data.userid;
    wx.setStorage({
      key: 'HotelObj',
      data: that.data.saveData,
      success(res) {
        console.log("存储成功")
        wx.navigateTo({
          url:'../business/index'
        })
      }
    })
   },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
  
    wx.getStorage({
      key: 'user',
      success(res) {
        that.data.userid = res.data.openid;
      },
      fail(res1)
      {
        wx.showModal({
          title: '提示',
          content: '未授权，请重新登录',
          success(resconfirm) {
            if (resconfirm.confirm) {
              wx.navigateTo({
                url: '../userinfo/index'
              })
            } else if (resconfirm.cancel) {
              wx.navigateTo({
                url: '../userinfo/index'
              })
            }
          }
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