var DB = require("./database.js");
var tb_User = {
  //通过聊天信息，查用户信息
  getCuserByMsg(msg) {
    var query = new AV.Query("tb_user");
    query.equalTo("wxid", msg.from_wxid);
    return new Promise((resolve, reject) => {
      query
        .find()
        .then((res) => {
          if (res && res.length > 0) {
            resolve(Common.resolveObj(res[0].toJSON(), config.DB_Code.ok));
          } else {
            //未查到 => 新增
            DB.insertItem("tb_user", {
              wxid: msg.from_wxid,
              uname: msg.from_name,
            }).then((res1) => {
              if (res1.errno == config.DB_Code.ok) {
                resolve(
                  Common.resolveObj(res1.data.toJSON(), config.DB_Code.ok)
                );
              } else {
                resolve(Common.resolveObj(null, config.DB_Code.ok));
              }
            });
          }
        })
        .catch((err) => {
          resolve(Common.resolveObj(err, config.DB_Code.internalError));
        });
    });
  },
};

module.exports = tb_User;
