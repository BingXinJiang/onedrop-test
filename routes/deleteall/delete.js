/**
 * Created by jiangsong on 2017/10/10.
 */
var express = require('express');
var router = express.Router();
var query = require('../../db/DB');
var async = require('async');
var CONST = require('../ConstConfig');
var ERROR = require('../Error');
var Tool = require('../Tool');

/**
 * 根据section_id删除课程
 * */
router.post('/course',function (req,res) {
    var section_id = req.body.section_id;
    var del_sql = "delete from course_section where section_id="+section_id;

    query(del_sql,function (qerr,valls,fields) {
        if(qerr){
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
 * 根据teacher_id删除老师
 * */
router.post('/teacher',function (req,res) {
    var teacher_id = req.body.teacher_id;
    var del_sql = "delete from teacher where teacher_id="+teacher_id;

    query(del_sql,function (qerr,valls,fields) {
        if(qerr){
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
 * 根据label_id删除label，删除lable的同时，删除该label与课程的对应关系
 * */
router.post('/label',function (req,res) {
    var label_id = req.body.label_id;

    var del1_sql = "delete from label where label_id="+label_id;
    var del2_sql = "delete from course_label where label_id="+label_id;

    async.series([
        function (cb) {
            query(del1_sql,function (qerr,valls,fields) {
                if(qerr){
                    cb(qerr);
                }else{
                    cb(null);
                }
            })
        },
        function (cb) {
            query(del2_sql,function (qerr,valls,fields) {
                if(qerr){
                    cb(qerr);
                }else{
                    cb(null);
                }
            })
        }
    ],function (err,val) {
        if(err){
            ERROR.responseDataErr(res);
        }else {
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

module.exports = router;