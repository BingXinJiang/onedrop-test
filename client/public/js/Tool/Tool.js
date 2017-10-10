/**
 * Created by jiangsong on 2017/8/8.
 */

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

import BACK from '../const/BackControll';

var Tool = {
    //将对象转化为字符串
    convertToString:(obj)=>{
        var resultObjStr = '';
        for(var key in obj){
            if(obj.hasOwnProperty(key)){
                resultObjStr += key;
                resultObjStr += '=';
                resultObjStr += obj[key];
                resultObjStr += '&';
            }
        }
        resultObjStr = resultObjStr.substring(0,resultObjStr.length-1);

        return resultObjStr;
    },
    dateFormat:function (date) {
        var dateFmt = new Date(date).pattern('yyyy-MM-dd HH:mm:ss');
        return dateFmt;
    },
    dateFormatYMD:function (date) {
        var dateFmt = new Date(date).pattern('yyyy-MM-dd');
        return dateFmt;
    },
    //发送GET请求
    get:(url,success,fail)=>{
        fetch(BACK.base_ip+url,{
            method:'GET',
            credentials : 'include',
            headers:{
                'Content-Type':'application/json',
                'Accept':'application/json'
            }
        }).then((res)=>res.json()).then((resText)=>{
            if(resText.status === 1){
                success(resText.data);
            }else{
                fail(resText.data);
            }
        }).catch((err)=>{
            alert(JSON.stringify(err));
        })
    },
    //发送post请求
    post:(url,body,success,fail)=>{
        fetch(BACK.base_ip+url,{
            method:'POST',
            credentials : 'include',
            headers:{
                'Content-Type':'application/json',
                'Accept':'application/json'
            },
            body:JSON.stringify(body)
        }).then((res)=>res.json()).then((resText)=>{
            if(resText.status === 1){
                success(resText.data);
            }else{
                fail(resText.data);
            }
        }).catch((err)=>{
            alert(JSON.stringify(err));
        })
    }
}

module.exports = Tool;