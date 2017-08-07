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

/**获取user表的user关键信息*/
router.get('/',function (req,res,next) {
    //通过mysql导出Excel表

    var timestamp = new Date().getTime();
    var filename = '/tmp/user'+timestamp+'.xls';
    var query_sql = "select user_id,nickname,sex,headimgurl,be_date into outfile '"+filename+"' CHARACTER SET gbk from user";

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
            var filename = 'user.xls';
            var filepath = '/tmp/'+filename;

            var stats = fs.statSync(filepath);
            if(stats.isFile()){
                res.set({
                    'Content-Type': 'application/octet-stream',
                    'Content-Disposition': 'attachment; filename='+filename,
                    'Content-Length': stats.size
                });
                fs.createReadStream(filepath).pipe(res)
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


})

module.exports = router;