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
        //加载完成之后，执行其他的操作
        this.loader.onloaded(map=>this.onResourceLoaded(map));
            
      
    }
    //资源加载完成之后，执行其他操作的方法
    onResourceLoaded(map){
        console.log(map);

    }
}
