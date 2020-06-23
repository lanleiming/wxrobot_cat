//总的数据库操作类
var DB = {
  //新增一条数据
  insertItem(tb_name, item) {
    return new Promise((resolve, reject) => {
      const TB = AV.Object.extend(tb_name);
      const model = new TB();
      for (var key in item) {
        model.set(key, item[key]);
      }
      model
        .save()
        .then((res) => {
          resolve(Common.resolveObj(res, config.DB_Code.ok));
        })
        .catch((err) => {
          resolve(Common.resolveObj(err, config.DB_Code.internalError));
        });
    });
  },
  //修改一条数据：必须得有objectId
  updataItem(tb_name, item) {
    return new Promise((resolve, reject) => {
      if ("objectId" in item) {
        var model = AV.Object.createWithoutData(tb_name, item.objectId);
        delete item.objectId;
        delete item.createdAt;
        delete item.updatedAt;
        for (var key in item) {
          model.set(key, item[key]);
        }
        model
          .save()
          .then((res) => {
            resolve(Common.resolveObj(res, config.DB_Code.ok));
          })
          .catch((err) => {
            resolve(Common.resolveObj(err, config.DB_Code.internalError));
          });
      } else {
        resolve(Common.resolveObj(err, config.DB_Code.notFound));
      }
    });
  },
  //删除一条数据
  deleteItem(tb_name, objectId) {
    return new Promise((resolve, reject) => {
      const modal = AV.Object.createWithoutData(tb_name, objectId);
      modal
        .destroy()
        .then((res) => {
          resolve(Common.resolveObj(res, config.DB_Code.ok));
        })
        .catch((err) => {
          resolve(Common.resolveObj(err, config.DB_Code.notFound));
        });
    });
  },
};

module.exports = DB;
