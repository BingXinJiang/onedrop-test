/**
 * Created by jiangsong on 2017/9/13.
 */
var express = require('express');
var router = express.Router();
var query = require('../../db/DB');
var async = require('async');
var CONST = require('../ConstConfig');
var ERROR = require('../Error');
var Tool = require('../Tool');

router.post('/edit',function (req,res) {

    var comment_id = req.body.comment_id;
    var is_checked = req.body.is_checked;
    if(!comment_id){
        ERROR.responseBodyError(res,'数据请求错误！');
    }
    if(!is_checked){
        is_checked = 0;
    }else{
        is_checked = 1;
    }

    var update_sql = "update comment set is_checked="+is_checked +" where comment_id="+comment_id;

    query(update_sql,function (qerr,valls,fields) {
        if(qerr){
            ERROR.responseBodyError(res,qerr);
        }else{
            var response = {
                status:1,
                data:{
                    msg:'评论审核信息修改成功！'
                }
            }
            res.json(response);
        }
    })

})

module.exports = router;