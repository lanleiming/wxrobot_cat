//node模块引用
var express = require('express');
var request = require("request");

var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
    extended:true
}));

var txtHandler = require('./txtHandler.js');	
var config = require('./config.js');

app.post('/', function(req, res){
    // console.log(req.body);
    if(req.body && req.body.type == config.eventType.oneMsg && req.body.msg_type == config.msgType.txt){
        //私聊：处理文本消息
        new txtHandler(req.body);
    }
});

app.listen(3000);












