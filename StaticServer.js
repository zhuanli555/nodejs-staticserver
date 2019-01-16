'use strict';
//import 
const http = require('http');
const fs = require('fs');
const url = require('url');
const mime = require('mime');

module.exports = class StaticServer{
    constructor(options){
        this.currentServer = null;
        this.options={
            port:3304,
            host:'127.0.0.1',
            filepath:'./public',
            indexpage:'/index.html'
        }
        for (let key in options){
            this.options[key]=options[key];
        }
    }
    //run
    run(){
        //通过http.createServer创建http服务
        let self = this;
        this.currentServer = http.createServer((req,res)=>{
            let tmpurl = url.parse(req.url).pathname;
            let requrl = tmpurl === '/'?self.options.indexpage:tmpurl;
            let filepath = self.options.filepath+requrl;
            //使用promise链式调用，不必嵌套回调函数
            self.checkFile(filepath).then(()=>{
                return self.readFile(filepath);
            }).then((data)=>{
                //send
                self.sendData(res,data,requrl);
            }).catch(()=>{
                self.catch404(res);
            });
        }).listen(this.options.port,this.options.host,()=>{
            console.log('server is running on '+this.options.host + ':' + this.options.port);
        });
    }
    //close
    close(){
        this.currentServer.close(()=>{
            console.log('server closed');
        });
    }
    //senddata
    sendData(res,data,url){
        res.writeHead(200,{'Content-Type':mime.getType(url)});
        res.write(data);
        res.end();
    }
    //catch 404
    catch404(res){
        res.writeHead(404,{'Content-Type':'text/plain'});
        res.write("error 404");
        res.end();
    }
    //使用promise包装
    readFile(path){
        return new Promise((resolve,reject)=>{
            fs.readFile(path,(err,data)=>{
                if(err){
                    reject(err);
                }else{
                    resolve(data);
                }
            });
        });
    }

    checkFile(path){
        return new Promise((resolve,reject)=>{
            fs.access(path,(err)=>{
                if(err){
                    reject(err);
                }else{
                    resolve('yes');
                }
            });
        });
    }
}