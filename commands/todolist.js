//todolist
//每个modal必备的参数及方法：   __body,keys,__initKeys()
var sendHelper = require('../sendHelper.js');

function ToDoList(body){
    this.__body =body;
    this.__initKeys();
}

/*
新增#手机维修
新增:明天#手机维修
新增:20200607#手机维修

完成#任务编号
完成#任务内容（模糊匹配）

删除#任务编号
删除#任务内容

查看
查看#明天
查看#本周（本周完成+未完成）
查看#上周(上周完成)

*/


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

