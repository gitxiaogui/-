// miniprogram/pages/need/issueSuccess/issueSuccess.js
const app= getApp()
Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
  },
  goBack(){
    wx.reLaunch({
      url: '/pages/home/home',
    })
  }
})