var Common = {

    //获取某天的0点0分
    getTime0(dt){
        return new Date(dt.setHours(0,0,0,0)).toString()
    }

}

module.exports = Common;