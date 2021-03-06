// pages/mine/mine.js
var app = getApp();
let util = require("../../utils/util.js");
Page({
  data:{
    myInfo:null,
  },

  onItemClick:function(e){
    let index = e.currentTarget.dataset.index;
    if (this.data.contactList[index]["contactType"] == "phone"){
      wx.makePhoneCall({
        phoneNumber: this.data.contactList[index]["contactIconName"]
      })
    }
  },

  onClickQrCode:function(){
    wx.previewImage({
      current: this.data.myWechatImg, // 当前显示图片的http链接
      urls: [this.data.myWechatImg] // 需要预览的图片http链接列表
    })
  },


  getMyInfo:function(){
    let that = this;
    let url = app.globalData.serverAddress + 'getMyInfo';
    let data = {
      UserNo: app.globalData.userInfo.UserNo,

    };
    util.HttpGet(url, data, "",
      function (successRes) {
        if (successRes.Code == 1) {
          if (successRes.MyInfo != null){
            that.setData({
              myInfo: successRes.MyInfo
            });
            app.globalData.belongUser = UserNo;
          }
          
        }

      },
      function (failRes) {

      });
  },

  onLoad:function(options){
    let that = this;
    // 页面初始化 options为页面跳转所带来的参数
    app.getUserInfo(function (res) {
      if (res) {
        that.getMyInfo();
        console.log("index--that.getIndexInfo()");
      }
    });
   
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
    
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})