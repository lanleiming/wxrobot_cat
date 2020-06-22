var DB = require('./database.js');

var tb_ToDoList = {
   //新增一条todolist
   insertItem(item){
       return new Promise((resolve, reject)=>{
            //将时间转换成当天的0点0分
            item.tTime = Common.getTime0(item.tTime);
            DB.insertItem('tb_todolist',item)
            .then(res=>{
                resolve(res);
            }).catch(err=>{
                resolve(null);
            })
       })
   },
   //完成一条任务：任务编号
   completedItemById({tid,u_wxid,finishHour}){
      //根据 任务id + 微信id，查数据
      return new Promise((resolve, reject)=>{
        var query = new AV.Query('tb_todolist');
        query.equalTo('tid', tid);
        query.equalTo('u_wxid', u_wxid);
        query.find().then(res=>{
            if(res && res.length>0 ){
                //查到相关数据
                tb_ToDoList.__completedItem.then(res=>{
                    resolve(res);
                });
            }else{
                //未找到
                resolve(null,'当前任务不存在！');
            }
        }).catch(err=>{
            resolve(null,'后台出错，请联系管理员！');
        });

      });
   },
   //完成一条任务：任务内容
   completedItemByText({content,u_wxid,finishHour}){
     //根据内容，模糊匹配，查询用户当天的任务exists
     return new Promise((resolve, reject)=>{
        var query = new AV.Query('tb_todolist');
        query.equalTo('u_wxid', u_wxid);
        query.equalTo('tTime',Common.getTime0(new Date()) );
        query.exists('content', content);
        query.find().then(res=>{
            if(res && res.length>0 ){
                 //查到相关数据
                tb_ToDoList.__completedItem.then(res=>{
                    resolve(res);
                });
            }else{
                //未找到
                resolve(null,'当前任务不存在！');
            }
        }).catch(err=>{
            resolve(null,'后台出错，请联系管理员！');
        });

      });
   
   
   },
   __completedItem(res){
    return new Promise((resolve, reject)=>{
        //查到相关数据
        var item = res[0].toJSON();
        item.isCompleted =1;
        item.finishHour = finishHour?finishHour:0; 
        DB.updataItem('tb_todolist',item).then(res=>{
            resolve(true);
        }).catch(err=>{
            resolve(null,'后台出错，请联系管理员！');
        });
    })
  }
   
};

module.exports = tb_ToDoList;