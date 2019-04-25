
Page({
  data: {
   userData: {}   
  },
  // 首页添加
  addHome(){
    wx.navigateTo({
      url: '/pages/user/addHome/addHome',
    })  
  },
  // 我的需求
  myNeed(){
    wx.navigateTo({
      url: '/pages/user/myNeed/myNeed',
    })
  },
  onLoad(){
    this.setData({
      userData: wx.getStorageSync('userInfo')
    })
  }
})