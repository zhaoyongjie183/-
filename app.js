App({
  //全局变量配置
  globalData: {
    isLogin:false,
    //openid
    openid: 0,
    //appid
    appid: 'wx1d2b95774e7d6c4f',
    //secret
    secret: 'b9b275b206710f63f54bbc91de411800',
    wx_url_1: 'https://api.weixin.qq.com/sns/jscode2session?appid=wx1d2b95774e7d6c4f&secret=b9b275b206710f63f54bbc91de411800&js_code=',
    wx_url_2: '&grant_type=authorization_code'
},
  /**
   * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
   */
  onLaunch: function () {
    var that = this;
    wx.login({
      success(res){
       // console.log("调用appjs");
        if (res.code){
          let code=res.code;
          wx.request({
            url: 'https://www.bighotel.vip/Api/code2Session',
            method: 'post',
            data: {
              str: res.code
            },
            success: function (res) {
              var obj = {};
              obj.openid = res.data.data.openid;
              obj.expires_in = res.data.data.expires_in;
              wx.setStorage({
                key: 'user',
                data: obj,
                success(res)
                {
                  that.globalData.isLogin=true;
                }
              })
            }
            
          });
        }
      }
      })
  },

  /**
   * 当小程序启动，或从后台进入前台显示，会触发 onShow
   */
  onShow: function (options) {
    
  },

  /**
   * 当小程序从前台进入后台，会触发 onHide
   */
  onHide: function () {
    
  },

  /**
   * 当小程序发生脚本错误，或者 api 调用失败时，会触发 onError 并带上错误信息
   */
  onError: function (msg) {
    
  }
})
