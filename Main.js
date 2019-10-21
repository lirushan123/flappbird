import { ResourceLoader } from "./js/base/ResourceLoader.js";


//程序主类，用于小游戏过程中数据的初始化，以及点击事件的绑定
export class Main{
    constructor(){
        console.log('游戏开始了');
        //初始化画布
        this.canvas=document.getElementById('game');
        this.ctx=this.canvas.getContext('2d');
        //初始化资源加载器
        this.loader=new ResourceLoader();
        //初始化变量值
        this.dataStore=DataStore.getInstance();
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
        this.dataStor.res=map;
        this.init();

    }
    //游戏初始化
    init(){

    }
}
