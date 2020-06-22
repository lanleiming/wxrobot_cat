//发送消息
var request = require("request");

//post请求
var postData={
    type:config.sendType.txt,
    msg:'',
    to_wxid:'',
    robot_wxid:config.robot_wxid
};

var sendHelper = {
    myPost:function(type,to_wxid,txt){
        return new Promise((resolve, reject)=>{
            postData.type = type;
            postData.to_wxid = to_wxid;
            postData.msg = encodeURIComponent(txt);
            request({
                url: config.sendUrl,//请求路径
                method: "POST",//请求方式，默认为get
                headers: {//设置请求头
                    "content-type": "application/json",
                },
                body: JSON.stringify(postData)//post参数字符串
            }, function(error, response, body) {	
               // console.log(body);
                if (!error && response.statusCode == 200) {
                    resolve(true);		
                }else{
                    resolve(false);		
                }
            }); 
            
        })
    },
    sendTxt:function(to_wxid,txt){
        return sendHelper.myPost(config.sendType.txt,to_wxid,txt);
    },
    sendImg:function(to_wxid,img){
        return sendHelper.myPost(config.sendType.image,to_wxid,img);
    },
};





module.exports = sendHelper;