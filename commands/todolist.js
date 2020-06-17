//todolist
//每个modal必备的参数及方法：   __body,keys,__initKeys()
var sendHelper = require('../sendHelper.js');
var config = require('../config.js');

function ToDoList(body){
    this.__body =body;
    this.__initKeys();
}

ToDoList.prototype = {
    __body:null,
    //指令列表
    keys:null,
    __initKeys:function(){
        this.keys = {
            "新增":this.add.bind(this),
            "完成":this.complete.bind(this),
            "查看":this.select.bind(this),
            "删除":this.delete.bind(this),
        };
    },
    //检测用户权限
    checkUserRule(){

    },

    //根据指令，处理消息
    //新增任务
    add(key){
        //console.log(this);
       console.log('调用了新增');
       sendHelper.sendTxt(this.__body.from_wxid,key+'||'+this.__body.msg);
    },
    //删除任务
    delete(key){},
    //查看任务
    select(key){},
    //完成任务
    complete(key){},
   
};

module.exports = ToDoList;

