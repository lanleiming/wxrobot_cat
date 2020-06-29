//todolist
//每个modal必备的参数及方法：   __body,keys,__initKeys()
var sendHelper = require("../sendHelper.js");
var tb_user = require("../cloud/tb_user.js");
var tb_todolist = require("../cloud/tb_todolist.js");
const Common = require("../common.js");
const config = require("../config.js");
const e = require("express");

function ToDoList(body) {
  this.__body = body;
  this.__initKeys();
}

/*
新增
删除
完成
查看
*/

ToDoList.prototype = {
  __body: null,
  //指令列表
  keys: null,
  //用户信息
  cuser: null,
  //发消息的人
  from_wxid: "",
  __initKeys: function () {
    this.keys = {
      新增: this.add.bind(this),
      完成: this.complete.bind(this),
      查看: this.select.bind(this),
      删除: this.delete.bind(this),
    };
    this.from_wxid = this.__body.from_wxid;
  },
  //检测用户权限
  async checkUserRule() {
    //检测数据库是否有此用户信息
    var res = await tb_user.getCuserByMsg(this.__body);
    if (res.errno == config.DB_Code.ok) {
      this.cuser = res.data;
      return true;
    } else {
      sendHelper.sendTxt(this.from_wxid, "用户权限校验失败，请联系管理员。");
      return false;
    }
  },

  //根据指令，处理消息
  //新增任务
  async add(key) {
    // 新增#手机维修
    // 新增:明天#手机维修
    // 新增:20200607#手机维修
    // 新增:20200607:生活#手机维修
    if (await this.checkUserRule()) {
      //检测：新增指令是否符合要求
      var txt = this.__body.msg.trim();
      var msg = "";
      var index = txt.indexOf("#");
      if (index < 0 || index == txt.length - 1) {
        msg = "指令有误！";
      } else {
        //item
        var txt1 = txt.slice(0, index);
        var txt2 = txt.slice(index + 1);
        var item_todolist = {
          u_wxid: "" + this.from_wxid,
          uname: this.cuser.uname,
          tTime: new Date(),
          content: txt2,
          ttype: "",
        };
        var txt1_arr = txt1.split(/[:：]/);
        if (txt1_arr.length == 3) {
          //处理时间+分类
          item_todolist.tTime = __getDateFromTxt(txt1_arr[1]);
          item_todolist.ttype = txt1_arr[2];
        } else if (txt1_arr.length == 2) {
          //处理时间
          item_todolist.tTime = __getDateFromTxt(txt1_arr[1]);
        }
        if (
          !item_todolist.tTime ||
          (item_todolist.tTime instanceof Date &&
            isNaN(item_todolist.tTime.getTime()))
        ) {
          msg = "指令错误！请输入正确的时间格式：yyyyMMdd";
        } else {
          //新增
          var res_todo = await tb_todolist.insertItem(item_todolist);
          if (res_todo.errno == config.DB_Code.ok) {
            msg = "新增任务成功！";
          } else {
            msg = "新增任务失败，请联系管理员。";
          }
        }
      }
      console.log(msg);
      sendHelper.sendTxt(this.from_wxid, msg);
    }
    //文本转换为时间
    function __getDateFromTxt(txt) {
      var now = new Date();
      if (txt == "明天") {
        return Common.DateHelper.getTomorrow(new Date());
      } else {
        if (txt.length != 8) {
          return;
        }
        var pattern = /(\d{4})(\d{2})(\d{2})/;
        var formatedDate = txt.replace(pattern, "$1-$2-$3 00:00:00");
        return new Date(formatedDate);
      }
    }
  },
  //删除任务
  async delete(key) {
    // 删除#任务编号
    // 删除#任务内容
    if (await this.checkUserRule()) {
      //检测：指令是否符合要求
      var txt = this.__body.msg.trim();
      var msg = "";
      var index = txt.indexOf("#");
      if (index < 0 || index == txt.length - 1) {
        msg = "指令有误！";
      } else {
        //检测 编号
        var content = txt.slice(index + 1);
        var res = null;
        if (!isNaN(content)) {
          //编号
          res = await tb_todolist.deleteItemById({
            tid: +content,
            u_wxid: this.from_wxid,
          });
        } else {
          res = await tb_todolist.deleteItemByText({
            content: content,
            u_wxid: this.from_wxid,
          });
        }
        if (res.errno == config.DB_Code.ok) {
          msg = "删除成功！";
        } else if (res.errno == config.DB_Code.notFound) {
          msg = "删除失败，任务不存在！";
        } else {
          msg = "删除失败，请联系管理员！";
        }
      }
      console.log(msg);
      sendHelper.sendTxt(this.from_wxid, msg);
    }
  },
  //查看任务
  async select(key) {
    // 查看
    // 查看#明天
    // 查看#本周（本周完成+未完成）
    // 查看#上周(上周完成)
    if (await this.checkUserRule()) {
      var txt = this.__body.msg.trim();
      var msg = "";
      var index = txt.indexOf("#");
      /*
      〓〓〓 本周任务 〓〓〓
      #1    任务一
      #13   任务一
      #15   任务一
      */
      var res = null;
      if (index == -1) {
        //当天
        res = await tb_todolist.getListByDate(this.from_wxid, new Date());
      } else {
        var params = txt.slice(index + 1);
        if (["明天", "本周", "上周"].indexOf(params) > -1) {
          switch (params) {
            case "明天":
              res = await tb_todolist.getListByDate(
                this.from_wxid,
                Common.DateHelper.getTomorrow(new Date())
              );
              break;
            case "本周":
              res = await tb_todolist.getListByDate(
                this.from_wxid,
                Common.DateHelper.getWeekStart(new Date()),
                Common.DateHelper.getWeekEnd(new Date())
              );
              break;
            case "上周":
              res = await tb_todolist.getListByDate(
                this.from_wxid,
                Common.DateHelper.getLastWeekStart(new Date()),
                Common.DateHelper.getLastWeekEnd(new Date())
              );
              break;
            default:
              break;
          }
        } else {
          msg = "指令错误";
        }
      }
      if (res) {
        if (res.errno == config.DB_Code.ok) {
          //msg += "〓〓〓〓 " + txt.slice(index + 1) + "任务 〓〓〓〓\r";
          for (var i = 0; i < res.data.length; i++) {
            let item = res.data[i];
            msg +=
              "#" +
              item.tid +
              "\t" +
              item.content +
              "\t" +
              new Date(item.tTime).toLocaleDateString() +
              "\n";
          }
        } else if (res.errno == config.DB_Code.notFound) {
          msg = "当前没有任务，请添加！";
        } else {
          msg = "操作失败，请联系管理员！";
        }
      }
      console.log(msg);
      sendHelper.sendTxt(this.from_wxid, msg);
    }
  },
  //完成任务
  async complete(key) {
    // 完成#任务编号
    // 完成:1h#任务编号
    // 完成:1分钟#任务内容（模糊匹配）
    // 完成:生活#任务内容（模糊匹配）
    if (await this.checkUserRule()) {
      //检测：指令是否符合要求
      var txt = this.__body.msg.trim();
      var msg = "";
      var index = txt.indexOf("#");
      if (index < 0 || index == txt.length - 1) {
        msg = "指令有误！";
      }

      console.log(msg);
      sendHelper.sendTxt(this.from_wxid, msg);
    }
  },
};

module.exports = ToDoList;
