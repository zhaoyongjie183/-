var QQMapWX = require('../lib/qqmap-wx-jssdk1.0/qqmap-wx-jssdk.js');
var qqmapsdk;
const sourceType = [['camera'], ['album'], ['camera', 'album']]
const sizeType = [['compressed'], ['original'], ['compressed', 'original']]
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hotlDetial:{
    hid: 0,
    uid: "",
    entryNum: 0,
    iyear: 0,
    month: 0,
    occupancy: 0,
    averagePrice: 0,
    operatingIncome: 0,
    roomIncome: 0,
    foodIncome: 0,
    recreationIncome: 0,
    operatingProfit: 0,
    employees: 0,
    lng: 0,
    lat: 0,
    address: ""
    },
    hotelData:{},
    uploadFileUrl:'',
    sourceTypeIndex: 2,
    sourceType: ['拍照', '相册', '拍照或相册'],
    sizeTypeIndex: 2,
    sizeType: ['压缩', '原图', '压缩或原图'],
    dateYear: new Date().getFullYear(),
    imageList: [],
    count: [1, 2, 3],
    countIndex: 2,
    dateList:[
      {
        id:'1',
        date:'1'
      }, {
        id: '2',
        date: '2'
      }, {
        id: '3',
        date: '3'
      }, {
        id: '4',
        date: '4'
      }, {
        id: '5',
        date: '5'
      }, {
        id: '6',
        date: '6'
      }, {
        id: '7',
        date: '7'
      }, {
        id: '8',
        date: '8'
      }, {
        id: '9',
        date: '9'
      }, {
        id: '10',
        date: '10'
      }, {
        id: '11',
        date: '11'
      }, {
        id: '12',
        date: '12'
      },
    ],
   
  },
  /**
     * 生命周期函数--监听页面初次渲染完成
     */
  onReady: function () {

    
  },
  onLoad: function (options) {
    var that=this;
    qqmapsdk = new QQMapWX({
      key: 'MEGBZ-F5XWR-AENWR-WNBU5-TRHJZ-O6FU7' // 必填
    });
    wx.getLocation({
      type: 'wgs84',
      altitude:true,
      success(res) {
        console.log(res);
        that.setData({
          'hotlDetial.lng': res.longitude,
          'hotlDetial.lat': res.latitude
        })
        qqmapsdk.reverseGeocoder({
          location: {
            latitude: res.latitude,
            longitude: res.longitude
          },
          coord_type:5,
          success: function (addressRes) {
            console.log("坐标转名称", addressRes);
            var address = addressRes.result.address;
            that.setData({
              'hotlDetial.address': address
            })
          },
          fail: function (error) {
            console.error("坐标解析错误", error);
          }
        })
      }
    })
    wx.getStorage({
      key: 'HotelObj',
      success(res) {
        that.data.hotelData = res.data;
        that.data.hotlDetial.uid = res.data.uid;
        that.data.hotlDetial.hid = res.data.hid;
      },
      fail(res) {
        wx.showModal({
          title: '提示',
          content: '宾馆数据未录入成功，请重新录入',
          success(resconfirm) {
            if (resconfirm.confirm) {
              wx.navigateTo({
                url: '../index/index'
              })
            } else if (resconfirm.cancel) {
              wx.navigateTo({
                url: '../index/index'
              })
            }
          }
        })
      }
    })
  },
  bindData:function(event){
    this.data.hotlDetial.month = event.target.id;
     this.setData({
       current_tag: this.data.hotlDetial.month-1,
     })

  },
  formSubmit: function (e) {
    
    var that=this;
    
    if (e.detail.value.iyear == '') {
      wx.showToast({
        title: '请选择年份',
        icon: 'none',
        duration: 1000
      })
      return;
    }
    if (that.data.hotlDetial.month == '' || that.data.hotlDetial.month == undefined) {
      wx.showToast({
        title: '请选择月份',
        icon: 'none',
        duration: 1000
      })
      return;
    }
    if (this.data.imageList.length < 1) {
      wx.showToast({
        title: '请上传照片',
        icon: 'none',
        duration: 1000
      })
      return;
    }
    if (e.detail.value.occupancy == '') {
      e.detail.value.occupancy=null;
    }
    if (e.detail.value.averagePrice == '') {
      e.detail.value.averagePrice = null;
    }
    if (e.detail.value.operatingIncome == '') {
      e.detail.value.peratingIncome = null;
    }
    if (e.detail.value.roomIncome == '') {
      e.detail.value.roomIncome = null;
    }
    if (e.detail.value.foodIncome == '') {
      e.detail.value.foodIncome = null;
    }
    if (e.detail.value.recreationIncome == '') {
      e.detail.value.recreationIncome = null;
    }
    if (e.detail.value.operatingProfit == '') {
      e.detail.value.operatingProfit = null;
    }
    if (e.detail.value.employees == '') {
      e.detail.value.employees = null;
    }
    
    that.data.hotlDetial.employees = e.detail.value.employees;
    that.data.hotlDetial.operatingProfit = e.detail.value.operatingProfit;
    that.data.hotlDetial.recreationIncome = e.detail.value.recreationIncome;
    that.data.hotlDetial.foodIncome = e.detail.value.foodIncome;
    that.data.hotlDetial.roomIncome = e.detail.value.roomIncome;
    that.data.hotlDetial.operatingIncome = e.detail.value.operatingIncome;
    that.data.hotlDetial.averagePrice = e.detail.value.averagePrice;
    that.data.hotlDetial.occupancy = e.detail.value.occupancy;
    that.data.hotlDetial.iyear = that.data.dateYear;
    that.data.hotlDetial.roomIncome = e.detail.value.roomIncome;
  wx.showLoading({
      title: '上传中',
  });
    if (that.data.hotelData.hid==0)
   {
     wx.request({
       url: 'https://www.bighotel.vip/Api/AddHotel',
       method: 'post',
       data: {
         "uid": that.data.hotelData.uid,
         "hotelName": that.data.hotelData.hotelName,
         "hotelType": that.data.hotelData.hotelType,
         "roomsNumber": that.data.hotelData.roomsNumber,
         "tablesNumber": that.data.hotelData.tablesNumber,
         "venueArea": that.data.hotelData.venueArea,
         "totalInvestment": that.data.hotelData.totalInvestment,
         "propertyType": that.data.hotelData.propertyType,
         "businessDistrict": that.data.hotelData.businessDistrict,
         "addres": that.data.hotelData.addres,
         "tel1": that.data.hotelData.tel1
       },
       header: {
         'content-type': 'application/json',
         'accept': 'application/json'
       },
       complete(res) {
         console.log(res.data);
         if (res.data == null) {
           wx.hideLoading();
           wx.showModal({
             title: '提示',
             content: '保存宾馆数据失败',
             success(res) {
               if (res.confirm) {
                 console.log('用户点击确定')
               } else if (res.cancel) {
                 console.log('用户点击取消')
               }
             }
           })
           return;
         }
         if (res.data.code != 1) {
           wx.hideLoading();
           wx.showToast({
             title: "保存基本信息失败",
             icon: 'none',
             duration: 2000
           })
           return;
         }
         if (res.data.code == 1) {
           that.data.hotlDetial.hid = res.data.data;
           wx.request({
             url: 'https://www.bighotel.vip/Api/AddHotelData',
             method: 'post',
             data: {
               "hid": that.data.hotlDetial.hid,
               "uid": that.data.hotlDetial.uid,
               "entryNum": that.data.hotlDetial.entryNum,
               "iyear": that.data.hotlDetial.iyear,
               "month": that.data.hotlDetial.month,
               "occupancy": that.data.hotlDetial.occupancy,
               "averagePrice": that.data.hotlDetial.averagePrice,
               "operatingIncome": that.data.hotlDetial.operatingIncome,
               "roomIncome": that.data.hotlDetial.roomIncome,
               "foodIncome": that.data.hotlDetial.foodIncome,
               "recreationIncome": that.data.hotlDetial.recreationIncome,
               "operatingProfit": that.data.hotlDetial.operatingProfit,
               "employees": that.data.hotlDetial.employees,
               "lng": that.data.hotlDetial.lng,
               "lat": that.data.hotlDetial.lat,
               "address": that.data.hotlDetial.address
             },
             header: {
               'content-type': 'application/json' // 默认值
             },
             complete(res) {
               console.log(res.data)
               if (res.data == null) {
                 wx.hideLoading();
                 wx.showModal({
                   title: '提示',
                   content: '保存宾馆数据失败',
                   success(res) {
                     if (res.confirm) {
                       console.log('用户点击确定')
                     } else if (res.cancel) {
                       console.log('用户点击取消')
                     }
                   }
                 })
                 return;
               }
               if (res.data.code != 1) {
                 wx.showToast({
                   title: '保存月份数据失败',
                   icon: 'none',
                   duration: 2000
                 })
                 return;
               }
               if (res.data.code == 1) {
                 const arr = []
                 //将选择的图片组成一个Promise数组，准备进行并行上传
                 for (let path of that.data.imageList) {
                   arr.push(wx.uploadFile({
                     url: 'https://www.bighotel.vip/Api/Upload',
                     filePath: path,
                     name: 'file',
                     formData: {
                       HMID: res.data.data
                     },
                   }))
                 }
                 // 开始并行上传图片
                 Promise.all(arr).then(res => {
                   wx.hideLoading();
                   wx.showModal({
                     title: '提示',
                     content: '保存成功',
                     success(res) {
                       if (res.confirm) {
                         wx.navigateTo({
                           url: '../home/index'
                         })
                       } else if (res.cancel) {
                         wx.navigateTo({
                           url: '../home/index'
                         })
                       }
                     }
                   })
                 }).catch(err => {
                   wx.hideLoading();
                   wx.showModal({
                     title: '提示',
                     content: '保存失败',
                     success(res) {
                       if (res.confirm) {
                         console.log('用户点击确定')
                       } else if (res.cancel) {
                         console.log('用户点击取消')
                       }
                     }
                   })
                 })

               }
             }
           })
         }
       }
     })
   }
  else
  {
     wx.request({
       url: 'https://www.bighotel.vip/Api/AddHotelData',
       method: 'post',
       data: {
         "hid": that.data.hotlDetial.hid,
         "uid": that.data.hotlDetial.uid,
         "entryNum": that.data.hotlDetial.entryNum,
         "iyear": that.data.hotlDetial.iyear,
         "month": that.data.hotlDetial.month,
         "occupancy": that.data.hotlDetial.occupancy,
         "averagePrice": that.data.hotlDetial.averagePrice,
         "operatingIncome": that.data.hotlDetial.operatingIncome,
         "roomIncome": that.data.hotlDetial.roomIncome,
         "foodIncome": that.data.hotlDetial.foodIncome,
         "recreationIncome": that.data.hotlDetial.recreationIncome,
         "operatingProfit": that.data.hotlDetial.operatingProfit,
         "employees": that.data.hotlDetial.employees,
         "lng": that.data.hotlDetial.lng,
         "lat": that.data.hotlDetial.lat,
         "address": that.data.hotlDetial.address
       },
       header: {
         'content-type': 'application/json' // 默认值
       },
       complete(res) {
         console.log(res.data)
         if (res.data == null) {
           wx.hideLoading();
           wx.showToast({
             title: "保存宾馆数据失败",
             icon: 'none',
             duration: 2000
           })
           return;
         }
         if (res.data.code != 1) {
           wx.hideLoading();
           wx.showToast({
             title: '保存月份数据失败',
             icon: 'none',
             duration: 2000
           })
           return;
         }
         if (res.data.code == 1) {
           const arr = []
           //将选择的图片组成一个Promise数组，准备进行并行上传
           for (let path of that.data.imageList) {
             arr.push(wx.uploadFile({
               url: 'https://www.bighotel.vip/Api/Upload',
               filePath: path,
               name: 'file',
               formData: {
                 HMID: res.data.data
               },
             }))
           }
           // 开始并行上传图片
           Promise.all(arr).then(res => {
             wx.hideLoading();
             wx.showModal({
               title: '提示',
               content: '保存成功',
               success(res) {
                 if (res.confirm) {
                   wx.navigateTo({
                     url: '../home/index'
                   })
                 } else if (res.cancel) {
                   wx.navigateTo({
                     url: '../home/index'
                   })
                 }
               }
             })
           }).catch(err => {
             wx.hideLoading();
             wx.showModal({
               title: '提示',
               content: '保存失败',
               success(res) {
                 if (res.confirm) {
                   console.log('用户点击确定')
                 } else if (res.cancel) {
                   console.log('用户点击取消')
                 }
               }
             })
           })
         }
       }
     })
  }
  },
 
  bindDateChange(e) {
    this.setData({
      dateYear: e.detail.value
    })
  },
  chooseImage() {
    const that = this
    wx.chooseImage({
      sourceType: sourceType[this.data.sourceTypeIndex],
      sizeType: sizeType[this.data.sizeTypeIndex],
      count: this.data.count[this.data.countIndex],
      success(res) {
        console.log(res)
        //const imageSrc = res.tempFilePaths[0]
       // that.setData({
        //  imageList: res.tempFilePaths
        //})

        const images = that.data.imageList.concat(res.tempFilePaths);
        // 限制最多只能留下3张照片
        var count = images.length <= 3 ? images : images.slice(images.length-3, images.length)
         that.setData({
           imageList: count
        })
       // wx.uploadFile({
         // url: 'https://www.bighotel.vip/Api/Upload',
         // filePath: imageSrc,
         // name: 'file',
         // success(res) {
         //   console.log(res);
         //   const data = res.data
            // do something
         // }
       // })
      }
    })
  },
  previewImage(e) {
    const current = e.target.dataset.src

    wx.previewImage({
      current,
      urls: this.data.imageList
    })
  }

})