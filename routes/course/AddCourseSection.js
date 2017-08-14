/**
 * Created by jiangsong on 2017/8/8.
 */
var express = require('express');
var router = express.Router();
var query = require('../../db/DB');
var async = require('async');

router.post('/add_course_section',function (req,res,next) {

    var course_id = req.body.course_id;
    var course_title = req.body.course_title;
    var section_id = req.body.section_id;
    var section_name = req.body.section_name;

    //section_voice 需根据section_id和course_id生成路径
    var section_voice = '/sections/section_'+course_id+'_1_'+section_id+'.mp3';

    var section_des = req.body.section_des;
    var course_author = req.body.course_author;
    var open_date = req.body.open_date;
    var author_id = req.body.author_id;
    //section_list_img 根据section_id和course_id生成路径
    var section_list_img = '/images/courses/section_'+course_id+'_1_'+section_id+'.jpg';
    //section_detail_img 根据section_id和course_id生成路径
    var section_detail_img = '/images/courses/intro/section_'+course_id+'_1_'+section_id+'.jpg';
    var section_intro = req.body.setion_intro;
    var label_des = req.body.label_des;

    //首先根据section_id查询数据库中最大的section_id,判断该section_id是否是最大的section_id+1
    //如果是正确插入，如果不是，提示按照正确的课程顺序插入

    var check_section_id_sql = "SELECT MAX(section_id)max_section_id FROM course_section";

    var insert_sql = "";

    async.waterfall([
        function (callback) {
            query(check_section_id_sql,function (qerr,valls,fields) {
                if(qerr){
                    callback(qerr);
                }else{
                    if(valls.length<=0){
                        callback(null,1);
                    }else{
                        var newSectionId = valls[0].section_id+1;
                        callback(null,newSectionId);
                    }
                }
            })
        },
        function (result,callback) {
            if(section_id === result){
                //课程标号正确，插入课程
                console.log('---------------------');
            }else{
                callback('请按照正确的顺序输入课程唯一标号setion_id！');
            }
        }
    ],function (err,result) {
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