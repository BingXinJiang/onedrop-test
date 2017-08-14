/**
 * Created by jiangsong on 2017/8/8.
 */

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
    }
}

module.exports = Tool;