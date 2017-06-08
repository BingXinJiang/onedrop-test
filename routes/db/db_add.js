var express = require('express');
var router = express.Router();
var query = require('../../db/DB');

/* GET home page. */

router.post('/', function(req, res, next) {
  	var title = req.body.title;
  	var content = req.body.content;
  	var author = req.body.author;

  	var in_sql = "insert into course(title,content,author)values('"+title+ "','"+content+"','"+author+"');";

  	query(in_sql, function(qerr, valls, fields){
  		res.send({status:200, data:'数据插入成功'});
  	})
});

module.exports = router;