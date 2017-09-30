/**
 * Created by jiangsong on 2017/8/8.
 */
var express = require('express');
var router = express.Router();
var query = require('../../db/DB');
var async = require('async');
var CONST = require('../ConstConfig');
var ERROR = require('../Error');

router.post('/add_course_section',function (req,res,next) {

    var course_id = req.body.course_id;
    var course_title = req.body.course_title;
    var section_id = req.body.section_id;
    var section_name = req.body.section_name;

    //section_voice 需根据section_id和course_id生成路径
    var section_voice = CONST.ResBaseUrl + '/sections/'+req.body.section_voice;

    var section_des = req.body.section_des;
    var course_author = req.body.course_author;
    var open_date = req.body.open_date;
    var author_id = req.body.author_id;
    //section_list_img 根据section_id和course_id生成路径
    var section_list_img = '/images/courses/'+req.body.section_list_img;
    //section_detail_img 根据section_id和course_id生成路径
    var section_detail_img = '/images/courses/intro/'+req.body.section_detail_img;
    var section_intro = req.body.section_intro;
    var label_des = req.body.label_des;

    var Course = {
        course_id:course_id,
        course_title:course_title,
        section_id:section_id,
        section_name:section_name,
        section_voice:section_voice,
        section_des:section_des,
        course_author:course_author,
        open_date:open_date,
        author_id:author_id,
        section_list_img:section_list_img,
        section_detail_img:section_detail_img,
        section_intro:section_intro,
        label_des:label_des
    }

    console.log('Course:',Course);

    //首先根据section_id查询数据库中最大的section_id
    //如果是正确插入，如果不是，提示按照正确的课程顺序插入

    var check_section_id_sql = "SELECT MAX(section_id)max_section_id FROM course_section";

    var insert_sql = "insert into course_section(course_id,course_title,section_id,section_name,section_voice,section_des," +
        "course_author,open_date,author_id,section_list_img,section_detail_img,section_intro,label_des) values(" +
        +course_id+",'"+course_title+"',"+section_id+",'"+section_name+"','"+section_voice+"','"+section_des+"'," +
        "'"+course_author+"','"+open_date+"',"+author_id+",'"+section_list_img+"','"+section_detail_img+"'," +
        "'"+section_intro+"','"+label_des+"')";

    console.log('insert_sql:',insert_sql);

    async.waterfall([
        function (callback) {
            query(check_section_id_sql,function (qerr,valls,fields) {
                if(qerr){
                    callback(qerr);
                }else{
                    if(valls.length<=0){
                        callback(null,1);
                    }else{
                        var newSectionId = valls[0].max_section_id;
                        callback(null,newSectionId);
                    }
                }
            })
        },
        function (result,callback) {
            if(section_id > result){
                //课程标号正确，插入课程
                query(insert_sql,function (qerr,valls,fields) {
                    if(qerr){
                        callback(qerr);
                    }else{
                        callback(null,'课程数据插入成功！');
                    }
                })
            }else{
                callback('请按照正确课程唯一标号setion_id！');
            }
        }
    ],function (err,result) {
        if(err){
            ERROR.responseBodyError(res,err);
        }else{
            var response = {
                status:1,
                data:{
                    msg:result
                }
            }
            res.json(response);
        }
    })

})

module.exports = router;