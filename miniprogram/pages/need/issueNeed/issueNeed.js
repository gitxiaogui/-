// miniprogram/pages/need/issueNeed/issueNeed.js
import { dateFormat } from '../../../util/index.js'
const app = getApp()
Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    array: ['高阶经理', '中层经理', '基层主管', '新员工', '潜力人才', '专业人才', '全体员工'],
    arrayIndex: 0,
    checkList: [
      { name: '战略/领导力',disabled: false},
      { name: '市场与营销', disabled: false }, 
      { name: '财务与金融', disabled: false }, 
      { name: '采购供应链', disabled: false }, 
      { name: '学习与发展', disabled: false }, 
      { name: '通用管理', disabled: false }, 
      { name: '人力资源', disabled: false }, 
      { name: '生产管理', disabled: false }, 
      { name: '行政法规', disabled: false }, 
      { name: 'IT/语言', disabled: false }, 
      { name: '其他', disabled: false }
      ],
    guild: ['计算机', '教育', '生产', '工厂', '林业', '土豪', '屌丝', '渣渣', ],
    guildIndex: 0,
    field: [],
    form: {
      address: ['上海市', '上海市', '黄浦区'],
      startDate: '2019-04-15',
      endDate: '2019-04-25',
      itemName: '',
      field: [],
      stateItem: '',
      userName: '',
      userPhone: '',
      userFirm: '',
      userSection: '',
      serveObj: '',
      guild: '',
      type: '',
      createdTime:''

    }
  },
  // 获取名称
  getItemName(e){
    var itemName = 'form.itemName'
    this.setData({
      [itemName]: e.detail.value
    })
  },
  // 服务对象
  bindPickerChange(e){
    this.setData({
      arrayIndex: e.detail.value
    })
  },
  // 所属行业
  bindPickerGuild(e) {
    this.setData({
      guildIndex: e.detail.value
    })
  },
  // 选择领域
  checkboxChange(e){
    this.setData({
      field: e.detail.value
    })
    if(this.data.field.length==3){
      for (var a = 0; a < this.data.checkList.length;a++){
        var index = 'checkList[' + a +'].disabled';
        this.setData({
          [index]: true
        })
        for(var b = 0;b<this.data.field.length;b++){
          if (this.data.checkList[a].name == this.data.field[b]){
            this.setData({
              [index]: false
            })  
          }  
        }
      }
    }else{
      console.log(111)
      for (var a = 0; a < this.data.checkList.length; a++) {
        var index = 'checkList[' + a + '].disabled';
        this.setData({
          [index]: false
        })
      } 
    }
  },
  // 选择地区
  addressChange: function (e) {
    var address = 'form.address'
    this.setData({
      [address]: e.detail.value
    })
  },
  // 开始时间
  startDateChange(e) {
    var startDate = 'form.startDate'
    this.setData({
      [startDate]: e.detail.value
    })
  },
  // 结束时间
  endDateChange(e){
    var endDate = 'form.endDate'
    this.setData({
      [endDate]: e.detail.value
    })
  },
  // 说明项目
  getStateItem(e){
    var stateItem = 'form.stateItem'
    this.setData({
      [stateItem]: e.detail.value
    })
  },
  // 发布者本人
  getUserName(e) {
    var userName = 'form.userName'
    this.setData({
      [userName]: e.detail.value
    })
  },
  // 发布者手机号
  getUserPhone(e) {
    var userPhone = 'form.userPhone'
    this.setData({
      [userPhone]: e.detail.value
    })
  },
  // 发布者公司
  getUserFirm(e) {
    var userFirm = 'form.userFirm'
    this.setData({
      [userFirm]: e.detail.value
    })
  },
  // 发布者部门
  getUserSection(e){
    var userSection = 'form.userSection'
    this.setData({
      [userSection]: e.detail.value
    })
  },
  submitForm(){
    var serveObj = 'form.serveObj'
    var guild = 'form.guild'
    var field = 'form.field'
    var createdTime = 'form.createdTime'
    this.setData({
      [serveObj]: this.data.array[this.data.arrayIndex],
      [guild]: this.data.guild[this.data.guildIndex],
      [field]: this.data.field,
      [createdTime]: dateFormat(new Date(new Date().getTime()), 'yyyy-MM-dd hh:mm:ss')
    })
    const db = wx.cloud.database();
    db.collection('needList').add({
      data:this.data.form,
      success: res=>{
        console.log('添加成功',res)
        // wx.showToast({
        //   title: '新增成功',
        // })
        wx.navigateTo({
          url: "/pages/need/issueSuccess/issueSuccess"
        })

      },
      fail: err=>{
        wx.showToast({
          title: '新增失败',
        })
      }

    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(option) {
    console.log('==============>',option.type)
    var type = 'form.type'
    this.setData({
      [type]: option.type
    })
  }
})