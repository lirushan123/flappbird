const webSocket=require('ws');
//创建服务
const socket=new webSocket.Server({
    port:4000
});
//监听,当有连接连上时候，得到一个ws对象
socket.on("connection",function(ws){
    //连接的时候发送一条欢迎信息
    ws.send('欢迎访问');
    ws.on('message',function(msg){
        console.log('客户端发送过来的数据是',msg);
    })
})

