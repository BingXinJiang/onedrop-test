/**
 * Created by jiangsong on 2017/9/25.
 */
import {CLASS_ADD_TYPE,
    CLASS_GET_ALL_PRE,
    CLASS_GET_ALL_DONE,
    CLASS_ADD_SHOW,
    CLASS_ADD_DETAIL_PRE,
    CLASS_ADD_DETAIL_DONE
} from '../../actionTypes';
import BACK from '../../../../const/BackControll';

export const addClass = ()=>{
    return {
        type:CLASS_ADD_TYPE
    }
}

const allPre = ()=>{
    return{
        type:CLASS_GET_ALL_PRE
    }
}

const allDone = (pclasses)=>{
    return{
        type:CLASS_GET_ALL_DONE,
        pclasses:pclasses
    }
}

export const fetchAllClasses = (projectID)=>{
    return (dispatch)=>{
        dispatch(allPre())
        var url = BACK.base_ip + '/get/classes?project_id='+projectID;
        return fetch(url,{
            method:'GET',
            credentials : 'include',
            headers:{
                'Content-Type':'application/json',
                'accept':'application/json'
            }
        }).then((res)=>res.json()).then((res)=>{
            if(res.status === 1){
                dispatch(allDone(res.data));
            }else{
                alert(JSON.stringify(res.data));
            }
        })
    }
}

export const addShow = (isShowAdd)=>{
    return{
        type:CLASS_ADD_SHOW,
        isShowAdd:isShowAdd
    }
}

const addPre = ()=>{
    return{
        type:CLASS_ADD_DETAIL_PRE
    }
}

const addDone = (pclasses)=>{
    return{
        type:CLASS_ADD_DETAIL_DONE,
        pclasses:pclasses
    }
}

export const fetchAddClass = (pclass)=>{
    return (dispatch)=>{
        dispatch(addPre());
        var url = BACK.base_ip + '/add/class';
        return fetch(url,{
            method:'POST',
            credentials : 'include',
            headers:{
                'Content-Type':'application/json',
                'accept':'application/json'
            },
            body:JSON.stringify(pclass)
        }).then((res)=>res.json()).then((res)=>{
            if(res.status === 1){
                var projectID = pclass.project_id;
                var url2 = BACK.base_ip + '/get/classes?project_id='+projectID;
                fetch(url2,{
                    method:'GET',
                    credentials : 'include',
                    headers:{
                        'Content-Type':'application/json',
                        'accept':'application/json'
                    }
                }).then((res)=>res.json()).then((res)=>{
                    if(res.status === 1){
                        dispatch(addDone(res.data));
                    }else{
                        alert(JSON.stringify(res.data));
                    }
                })
            }else {
                alert(JSON.stringify(res.data));
            }
        })
    }
}