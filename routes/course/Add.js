/**
 * Created by jiangsong on 2017/9/5.
 */
var express = require('express');
var router = express.Router();
var query = require('../../db/DB');
var async = require('async');
var CONST = require('../ConstConfig');
var ERROR = require('../Error');
var Tool = require('../Tool');

/**
 * 添加标签
 * 参数：label_name
 * */

router.post('/label',function (req,res,next) {

    var label_name = req.body.label_name;

    if(!label_name){
        ERROR.responseBodyError(res,'标签内容不能为空！')
    }


    var check_sql = "select * from label where label_name = '"+label_name+"'";
    var query_max = "select MAX(label_id)label_id from label";

    console.log('check_sql:',check_sql);

    async.waterfall([
        function (callback) {
             query(check_sql,function (qerr,valls,fields) {
                 if(qerr){
                     callback(qerr);
                 }else{
                     if(valls.length>0){
                         callback('数据已经存在！');
                     }else{
                         callback(null,false);
                     }
                 }
             })
        },
        function (isExit,callback) {
            if(!isExit){
                query(query_max,function (qerr,valls,fields) {
                    if(qerr){
                        callback(qerr);
                    }else{
                        var max = valls[0].label_id + 1;
                        console.log('max:',max);
                        callback(null,max);
                    }
                })
            }
        },
        function (max,callback) {
            var insert_sql = "insert into label(label_id,label_name) values("+max+",'"+label_name+"')";
            console.log('insert_sql:',insert_sql);
            query(insert_sql,function (qerr,valls,fields) {
                if(qerr){
                    callback(qerr);
                }else{
                    callback(null);
                }
            })
        }
    ],function (err,result) {
        if(err){
            ERROR.responseBodyError(res,err);
        }else{
            var response = {
                status:1,
                data:{
                    msg:'标签数据插入成功！'
                }
            }
            res.json(response);
        }
    })


})

/**
 * 添加课程对应的标签
 * 参数：section_id    labels 【】 "['测试添加标签1','测试添加标签2','测试添加标签3']"
 * */

router.post('/label/section',function (req,res,next) {

    var section_id = req.body.section_id;
    var labels = req.body.labels;

    if(!Tool.isMyArray(labels)){
        labels = JSON.parse(labels);
    }

    if(!section_id || labels.length<1){
        ERROR.responseBodyError(res,'标签或课程ID错误！');
        return;
    }

    var labelsFun = labels.map(function (label,idx) {
        return function (cb) {
            var query_sql = "select label_id from label where label_name='"+label+"'";
            console.log('query_sql1:',query_sql);
            async.waterfall([
                function (callback) {
                    query(query_sql,function (qerr,valls,fields) {
                        if(qerr){
                            callback(qerr);
                        }else{
                            if(valls.length<1){
                                callback('标签名字填写错误');
                            }else{
                                var label_id = valls[0].label_id;
                                callback(null,label_id);
                            }
                        }
                    })
                },
                function (label_id,callback) {
                    var query_sql = "select * from course_label where section_id="+section_id+" and label_id="+label_id;
                    console.log('query_sql2:',query_sql);
                    query(query_sql,function (qerr,valls,fields) {
                        if(qerr){
                            callback('数据库查询错误！');
                        }else{
                            if(valls.length>0){
                                callback(null,true,label_id);
                            }else{
                                callback(null,false,label_id);
                            }
                        }
                    })
                },
                function (isHas,label_id,callback) {
                    if(isHas){
                        callback(null);
                    }else{
                        var insert_sql = "insert into course_label(section_id,label_id) values("+section_id+","+label_id+")";
                        console.log('insert_sql:',insert_sql);
                        query(insert_sql,function (qerr,valls,fields) {
                            if(qerr){
                                callback(qerr);
                            }else{
                                callback(null);
                            }
                        })
                    }
                }
            ],function (err,rresult) {
                if(err){
                    cb(err);
                }else{
                    cb(null);
                }
            })
        }
    })

    async.parallel(labelsFun,function (err,result) {
        if(err){
            ERROR.responseBodyError(res,err);
        }else{
            var response = {
                status:1,
                data:{
                    msg:'数据插入成功！'
                }
            }
            res.json(response);
        }
    })
})


module.exports = router;