/**
 * Created by jiangsong on 2017/7/25.
 */

var express = require('express');
var router = express.Router();
var query = require('../../db/DB');
var util = require('util');

var formidable = require('formidable');

router.post('/file', function(req, res, next) {

    //创建表单上传
    var form = new formidable.IncomingForm();
    //设置编辑
    form.encoding = 'utf-8';
    //设置文件存储路径
    form.uploadDir = "./uploads/";
    //保留后缀
    form.keepExtensions = true;
    
    form.on('fileBegin',function (err,file) {
        file.path = 'uploads/';
    })

    form.parse(req, function(err, fields, files) {
        res.writeHead(200, {'content-type': 'text/plain'});
        res.write('received upload:\n\n');
        res.end(util.inspect({fields: fields, files: files}));
    });


});



module.exports = router;