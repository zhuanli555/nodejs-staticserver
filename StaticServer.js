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
            filepath:'/public/',
            indexpage:'/index.html'
        }
        for (let key in options){
            this.options[key]=options[key];
        }
    }
    //run
    run(){

    }
    //close
    close(){

    }
    //senddata
    sendData(res,data,url){

    }
    //catch 404
    catch404(res){

    }
    //使用promise包装
    readFile(path){

    }

    checkFile(path){

    }
}