/**
 * Created by jiangsong on 2017/9/6.
 */
var express = require('express');
var router = express.Router();
var query = require('../../db/DB');
var async = require('async');
var CONST = require('../ConstConfig');
var ERROR = require('../Error');
var Tool = require('../Tool');

/**
 * 获取所有的标签
 * */
router.get('/labels',function (req,res,next) {

    var query_sql = "select label_id,label_name from label order by label_id";

    query(query_sql,function (qerr,valls,fields) {
        if(qerr){
            ERROR.responseDataErr(res);
        }else{
            var response = {
                status:1,
                data:valls
            }
            res.json(response);
        }
    })

})

/**
 * 获取所有老师的信息
 * */

router.get('/teachers',function (req,res,next) {

    var query_sql = "select teacher_id,teacher_name,teacher_position,teacher_des,teacher_head,teacher_image from teacher order by teacher_id";

    // console.log('query_sql:',query_sql);

    query(query_sql,function (qerr,valls,fields) {
        if(qerr){
            ERROR.responseDataErr(res);
        }else{
            var response = {
                status:1,
                data:valls
            }
            res.json(response);
        }
    })

})

/**
 * 获取所有留言信息
 * 参数   page   形式  ?page=1
 * */
router.get('/comments',function (req,res,next) {

    var page = req.query.page;
    if(!page){
        page = 1;
    }

    var query_sql = "select A.comment_id,B.nickname,C.section_name,A.comment,A.datetime,A.is_checked from " +
        "(select comment_id,user_id,section_id,comment,datetime,is_checked from comment order by datetime desc )as A " +
        "left join " +
        "(select user_id,nickname from user)as B on A.user_id=B.user_id " +
        "left join " +
        "(select section_id,section_name from course_section)as C on A.section_id=C.section_id";
    
    // console.log('query_sql:',query_sql);
    
    query(query_sql,function (qerr,valls,fields) {
        if(qerr){
            ERROR.responseDataErr(res);
        }else{
            var response = {
                status:1,
                data:valls
            }
            res.json(response);
        }
    })

})

/**
 * 获取所有的用户排行数据
 * 参数：page  形式  ?page=1
 * */

router.get('/rank',function (req,res,next) {

    var page = req.query.page;
    if(!page){
        page = 1;
    }

    var query_sql = "select A.user_id,A.fraction,B.nickname,B.username from " +
        "(select user_id,fraction from user_value order by fraction desc limit "+(page-1)*10+",10)as A " +
        "left join " +
        "(select user_id,nickname,username from user)as B on A.user_id=B.user_id";

    // console.log('query_sql:',query_sql);
    
    query(query_sql,function (qerr,valls,fields) {
        if(qerr){
            ERROR.responseDataErr(res);
        }else{
            var response = {
                status:1,
                data:valls
            }
            res.json(response);
        }
    })
})

/**
 * 获取所有的课程
 * 参数  page   ?page=1
 * */
router.get('/course',function (req,res,next) {

    var page = req.query.page;

    if(!page){
        page = 1;
    }

    var query_sql = "select A.section_id,A.section_name,A.section_intro,A.label_des,A.open_date,B.teacher_name from " +
        "(select section_id,section_name,author_id,section_intro,label_des,open_date from course_section order by section_id desc limit "+(page-1)*10+",10)as A " +
        "left join " +
        "(select teacher_id,teacher_name from teacher)as B on A.author_id=B.teacher_id";

    // console.log('query_sql:',query_sql);

    query(query_sql,function (qerr,valls,fields) {
        if(qerr){
            ERROR.responseDataErr(res);
        }else{
            var response = {
                status:1,
                data:valls
            }
            res.json(response);
        }
    })
})

/**
 * 获取所有的问题
 * 参数  page   ？page=1
 * */
