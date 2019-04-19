//index.js
const app = getApp()
wx.cloud.init()
Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    list: []
  },
  onShow(){
    this.onQuery()
  }, 
  onQuery(){
    const db = wx.cloud.database()
    db.collection('focusList').where({}).get({
      success: res=>{
        console.log('成功',res)
        this.setData({
          list: res.data
        })  
      },
      fail: err=>{
        wx.showLoading({
          title: '获取失败',
        })
      }
    })
 },
 
})
