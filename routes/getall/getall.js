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

    var query_sql = "select A.comment_id,B.nickname,A.section_id,A.comment,A.datetime,A.is_checked from " +
        "(select comment_id,user_id,section_id,comment,datetime,is_checked from comment order by datetime desc limit "+(page-1)*10+",10)as A " +
        "left join " +
        "(select user_id,nickname from user)as B on A.user_id=B.user_id";
    
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
 * 获取所有的回答
 * 参数 page   ?page=1
 * */
router.get('/answer',function (req,res,next) {

    // var page = 

})


module.exports = router;