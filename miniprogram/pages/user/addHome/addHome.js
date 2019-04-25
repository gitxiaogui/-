
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    form: {
      userName: '',
      state: '',
      address: '',
      imgUrl: '',
      list: [],
      type: 0
    },
    index: 0,
    picker: ['关注', '热门', '附近', '新秀'],
    pickertype: ['focusList', 'hotList', 'nearbyList', 'newList']
  },
  PickerChange(e) {
    console.log(e);
    var type = 'form.type'
    this.setData({
      [type]: Number(e.detail.value)
    })
  },
  uploader: function () {
    var that = this;
    let flag = true;
    let imgUrl = 'form.imgUrl'
    wx.chooseImage({
      count: 1, //最多可以选择的图片总数
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        wx.showToast({
          title: '正在上传...',
          icon: 'loading',
          mask: true,
          duration: 500
        })
        let filePath = res.tempFilePaths[0];
        const name = Math.random() * 1000000;
        const cloudPath = name + filePath.match(/\.[^.]+?$/)[0]
        wx.cloud.uploadFile({
          cloudPath: cloudPath,
          filePath: filePath,
        }).then(res => {
          // get resource ID
          console.log(res.fileID)
          that.setData({
            [imgUrl]: res.fileID
          })
        }).catch(error => {
          // handle error
          console.log(error)
        })

      },
      fail: function (res) {
        console.log(res);
      }
    })
  },
  getUserName(e) {
    var userName = 'form.userName'
    this.setData({
      [userName]: e.detail.value
    })
  },
  getState(e) {
    var state = 'form.state'
    this.setData({
      [state]: e.detail.value
    })
  },
  getAddress(e) {
    var address = 'form.address'
    this.setData({
      [address]: e.detail.value
    })
  },
  btnForm() {
    var state = 'form.state';
    var userName = 'form.userName';
    var address = 'form.address';
    var imgUrl = 'form.imgUrl';
    var type = 'form.type';
    console.log(this.data.form)
    if (!this.data.form.userName || !this.data.form.state || !this.data.form.address || !this.data.form.imgUrl) {
      wx.showToast({
        title: '请完善信息',
        icon: 'loading',
        duration: 1000
      })
      return
    }
    const db = wx.cloud.database()
    db.collection('focusList').add({
      data: this.data.form,
      success: res => {
        wx.showToast({
          title: '新增记录成功',
        })

        this.setData({
          [state]: '',
          [userName]: '',
          [address]: '',
          [imgUrl]: '',
        })
        console.log('成功，记录 _id: ', res._id)
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '新增记录失败'
        })
        console.error('失败：', err)
      }
    })
  }
})