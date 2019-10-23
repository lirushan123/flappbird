import { ResourceLoader } from "./js/base/ResourceLoader.js";

import { Background } from "./js/runtime/Background.js";
import { Land } from "./js/runtime/Land.js";
import { Director } from "./js/Director.js";

import { DataStore } from "./js/base/DataStore.js";
import { Birds } from "./js/player/Birds.js";
import { StartButton } from "./js/player/StartButton.js";
import { Score } from "./js/player/Score.js";



//程序主类，用于小游戏过程中数据的初始化，以及点击事件的绑定
export class Main{
    constructor(){
        console.log('游戏开始了');
        //初始化画布
        this.canvas=document.getElementById('game');
        // this.canvas=vx.createCanvas();
        this.ctx=this.canvas.getContext('2d');
        //初始化变量值
        this.dataStore=DataStore.getInstance();
        //初始化资源加载器
        this.loader=new ResourceLoader();
        //初始化一个导演
        this.director=Director.getInstance();
        //加载完成之后，执行其他的操作
        this.loader.onloaded(map=>this.onResourceLoaded(map));
            
      
    }
    //资源加载完成之后，执行其他操作的方法
    onResourceLoaded(map){
        //console.log(map);
        //模拟画背景图
        //let bg=map.get('background');//拿背景图

        //this.ctx.drawImage(bg,0,0,bg.width,bg.height,0,0,this.canvas.width,this.canvas.height);
        //保存资源
        //不适用set保存的原因：set方法保存的数据在游戏结束时会被销毁，
        //二下面的数据即使游戏结束，也不会销毁，下一句可以继续使用
        this.dataStore.canvas=this.canvas;
        this.dataStore.ctx=this.ctx;
        this.dataStore.res=map;
        this.fillStyle='red';
        this.ctx.fillText('aaa',0,0);
       
        t.getTelInfo();
        const t=new Tool();
        //t.send();
        t.sendSocket();
        t.downPic();
        //查询用户是否已经授权
        wx.getUserInfo({
          success:(result)=>{
            //曾今授权过，可以直接获取用户信息
            console.log('rrr');
            if(result.userInfo){
              
              this.init();
            }
          },
          fail:err=>{
            //之前没有授权，获取用户信息失败
            console.log('eee');
            t.getUserInfo(()=>{

              this.init();
            });
          }
        })
        


    }
    
         //游戏初始化,初始化游戏中的数据，将其保存在变量池中
    init(){
        //游戏没有结束
        this.director.isGameOver=false;
        //模拟画背景图
        //new Background().draw();
        //new Land().draw();

        this.dataStore.set('background',new Background())
                        .set('land',new Land())
                        .set('pipe',[])
                        .set('birds',new Birds())
                        .set('startButton',new StartButton())
                        .set('socre',new Score());
        //调用单击事件的方法

        //县创建一组水管
        this.director.createPipes();

        //开始运行
        this.director.run();
    }
    //绑定单击事件
    gameEvent(){
        this.canvas.addEventListener('touchstart',e=>{
            if(this.director.isGameOver){
                //游戏结束了，点击重新开始
                this.init();
            }else{
                //游戏未结束，点击触发小鸟向上飞一段距离
                this.director.draw();
            }
        }
    }
    
}
