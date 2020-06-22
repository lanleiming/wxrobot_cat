//帮助指令
//todolist
//每个modal必备的参数及方法：   __body,keys,__initKeys()
var sendHelper = require('../sendHelper.js');

function Helper(body){
    this.__body =body;
    this.__initKeys();
}

Helper.prototype = {
    __body:null,
    //指令列表
    keys:null,
    __initKeys:function(){
        this.keys = {
            "10000":this.add.bind(this),
            "10001":this.add.bind(this),
            "10002":this.add.bind(this),
            "10003":this.add.bind(this),
            "10004":this.add.bind(this),
            "10005":this.add.bind(this),
            "10006":this.add.bind(this),
            "10007":this.add.bind(this),
            "12345":this.add.bind(this),
            "帮助":this.help.bind(this)
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
   
    //帮助
    help(key){
        console.log(this.__body.msg);
        sendHelper.sendTxt(this.__body.from_wxid,config.helpTxt);
        
    }
};

module.exports = Helper;


