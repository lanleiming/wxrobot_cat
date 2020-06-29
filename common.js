var Common = {
  //返回：某天的0点0分
  getTime0(dt) {
    return new Date(dt.setHours(0, 0, 0, 0));
  },
  //日期相关操作
  DateHelper: {
    __getTime(dt, n) {
      var now = dt;
      var year = now.getFullYear();
      var month = now.getMonth() + 1;
      var day = now.getDay(); //返回星期几的某一天;
      n = day == 0 ? n + 6 : n + (day - 1);
      now.setDate(now.getDate() - n);
      date = now.getDate();
      month = now.getMonth() + 1;
      year = now.getFullYear();
      var s =
        year +
        "-" +
        (month < 10 ? "0" + month : month) +
        "-" +
        (date < 10 ? "0" + date : date) +
        " 00:00:00";
      return new Date(s);
    },
    getTomorrow(dt) {
      var now = dt.setDate(dt.getDate() + 1);
      return new Date(now);
    },
    //获取上周起始时间
    getLastWeekStart(dt) {
      return this.__getTime(dt, 7);
    },
    getLastWeekEnd(dt) {
      return this.__getTime(dt, 1);
    },
    getWeekStart(dt) {
      return this.__getTime(dt, 0);
    },
    getWeekEnd(dt) {
      return this.__getTime(dt, -6);
    },
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
