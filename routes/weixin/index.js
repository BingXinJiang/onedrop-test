/**
 * Created by Administrator on 2017/3/28 0028.
 */
var express = require('express');
var router = express.Router();

/* GET weixin page. */
router.get('/main', function(req, res, next) {
    res.render('weixin');
});

module.exports = router;