import { Pipe } from "./Pipe.js";
import { Sprite } from "../base/Sprite.js";
import { DataStore } from "../base/DataStore.js";


//下水管
export class DownPipe extends Pipe{
    constructor(top){
        const img=Sprite.getImage('pipeDown');
        super(img,top);
    }
    draw(){
        //gap表示上下水管空隙
        let gap=DataStore.getInstance().canvas.height/5;
        this.y=this.top+gap;
        super.draw();
    }
}