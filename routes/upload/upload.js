/**
 * Created by jiangsong on 2017/7/25.
 */

var express = require('express');
var router = express.Router();
var query = require('../../db/DB');
var util = require('util');

var formidable = require('formidable');

function uploadFiles(req,res,path) {
    //创建表单上传
    var form = new formidable.IncomingForm();
    //设置编辑
    form.encoding = 'utf-8';
    //设置文件存储路径
    form.uploadDir = path;
    //保留后缀
    form.keepExtensions = true;

    form.on('fileBegin',function (err,file) {
        // console.log('err:',err);
        file.path = path.split('./')[1] + file.name;
    })

    form.parse(req, function(err, fields, files) {
        res.writeHead(200, {'content-type': 'text/plain'});
        res.write('received upload:\n\n');
        res.end(util.inspect({fields: fields, files: files}));
    });
}

router.post('/file', function(req, res, next) {

    uploadFiles(req,res,'./client/public/weixin/voices/sections/');

});

router.post('/img/list', function(req, res, next) {

    uploadFiles(req,res,'./client/public/weixin/images/courses/');

});

router.post('/img/detail', function(req, res, next) {

    uploadFiles(req,res,'./client/public/weixin/images/courses/intro/');

});

router.post('/teacher/head', function(req, res, next) {

    uploadFiles(req,res,'./client/public/weixin/images/teacher/head/');

});

router.post('/teacher/photo', function(req, res, next) {

    uploadFiles(req,res,'./client/public/weixin/images/teacher/photo/');

});

module.exports = router;