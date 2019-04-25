//app.js
App({
  onLaunch: function() {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
    
    // 获取系统状态栏信息
    wx.getSystemInfo({
      success: e => {
        this.globalData.StatusBar = e.statusBarHeight;
        let custom = wx.getMenuButtonBoundingClientRect();
        this.globalData.Custom = custom;
        this.globalData.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
      }
    })
    this.list = [
      { icon: 'form', name: '整体方案', id: '1', color: '#D6D125' },
      { icon: 'remind', name: '公开课', id: '2', color: '#C46363' },
      { icon: 'brandfill', name: '机构内训', id: '3', color: '#8BCE1D' },
      { icon: 'servicefill', name: '自有讲师', id: '4', color: '#2DB959' },
      { icon: 'paint', name: '课程开发', id: '5', color: '#2F49B7' },
      { icon: 'colorlens', name: '电子课件', id: '6', color: '#0E5128' },
      { icon: 'profilefill', name: '在线平台', id: '7', color: '#CD5BC3' },
      { icon: 'taoxiaopu', name: '人才测评', id: '8', color: '#21C0C4' },
      { icon: 'servicefill', name: '人才招聘', id: '9', color: '#89B03E' },
      { icon: 'full', name: '渠道合作', id: '10', color: '#CC3A7E' },
      { icon: 'hotfill', name: '学习运营', id: '11', color: '#C48B25' },
    ]
  },
  globalData: {
    userInfo: null
  }
})