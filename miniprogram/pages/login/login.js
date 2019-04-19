// miniprogram/pages/login/login.js
const app = getApp()
Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    userInfo:{},
    appid:{
      appid: 'wxfe1a1471b829f65a',
      secret: '6644a63fe4c873e9685f2c07623e537f'
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    // 获取用户信息
    // wx.getSetting({
    //   success: res => {
    //     // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
    //     if (res.authSetting['scope.userInfo']) {
    //       wx.getUserInfo({
    //         success: res => {
    //           this.setData({
    //             avatarUrl: res.userInfo.avatarUrl,
    //             userInfo: res.userInfo
    //           })
    //           console.log(111)
    //           return
    //           wx.reLaunch({
    //             url: '../home/home',
    //           })
    //         }
    //       })
    //     }
    //   }
    // })
    var that = this;
    var user = wx.getStorageSync('user') || {};
    var userInfo = wx.getStorageSync('userInfo') || {};
    if ((!user.openid || (user.expires_in || Date.now()) < (Date.now() + 600)) && (!userInfo.nickName)) {
      wx.login({
        success: function (res) {
          if (res.code) {
            wx.getUserInfo({
              success: function (res) {
                var objz = {};
                objz.avatarUrl = res.userInfo.avatarUrl;
                objz.nickName = res.userInfo.nickName;
                console.log(res);
                wx.setStorageSync('userInfo', objz);//存储userInfo
              }
            });
            var data = that.data.appid;//这里存储了appid、secret、token串  
            var l = 'https://api.weixin.qq.com/sns/jscode2session?appid=' + data.appid + '&secret=' + data.secret + '&js_code=' + res.code + '&grant_type=authorization_code';
            wx.request({
              url: l,
              data: {},
              method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT  
              // header: {}, // 设置请求的 header  
              success: function (res) {
                var obj = {};
                obj.openid = res.data.openid;
                obj.expires_in = Date.now() + res.data.expires_in;
                //console.log(obj);
                wx.setStorageSync('user', obj);//存储openid  
              }
            });
          } else {
            console.log('获取用户登录态失败！' + res.errMsg)
          }
        }
      })
    }else{
      wx.reLaunch({
        url: '../home/home',
      })
    }
  },
  bindGetUserInfo(e){
    if (e.detail.rawData){
      wx.reLaunch({
        url: '../home/home',
      })
    }
  }
})