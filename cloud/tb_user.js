var DB = require('./database.js');
var tb_User = {
     //通过聊天信息，查用户信息
     getCuserByMsg(msg){
        var query = new AV.Query('tb_user');
        query.equalTo('wxid', msg.from_wxid);
        return new Promise((resolve, reject)=>{
            query.find().then(res=>{
                if(res && res.length>0 ){
                    resolve(res[0].toJSON());
                }else{
                   //未查到 => 新增
                   DB.insertItem('tb_user',{
                       wxid: msg.from_wxid,
                       uname: msg.from_name
                   }).then(res1=>{
                      resolve(res1.toJSON());
                   }).catch(err=>{
                     resolve(null);
                   })
                }
            }).catch(err=>{
                resolve(null);
            });
        })
     }
   
};

module.exports = tb_User;