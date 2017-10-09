/**
 * Created by jiangsong on 2017/5/23.
 */

var fs = require('fs');

Date.prototype.pattern=function(fmt) {
    var o = {
        "M+" : this.getMonth()+1, //月份
        "d+" : this.getDate(), //日
        "h+" : this.getHours()%12 == 0 ? 12 : this.getHours()%12, //小时
        "H+" : this.getHours(), //小时
        "m+" : this.getMinutes(), //分
        "s+" : this.getSeconds(), //秒
        "q+" : Math.floor((this.getMonth()+3)/3), //季度
        "S" : this.getMilliseconds() //毫秒
    };
    var week = {
        "0" : "/u65e5",
        "1" : "/u4e00",
        "2" : "/u4e8c",
        "3" : "/u4e09",
        "4" : "/u56db",
        "5" : "/u4e94",
        "6" : "/u516d"
    };
    if(/(y+)/.test(fmt)){
        fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
    }
    if(/(E+)/.test(fmt)){
        fmt=fmt.replace(RegExp.$1, ((RegExp.$1.length>1) ? (RegExp.$1.length>2 ? "/u661f/u671f" : "/u5468") : "")+week[this.getDay()+""]);
    }
    for(var k in o){
        if(new RegExp("("+ k +")").test(fmt)){
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
        }
    }
    return fmt;
}

module.exports = {

    dateFormat:function (date) {
        var dateFmt = new Date(date).pattern('yyyy-MM-dd HH:mm:ss');
        return dateFmt;
    },
    //获取某个日期，多少天以后的日期
    getDateFromSomeDate:function (date,days) {
        var intValue = 0;
        var endDate = null;

        intValue = date.getTime();

        intValue += days*24*3600*1000;

        endDate = new Date(intValue);

        return endDate;
    },
    //获取两个日期之间的天数差
    getDaysBetweenTwoDate:function (date1,date2) {

        var intValue1 = date1.getTime();
        var intValue2 = date2.getTime();

        var diff = Math.abs(intValue2 - intValue1);

        var days = Math.floor(diff / 1000 / 3600 / 24);

        return days;
    },
    //获取某天时间的年月日
    getYearMothDayFromNow:function (num) {
        var riqi = '';
        var now = new Date();
        var yesterday =new Date(now.getTime()+num*24*60*60*1000);

        var year = yesterday.getFullYear();
        var month = yesterday.getMonth()+1;
        var day = yesterday.getDate();

        riqi = year + '-' + month + '-' + day;

        return riqi;
    },
    //判断某个变量是否是数组
    isMyArray:function (arr) {
        return Object.prototype.toString.call(arr) === '[object Array]';
    },
    //生成七位班级密码
    genPwdClass:function () {
        var arr = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
        var result = '';
        for(var i=0;i<7;i++){
            var idx = parseInt(Math.random()*26);
            result += arr[idx];
        }
        return result;
    },

    //从txt中读取admin用户数据
    getAdminUsers:function (path,cb) {
        fs.readFile(path, 'utf8', function(err, data){
            if(err){
                cb(err);
            }else{
                var users = data.split('\n');
                var result = [];
                users.map(function (user,index) {
                    var tmpA = user.split(' ');
                    var u = {};
                    u.name = tmpA[0];
                    u.password = tmpA[1];
                    result.push(u);
                })
                cb(null,result);
            }
        });
    }
}
