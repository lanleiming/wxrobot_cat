//自己封装的js
var API = require("./API/API.js");

//加载不同的指令
var ToDoList = require("./commands/todolist.js");
var Helper = require("./commands/helper.js");

//文本消息处理中心
function TxtHandler(body) {
  this.__body = body;
  this.init();
}
TxtHandler.prototype = {
  __body: null,
  commands: [], //指令中心
  init() {

    //加载不同的指令modal
    this.commands = [];
    this._addKeys(ToDoList);
    this._addKeys(Helper);
  
    //机器人发给自己的消息，不做处理
    if (this.__body.from_wxid == this.__body.robot_wxid) {
      return;
    }
    //指令检测，检测成功调用对应的modal.run()
    for (var i = 0; i < this.commands.length; i++) {
      var item = this.commands[i];
      if (new RegExp("^" + item.key).test(this.__body.msg.trim())) {
        item.fn(item.key);
        return;
      }
    }
  },
  //指令中心：增加key
  _addKeys(item_command) {
    //添加keys
    var modal = new item_command(this.__body);
    for (var modal_key in modal.keys) {
      this.commands.push({
        key: modal_key,
        fn: modal.keys[modal_key],
      });
    }
  },
};

module.exports = TxtHandler;
