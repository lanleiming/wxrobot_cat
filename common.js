var Common = {
  //获取某天的0点0分
  getTime0(dt) {
    return new Date(dt.setHours(0, 0, 0, 0)).toString();
  },
  //对promise返回的数据进行一层包装
  resolveObj(res, code) {
    return {
      data: res,
      errno: code,
    };
  },
};

module.exports = Common;
