var DB = require("./database.js");

var tb_ToDoList = {
  //新增一条todolist
  insertItem(item) {
    return new Promise((resolve, reject) => {
      //将时间转换成当天的0点0分
      item.tTime = Common.getTime0(item.tTime);
      DB.insertItem("tb_todolist", item).then((res) => {
        if (res.errno == config.DB_Code.ok) {
          resolve(Common.resolveObj(res.data.toJSON(), config.DB_Code.ok));
        } else {
          resolve(Common.resolveObj(null, config.DB_Code.ok));
        }
      });
    });
  },
  //完成一条任务：任务编号
  completedItemById({ tid, u_wxid, finishHour,ttype }) {
    //根据 任务id + 微信id，查数据
    return new Promise((resolve, reject) => {
      tb_ToDoList.__queryItemById({ tid, u_wxid }).then((res) => {
        if (res.errno == config.DB_Code.ok) {
          //查到相关数据
          tb_ToDoList.__completedItem(res.data, {finishHour,ttype}).then((res1) => {
            resolve(res1);
          });
        } else {
          //未找到，或其他原因
          resolve(res);
        }
      });
    });
  },
  //完成一条任务：任务内容
  completedItemByText({ content, u_wxid, finishHour,ttype }) {
    //根据内容，模糊匹配，查询用户当天的任务exists
    return new Promise((resolve, reject) => {
      tb_ToDoList.__queryItemByText({ content, u_wxid }).then((res) => {
        if (res.errno == config.DB_Code.ok) {
          //查到相关数据
          tb_ToDoList.__completedItem(res.data, {finishHour,ttype}).then((res1) => {
            resolve(res1);
          });
        } else {
          //未找到，或其他原因
          resolve(res);
        }
      });
    });
  },
  //删除一条任务：任务编号
  deleteItemById({ tid, u_wxid }) {
    return new Promise((resolve, reject) => {
      tb_ToDoList.__queryItemById({ tid, u_wxid }).then((res) => {
        if (res.errno == config.DB_Code.ok) {
          DB.deleteItem("tb_todolist", res.data.objectId).then((res1) => {
            if (res1.errno == config.DB_Code.ok) {
              resolve(res);
            } else {
              resolve(res1);
            }
          });
        } else {
          //未找到
          resolve(res);
        }
      });
    });
  },
  //删除一条任务：任务内容
  deleteItemByText({ content, u_wxid }) {
    return new Promise((resolve, reject) => {
      tb_ToDoList.__queryItemByText({ content, u_wxid }).then((res) => {
        if (res.errno == config.DB_Code.ok) {
          DB.deleteItem("tb_todolist", res.data.objectId).then((res1) => {
            if (res1.errno == config.DB_Code.ok) {
              resolve(res);
            } else {
              resolve(res1);
            }
          });
        } else {
          //未找到
          resolve(res);
        }
      });
    });
  },
  //获取用户某个时间段内的任务，date2为空，则取date1那天的
  getListByDate(u_wxid, date1, date2) {
    return new Promise((resolve, reject) => {
      var query = new AV.Query("tb_todolist");
      query.equalTo("u_wxid", u_wxid);
      if (date2) {
        query.ascending("tTime");
        //时间段内的数据
        query.greaterThanOrEqualTo("tTime", Common.getTime0(date1)); // >= date1
        query.lessThanOrEqualTo("tTime", Common.getTime0(date2)); // <= date2
      } else {
        //一天的数据
        query.ascending("tid");
        query.equalTo("tTime", Common.getTime0(date1));
      }
      query
        .find()
        .then((res) => {
          if (res && res.length > 0) {
            let tp_list = [];
            for (var i = 0; i < res.length; i++) {
              tp_list.push(res[i].toJSON());
            }
            resolve(Common.resolveObj(tp_list, config.DB_Code.ok));
          } else {
            resolve(Common.resolveObj(null, config.DB_Code.notFound));
          }
        })
        .catch((err) => {
          resolve(Common.resolveObj(err, config.DB_Code.internalError));
        });
    });
  },
  __queryItemById({ tid, u_wxid }) {
    return new Promise((resolve, reject) => {
      var query = new AV.Query("tb_todolist");
      query.equalTo("tid", tid);
      query.equalTo("u_wxid", u_wxid);
      query
        .find()
        .then((res) => {
          if (res && res.length > 0) {
            resolve(Common.resolveObj(res[0].toJSON(), config.DB_Code.ok));
          } else {
            resolve(Common.resolveObj(null, config.DB_Code.notFound));
          }
        })
        .catch((err) => {
          resolve(Common.resolveObj(err, config.DB_Code.internalError));
        });
    });
  },
  __queryItemByText({ content, u_wxid }) {
    return new Promise((resolve, reject) => {
      var query = new AV.Query("tb_todolist");
      query.equalTo("u_wxid", u_wxid);
      query.equalTo("tTime", Common.getTime0(new Date()));
      query.contains("content", content);
      query
        .find()
        .then((res) => {
          if (res && res.length > 0) {
            resolve(Common.resolveObj(res[0].toJSON(), config.DB_Code.ok));
          } else {
            resolve(Common.resolveObj(null, config.DB_Code.notFound));
          }
        })
        .catch((err) => {
          resolve(Common.resolveObj(err, config.DB_Code.internalError));
        });
    });
  },
  __completedItem(res, {finishHour,ttype}) {
    return new Promise((resolve, reject) => {
      //查到相关数据
      var item = res;
      item.isCompleted = 1;
      item.finishHour = finishHour ? finishHour : 0;
      item.ttype = ttype!='' ? ttype :item.ttype ;
      item.tTime = new Date(item.tTime);
      DB.updataItem("tb_todolist", item)
        .then((res1) => {
          resolve(res1);
        })
        .catch((err) => {
          resolve(Common.resolveObj(err, config.DB_Code.internalError));
        });
    });
  },
};

module.exports = tb_ToDoList;
