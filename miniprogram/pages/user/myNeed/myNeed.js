// miniprogram/pages/user/myNeed/myNeed.js
const app = getApp()
Page({
  data: {
    list: app.list,
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    openid: '',
  },
  getList(){
    const db = wx.cloud.database()
    db.collection('needList').where({
      _openid: this.data.openid
    }).get({
      success: res=>{
        console.log('获取需求列表成功',res)
        this.setData({
          needList: res.data
        })
      },
      fail: err=>{
        console.log('获取失败',err)
        wx.showToast({
          title: '获取失败',
        })
      }
    })
  },
  iconChange(type){
    for(var a = 0;a<this.data.list.length;a++){
      if (type == this.data.list[a].id){
        return this.data.list[a].icon
      }
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (wx.getStorageSync('user')) {
      this.setData({
        openid: wx.getStorageSync('user').openid
      })
    }
    this.getList()
  },
})