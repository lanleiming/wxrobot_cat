//node模块引用
var express = require("express");
var sendHelper = require("./sendHelper.js");

//总的配置文件
var config = require("./config.js");
global.config = config;

var app = express();
var bodyParser = require("body-parser");
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.post("/", function (req, res) {
  console.log(req.body);
  if (req.body && req.body.type == config.eventType.oneMsg) {
    //私聊：处理文本消息
    var msg = req.body.msg.trim();
    if (req.body.msg_type == config.msgType.txt) {
      //文本
      //检测是否为网址
      if (/^http[s]?:\/\/(.*?)/.test(msg)) {
        sendHelper.sendImg(" http://qr.topscan.com/api.php?text=" + msg);
      }
    } else if (req.body.msg_type == config.msgType.card) {
      //名片
      var arr = /alias="(.*?)"/.exec(msg);
      if (arr && arr.length == 2 && arr[1]) {
        sendHelper.sendImg(
          "https://open.weixin.qq.com/qr/code?username=" + arr[1]
        );
      }
    }
  }
});

app.listen(3000);
