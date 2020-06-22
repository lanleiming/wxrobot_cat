var config = {
    robot_wxid :'wxid_4extv9dqmuvs22',//机器人微信id
    master_wxid:['wxid_3548925461015','wxid_4extv9dqmuvs22'],//管理员微信id
    sendUrl:'http://127.0.0.1:8073/send',//发送信息的接口url
    helpTxt:'', //所有的口令
    //发送的消息类型
    sendType:{
        txt:100,//文本
        image:103,//图片
        video:104,//视频
        file:105,//文件
        music:108,//音乐
    },
    //事件类型
    eventType:{
        oneMsg:100,//私聊
        group:200,//群聊
        addFirend:500,//收到好友请求
    },
    //收到的消息类型
    msgType:{
        txt:1,//文本
    },
}

//设置  helpTxt
function initHelpTxt(){
    config.helpTxt  = '〓〓〓〓 功能主菜单 〓〓〓〓\r';
  
    config.helpTxt += '回复对应的数字，获取操作步骤\r';
    config.helpTxt += '[红包][红包][红包][红包][红包][红包][红包][红包][红包][红包]\r';
    config.helpTxt += '12345  todolist介绍\r';
    config.helpTxt += '10000  新增任务\r';
    config.helpTxt += '10001  删除任务\r';
    config.helpTxt += '10002  完成任务\r';
    config.helpTxt += '10003  查看任务\r';
    config.helpTxt += '10004  在线点歌\r';
    config.helpTxt += '10005  小程序转二维码\r';
    config.helpTxt += '10006  链接转二维码\r';
    config.helpTxt += '10007  口令转二维码\r';
    
}   
initHelpTxt();



module.exports = config;