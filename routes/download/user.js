/**
 * Created by jiangsong on 2017/8/2.
 */
var express = require('express');
var router = express.Router();
var query = require('../../db/DB');
var util = require('util');
var async = require('async');
var fs = require('fs');
var  path = require('path');

function getAndDown(query_sql,filename,filepath,res) {
    async.waterfall([
        function (callback) {
            query(query_sql,function (qerr,valls,fields) {
                if(qerr){
                    callback(qerr);
                }else{
                    callback(null,valls);
                }
            })
        },
        function (result1,callback) {
            //下载文件到本地
            var stats = fs.statSync(filepath);
            if(stats.isFile()){
                res.set({
                    'Content-Type': 'application/octet-stream',
                    'Content-Disposition': 'attachment; filename='+filename,
                    'Content-Length': stats.size
                });
                fs.createReadStream(filepath).pipe(res);
            }else{
                callback('404');
            }

        }
    ],function (err,results) {
        if(err){
            var response = {
                status:0,
                data:{
                    msg:err
                }
            }
            res.json(response);
        }
    })
}

/**获取user表的user关键信息*/
router.get('/user',function (req,res,next) {
    //通过mysql导出Excel表

    var timestamp = new Date().getTime();
    var filename = 'user'+timestamp+'.xls';
    var filepath = '/tmp/'+filename;
    var query_sql = "select user_id,nickname,sex,headimgurl,be_date into outfile '"+filepath+"' CHARACTER SET gbk from user";

    if(ONE_DROP_ENV === 'local_test'){
        filename = 'user1504513297780.xls'; //test

        filepath = '/vartest/user_value/'+filename;
    }

    getAndDown(query_sql,filename,filepath,res);

});

/**获取user_value表的用户积分值和能量值*/
router.get('/fraction',function (req,res,next) {
    var timestamp = new Date().getTime();
    var filename = 'fraction'+timestamp+'.xls';
    var filepath = '/tmp/'+filename;
    var query_sql = "select user_id,fraction,leader_value,update_time into outfile '"+filepath+"' CHARACTER SET gbk from user_value";

    if(ONE_DROP_ENV === 'local_test'){
        filename = 'fraction1504513308742.xls'; //test
        filepath = '/vartest/user_value/'+filename;
    }

    getAndDown(query_sql,filename,filepath,res);
})


/**获取用户信息和积分能量值的组合表*/
router.get('/user_value',function (req,res,next) {
    var timestamp = new Date().getTime();
    var filename = 'user_value'+timestamp+'.xls';
    var filepath = '/tmp/'+filename;

    var query_sql = "select a.user_id,a.nickname,b.fraction,b.leader_value into outfile '"+filepath+"' CHARACTER SET gbk from " +
        "(select * from user) as a left join " +
        "(select * from user_value) as b on a.user_id=b.user_id";

    if(ONE_DROP_ENV === 'local_test'){
        filename = 'user_value1504513322267.xls'; //test
        filepath = '/vartest/user_value/'+filename;
    }

    getAndDown(query_sql,filename,filepath,res);
})



module.exports = router;