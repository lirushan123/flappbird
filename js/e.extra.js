//微信部分API的使用
import {DataStore} from '../js/base/DataStore.js';

export class Tool{
  constructor(){
    //初始化数据(没有数据初始化，不写)

  }
  //手机振动效果
  zhenDong(){
    wx.vibrateLong({
      success(){
        console.log('振动了一次');
      }
    })
  }
  //播放音乐
  playMusic(src){
    //创建音频
    const music=wx.createInnerAudioContext();
    //音频文件的路径
    music.src=src;
    //设置循环播放
    music.loop=loop;
  }
  //获取手机信息
  getTelInfo(){
    vx.sgetSystemInfo({
      success(){
        console.log(res);
      }
    })
  }
  //获取用户信息
  getUserInfo(callback){
    //创建用户信息按钮
    const button=wx.createUserInfoButton({
      type:'text',
      text:'请授权用户信息',
      style:{
         left:100,
         top:100,
         width:150,
         height:40,
         backgroundColor:'red',
         borderColor:'blue',
         borderWidth:2,
         borderRadio:10,
         color:'golden',
         textAlign:'center',
         fontSize:16,
         lineHeight:40
      }
    });
    //监听按钮的点击事件
    button.onTap(res=>{
      if(res.userInfo){
        //用户授权了
        //console.log(res.userInfo);
        callback();
        //销毁按钮
        button.destroy();
      }
    });
  }
  //向服务器发送http请求
  send(){
    wx.request({
      url:'http://localhost:4000',
      success(res){
          console.log(res);
      }
    })
  }
  //发送socket数据
  sendSocket(){
    //第一步建立连接
    wx.connectSocket({
      url: 'WS://localhost:4000',
      success(res){
        console.log('连接服务端socket成功');
      },
      fail(err){
        console.log('连接失败，socket');
      }
    });
    //2.连接成功后,回调中可以发送数据
    wx.onSocketOpen(function(){
      //向后台发送数据
      wx.sendSocketMessage({
        data: '微信发送的数据',

        success(){
          console.log('微信发送成功');
        }
        
      });
      //从后台接收数据
      wx.onSocketMessage(function(res){
        console.log(res);

      })
    })

  }
  //下载图片
  downPic(){
    wx.downloadFile({
      url: 'https://image.so.com/i?q=%E5%9B%BE%E7%89%87&listsrc=sobox&listsign=7a1ab24df8c38cb5b8da25ed110565e6&src=360pic_strong', //仅为示例，并非真实的资源
      success(res) {
        // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
        console.log(res);
        //显示在手机屏幕上
        // let img=wx.createImage();
        // img.src=res.tempFilePath;
        // img.onload=()=>{
        //   DataStore.getInstance().ctx.drawImage(img,0,0,img.width,img.height,0,0,img.width,img.height);
        // }
        //保存到手机相册

      }
    });
    //下载音频
    let path = res.tempFilePath;//获取下载音乐的临时地址
    //播放音乐
    let ctx = wx.createInnerAudioContext();
    ctx.src = path;
    ctx.autoplay = true;
  }
  //上传图片
  upLoad(){
  wx.chooseImage({
    success (res) {
      const tempFilePaths = res.tempFilePaths
      wx.uploadFile({
        url: 'https://localhost:4000', //仅为示例，非真实的接口地址
        filePath: tempFilePaths[0],
        name: 'wxfile',
        formData: {
          'user': 'test'
        },
        success(res) {
          console.log(res);
        }
      })
    }
  })
  }

  
  
}