router.get('/questions',function (req,res,next) {

    var page = req.query.page;
    if(!page){
        page = 1;
    }

    var query_sql = "select A.question_id,A.question_desc,A.up_time,B.nickname,B.username,C.appreciate_count,D.answer_count from " +
        "(select question_id,question_desc,user_id,up_time from question)as A " +
        "left join " +
        "(select user_id,nickname,username from user)as B " +
        "on A.user_id=B.user_id " +
        "left join " +
        "(select count(1)appreciate_count,question_id from appreciate_question group by question_id)as C " +
        "on A.question_id=C.question_id " +
        "left join " +
        "(select count(1)answer_count,question_id from answer group by question_id)as D " +
        "on A.question_id=D.question_id " +
        "order by C.appreciate_count desc limit "+(page-1)*10+",10";

    // console.log('query_sql:',query_sql);

    query(query_sql,function (qerr,valls,fields) {
        if(qerr){
            ERROR.responseDataErr(res);
        }else{
            var response = {
                status:1,
                data:valls
            }
            res.json(response);
        }
    })
})
/**
 * 获取所有问题，简单信息
 * */
router.get('/all/questions',function (req,res) {

    var query_sql = "select question_id,question_desc,user_id,up_time from question order by up_time desc";

    query(query_sql,function (qerr,valls,fields) {
        if(qerr){
            ERROR.responseDataErr(res);
        }else{
            var response = {
                status:1,
                data:valls
            }
            res.json(response);
        }
    })
})
/**
 * 获取某个问题的所有的回答
 * 参数 question_id
 * */
router.get('/answers',function (req,res,next) {

    var question_id = req.query.question_id;

    var query_sql = "select answer_id,answer_desc,user_id,answer_time from answer where question_id='"+question_id+"' order by " +
        "answer_time desc";
    // console.log('query_sql:',query_sql);
    query(query_sql,function (qerr,valls,fields) {
        if(qerr){
            ERROR.responseDataErr(res);
        }else{
            var response = {
                status:1,
                data:valls
            }
            res.json(response);
        }
    })

})

/**
 * 获取所有已添加企业信息：
 * */

router.get('/companys',function (req,res) {

    var query_sql = "select company_id,company_name,company_log,company_intro,open_date from company";

    query(query_sql,function (qerr,valls,fields) {
        if(qerr){
            ERROR.responseDataErr(res);
        }else{
            var response = {
                status:1,
                data:valls
            }
            res.json(response);
        }
    })
})

/**
 * 获取某个已添加的企业的详细信息：
 * 参数：company_id
 * */
router.get('/company',function (req,res) {

    var company_id  = req.query.company_id;
    if(!company_id){
        ERROR.responseBodyError(res,'参数错误!');
        return;
    }

    var query_sql = "select company_id,company_name,company_intro,company_log,open_date from company where company_id="+company_id;

    query(query_sql,function (qerr,valls,fields) {
        if(qerr){
            ERROR.responseDataErr(res);
        }else{
            if(valls.length>0){
                var response = {
                    status:1,
                    data:valls[0]
                }
                res.json(response);
            }else{
                ERROR.responseBodyError(res,'ID错误');
            }

        }
    })
})

/**
 * 获取某个已添加企业的所有项目：
 * 参数：company_id
 * */
router.get('/projects',function (req,res) {

    var company_id = req.query.company_id;
    if(!company_id){
        ERROR.responseBodyError(res,'参数错误!');
        return;
    }

    var query_sql = "select project_id,project_name,project_intro,open_date,company_id from project where company_id="+company_id;

    query(query_sql,function(qerr,valls,fields){
        if(qerr){
            ERROR.responseDataErr(res);
        }else{
            var response = {
                status:1,
                data:valls
            }
            res.json(response);
        }
    })

})

/**
 * 获取某个项目已被添加的班级
 * */
router.get('/classes',function (req,res) {
    var project_id = req.query.project_id;
    if(!project_id){
        ERROR.responseBodyError(res,'参数错误!');
        return;
    }

    var query_sql = "select class_id,class_name,class_logo,class_intro,class_num,open_date,project_id,access_code from class " +
        "where project_id="+project_id;

    query(query_sql,function (qerr,valls,fields) {
        if(qerr){
            ERROR.responseDataErr(res);
        }else{
            var response = {
                status:1,
                data:valls
            }
            res.json(response);
        }
    })
})

/**
 * 获取所有的用户
 * */
router.get('/users',function (req,res) {

    var page = req.query.page;


})


module.exports = router;