var express = require('express');
var router = express.Router();
var Tool = require('./Tool');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.redirect('/main');
});
router.get('/main/*', function(req, res, next) {
    res.redirect('/main');
});

router.all('/*',function (req,res,next) {
    //判断cookies，如果cookie没有过期next(),如果已经过期则返回登录的页面

    var cookie = req.cookies.admin;
    console.log('cookie:',cookie);

    if(cookie){
        // res.redirect('/main');
        next();
    }else {
        if(req.url === '/login'){
            var name = req.body.name;
            var pwd = req.body.password;
            Tool.getAdminUsers('./routes/admin_user.txt',function (err,data) {
                if(err){
                    console.log('err:',err);
                    throw new Error('文件读取错误！');
                }else {
                    //匹配用户
                    var isExit = false;
                    var len = data.length;
                    while (len--){
                        var user = data[len];
                        if(name === user.name && pwd === user.password){
                            isExit = true;
                            break;
                        }
                    }
                    if(isExit){
                        //设置cookie，并跳转到页面
                        var cookie = Date.parse((new Date())) + 'yunguhui' + name;
                        res.cookie('admin', cookie, { expires: new Date(Date.now() + 7200*1000), httpOnly: true });
                        var response = {
                            status:1,
                            data:{
                                msg:'success'
                            }
                        }
                        res.json(response);
                    }else {
                        var response = {
                            status:0,
                            data:{
                                msg:'用户名或密码错误！'
                            }
                        }
                        res.json(response);
                    }
                }

            })
        }else{
            res.render('login');
        }
    }

})

module.exports = router;
