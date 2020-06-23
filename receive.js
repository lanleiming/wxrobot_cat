//node模块引用
var express = require("express");
var request = require("request");

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

// var query = new AV.Query('tb_user');
// query.equalTo('uname', '十二');
// query.find().then(function(results) {
//   console.log(results[0]._serverData);
// }, function(error) {
//   // error is an instance of AVError.
// });

// const tb_User = AV.Object.extend('tb_user');
// const cuser = new tb_User();
// cuser.set('wxid', '123123');
// cuser.set('uname', '123123');
// cuser.save().then(res=>{
//     console.log(res);
// })

var DB = require("./cloud/database.js");
var tb_user = require("./cloud/tb_user.js");
var tb_todolist = require("./cloud/tb_todolist.js");

// tb_user.getCuserByMsg({
//     type: '100',
//   msg_type: '1',
//   from_wxid: 'wxid_354892546111015',
//   final_from_wxid: 'wxid_3548925461015',
//   from_name: '雷22明',
//   final_from_name: '雷明?????? ',
//   robot_wxid: 'wxid_4extv9dqmuvs22',
//   msg: '1',
//   time: '1592405720',
//   rid: '11502'
// }).then(res=>{
//     console.log(res);

// })

// var query = new AV.Query('tb_todolist');
// query.equalTo('tTime',new Date(new Date().setHours(0,0,0,0)).toString() );
// query.find().then(res=>{
//     console.log(res.length);

// }).catch(err=>{
//     console.log(err);
// });
// for (var i = 0; i < 5; i++) {
//   tb_todolist
//     .insertItem({
//       u_wxid: "123123",
//       uname: "测试",
//       tTime: new Date(),
//       content: "睡觉" + i,
//       ttype: "生活",
//     })
//     .then((res) => {
//       console.log(res);
//     });
// }

tb_todolist.getListByDate("123123", new Date()).then((res) => {
  console.log(res);
});

var app = express();
var bodyParser = require("body-parser");
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

var txtHandler = require("./txtHandler.js");

// app.post('/', function(req, res){
//      console.log(req.body);
//     if(req.body && req.body.type == config.eventType.oneMsg && req.body.msg_type == config.msgType.txt){
//         //私聊：处理文本消息
//         new txtHandler(req.body);
//     }
// });

// app.listen(3000);
