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
 * 获取所有的用户排行数据
 * 参数：page
 * */

router.get('/rank',function (req,res,next) {

    // var query_sql = "select "

})

module.exports = router;