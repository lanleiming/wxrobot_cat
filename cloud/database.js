//总的数据库操作类
var DB = {
    //新增一条数据
    insertItem(tb_name,item){
        return new Promise((resolve, reject)=>{
            const TB = AV.Object.extend(tb_name);
            const model = new TB();
            for(var key in item){
                model.set(key, item[key]);
            }
            model.save().then(res=>{
                console.log(1111);
                console.log(res);
                resolve(res);
            }).catch(err=>{
                console.log(2222);
                console.log(err);
                reject(err);
            })
         })
    },
    //修改一条数据：必须得有objectId
    updataItem(tb_name,item){
        return new Promise((resolve, reject)=>{
            if('objectId' in item){
                var model = AV.Object.createWithoutData(tb_name, item.objectId);
                delete model.objectId;
                delete model.createdAt;
                delete model.updatedAt;
                for(var key in item){
                    model.set(key, item[key]);
                }
                model.save().then(res=>{
                    resolve(true);
                }).catch(err=>{
                    resolve(false);
                })
            }else{
                resolve(false);
            }
        })
    },
    //删除一条数据
    deleteItem(tb_name,objectId){
        return new Promise((resolve, reject)=>{
            const modal = AV.Object.createWithoutData(tb_name, objectId);
            modal.destroy().then(res=>{
                resolve(res);  
            }).catch(err=>{
                resolve(false);  
            });
        });
    }

}

module.exports = DB;