//index.js
const app = getApp()
wx.cloud.init()
Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    list: [],
    needList: []
  },
  onShow(){
    //this.onQuery()
    this.getList()
  }, 
//   onQuery(){
//     const db = wx.cloud.database()
//     db.collection('focusList').where({}).get({
//       success: res=>{
//         console.log('成功',res)
//         this.setData({
//           list: res.data
//         })  
//       },
//       fail: err=>{
//         wx.showLoading({
//           title: '获取失败',
//         })
//       }
//     })
//  },
  getList() {
    const db = wx.cloud.database()
    db.collection('needList').where({
    }).get({
      success: res => {
        console.log('获取需求列表成功', res)
        this.setData({
          needList: res.data
        })
      },
      fail: err => {
        console.log('获取失败', err)
        wx.showToast({
          title: '获取失败',
        })
      }
    })
  },
 
})
