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

/**
 * 添加企业
 * 参数：company
 * */

router.post('/company',function (req,res) {

    var company_name = req.body.company_name;
    var company_log = CONST.ResBaseUrl + '/images/company/logo/'+req.body.company_log;
    var company_intro = req.body.company_intro;
    var open_date = req.body.open_date;

    if(!company_name){
        ERROR.responseBodyError(res,'参数错误！');
        return;
    }

    var query_sql = "select max(company_id)max from company";

    async.waterfall([
        function (cb) {
            query(query_sql,function (qerr,valls,fields) {
                if(qerr){
                    cb(qerr);
                }else{
                    if(valls.length<1){
                        cb(null,1);
                    }else{
                        var num = valls[0].max+1;
                        cb(null,num);
                    }
                }
            })
        },
        function (max,cb) {
            var insert_sql = "insert into company(company_id,company_name,company_log,company_intro,open_date) values(" +
                +max+",'"+company_name+"','"+company_log+"','"+company_intro+"','"+open_date+"')";

            query(insert_sql,function (qerr,valls,fields) {
                if(qerr){
                    cb(qerr);
                }else{
                    cb(null);
                }
            })
        }
    ],function (err,result) {
        if(err){
            ERROR.responseDataErr(res);
        }else{
            var response = {
                status:1,
                data:{
                    msg:'success'
                }
            }
            res.json(response);
        }
    })

})

/**
 * 添加项目
 * 参数 project
 * */
router.post('/project',function (req,res) {

    var project_name = req.body.project_name;
    var project_intro = req.body.project_intro;
    var open_date = req.body.open_date;
    var company_id = req.body.company_id;

    if(!project_name || !company_id){
        ERROR.responseBodyError(res,'参数错误！');
        return;
    }

    var query_max = "select max(project_id)max from project";

    async.waterfall([
        function (cb) {
            query(query_max,function (qerr,valls,fields) {
                if(qerr){
                    cb(qerr);
                }else{
                    if(valls.length>0){
                        var num = valls[0].max+1;
                        cb(null,num);
                    }else{
                        cb(null,1);
                    }
                }
            })
        },
        function (max,cb) {
            var insert_sql = "insert into project(project_id,project_name,project_intro,open_date,company_id) " +
                "values("+max+",'"+project_name+"','"+project_intro+"','"+open_date+"',"+company_id+")";
            // console.log('insert_sql:',insert_sql);
            query(insert_sql,function (qerr,valls,fields) {
                if(qerr){
                    cb(qerr);
                }else{
                    cb(null);
                }
            })
        }
    ],function (err,result) {
        if(err){
            ERROR.responseDataErr(res);
        }else{
            var response = {
                status:1,
                data:{
                    msg:'success'
                }
            }
            res.json(response);
        }
    })
})

/**
 * 添加班级
 * */
router.post('/class',function (req,res) {
    var class_name = req.body.class_name;
    var class_logo = CONST.ResBaseUrl + '/images/class/logo/'+req.body.class_logo;
    var class_intro = req.body.class_intro;
    var class_num = req.body.class_num;
    var open_date = req.body.open_date;
    var project_id = req.body.project_id;
    var access_code = Tool.genPwdClass();

    var query_max = "select max(class_id)max from class where class_id != 999";
    async.waterfall([
        function (cb) {
            query(query_max,function (qerr,valls,fields) {
                if(qerr){
                    cb(qerr);
                }else{
                    if(valls.length<1){
                        cb(null,1);
                    }else{
                        var num = valls[0].max+1;
                        if(num === 999){
                            num = 1000;
                        }
                        cb(null,num);
                    }
                }
            })
        },
        function (max,cb) {
            var insert_sql = "insert into class(class_id,class_name,class_logo,class_intro,class_num,open_date,project_id,access_code) " +
                "values("+max+",'"+class_name+"','"+class_logo+"','"+class_intro+"',"+class_num+",'"+open_date+"'" +
                ","+project_id+",'"+access_code+"')";
            query(insert_sql,function (qerr,valls,fields) {
                if(qerr){
                    cb(qerr);
                }else{
                    cb(null);
                }
            })
        }
    ],function (err,result) {
        if(err){
            ERROR.responseDataErr(res);
        }else{
            var response = {
                status:1,
                data:{
                    msg:'success'
                }
            };
            res.json(response);
        }
    })

})

/**
 * 添加老师
 * 参数：  teacher_name   teacher_position  teacher_des
 * */
router.post('/teacher',function (req,res,next) {

    var teacher_name = req.body.teacher_name;
    var teacher_position = req.body.teacher_position;
    var teacher_des = req.body.teacher_des;

    var teacher_head = '';
    var teacher_img = '';



})

module.exports = router;