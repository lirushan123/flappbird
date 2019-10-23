let http=require('http');

http.createServer(function(req,res){
    res.setHeader(200,{"Content-Type":"text/html;charset-=utf-8"});
    res.setHeader('Set-Cookie',['type=nijia','language=javascript']);
    res.end('{status:"0",msg:"返回数据"}');
}).listen(4000);