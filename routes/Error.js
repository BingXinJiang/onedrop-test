/**
 * Created by jiangsong on 2017/8/15.
 */

module.exports = {
    //数据库执行错误
    responseDataErr:function (res) {
        var response = {
            status:0,
            data:{
                msg:'数据库执行错误'
            }
        }
        res.json(response);
    },
    //验证参数信息
    responseBodyError:function (res,msg) {
        var response = {
            status:0,
            data:{
                msg:msg
            }
        }
        res.json(response);
    }
}