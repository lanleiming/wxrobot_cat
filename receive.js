//node模块引用
var express = require("express");

//公共js
var Common = require("./common.js");
global.Common = Common;

//总的配置文件
var config = require("./config.js");
global.config = config;

//云存储
const AV = require("leancloud-storage");
global.AV = AV;
AV.init({
  appId: "HpN52gtlYPVpz0zPl2gxIBPj-gzGzoHsz",
  appKey: "GR8uqVRyGU1l7VjWOO8Mpd18",
  serverURL: "https://hpn52gtl.lc-cn-n1-shared.com",
});
var sendHelper = require("./sendHelper.js");
var DB = require("./cloud/database.js");
var tb_user = require("./cloud/tb_user.js");
var tb_todolist = require("./cloud/tb_todolist.js");



var txtHandler = require("./txtHandler.js");

// new txtHandler({
//   type: "100",
//   msg_type: "1",
//   from_wxid: "wxid_354892546111016",
//   final_from_wxid: "wxid_3548925461015",
//   from_name: "测试人",
//   final_from_name: "雷明?????? ",
//   robot_wxid: "wxid_4extv9dqmuvs22",
//   msg: "查看#本周",
//   time: "1592405720",
//   rid: "11502",
// });

var app = express();
var bodyParser = require("body-parser");
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.post('/', function(req, res){
     //console.log(req.body);
    if(req.body && req.body.type == config.eventType.oneMsg && req.body.msg_type == config.msgType.txt){
        //私聊：处理文本消息
        new txtHandler(req.body);
    }
});

app.listen(3000);
