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
 * 获取所有老师的信息
 * */

router.get('/',function (req,res,next) {

    var query_sql = "select teacher_id,teacher_name from teacher";

    query(query_sql,function (qerr,valls,fields) {
        if(qerr){
            ERROR.responseBodyError(res,'获取老师信息失败！');
        }else{
            var response = {
                status:1,
                data:valls
            }
            res.json(response);
        }
    })
})

module.exports = router;