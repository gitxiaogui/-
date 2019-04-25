
Page({
  data: {
    TabCur: 0,
    tabList: ['关注', '热门', '附近', '新秀'],
    wxImg: '',
    focusList: [],
    hotList: [],
    imgList: [
      'http://img.17kuxiu.com/banner/banner20190313154655.jpg',
      'http://img.17kuxiu.com/banner/banner20190409101131.png',
      'http://img.17kuxiu.com/banner/banner20190409101131.png',
      'http://img.17kuxiu.com/banner/banner20190321151811.jpg',
      'http://img.17kuxiu.com/banner/banner20190312192438.png',
    ]
  },
  onLoad: function (options) {
    this.getFocusList()
  },
  tabSelect(e) {
    console.log(e);
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id - 1) * 60
    })
    this.getFocusList()
  },
  delete1(e){
    console.log(e.target.dataset.id)
    const db = wx.cloud.database();
    db.collection('focusList').doc(e.target.dataset.id).remove({
      success: res=>{
        wx.showToast({
          title: '删除成功',
        })
        this.getFocusList()
      },
      fail: err=>{
        wx.showToast({
          title: '删除失败'
        })
      }
    })
  },
  getFocusList(){
    const db = wx.cloud.database();
    db.collection('focusList').where({
      type: this.data.TabCur
    }).get({
      success: res=>{
        console.log('获取关注列表',res)
        this.setData({
          focusList: res.data
        })
      },
      fail: err=>{
        console.log(err);
        wx.showToast({
          title: '获取失败',
        })
      }
    })

  }
})