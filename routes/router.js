/**
 * Created by jiangsong on 2017/9/13.
 */

var index = require('./index');
var weixin = require('./weixin/index');
var upload = require('./upload/upload');
var downUser = require('./download/user');
var addCourse = require('./course/AddCourseSection');
var add = require('./course/Add');
var get = require('./getall/getall');
var comment = require('./comment/comment');

module.exports = function (app) {
    app.use('/', index);
    app.use('/main', weixin);
    app.use('/upload',upload);
    app.use('/userdown',downUser);
    app.use('/addcourse',addCourse);
    app.use('/add',add);
    app.use('/get',get);
    app.use('/comment',comment);
}