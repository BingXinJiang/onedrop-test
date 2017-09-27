/**
 * Created by jiangsong on 2017/9/25.
 */
import {COMPANY_ADD_TYPE,COMPANY_GET_ALL,
    COMPANY_ADD_SHOW,
    COMPANY_ADD_DETAIL_PRE,
    COMPANY_ADD_DETAIL_DONE
} from '../../actionTypes';
import BACK from '../../../../const/BackControll';

export const addCompany = ()=>{
    return {
        type:COMPANY_ADD_TYPE
    }
}

const allCompany = (companys)=>{
    return{
        type:COMPANY_GET_ALL,
        companys:companys
    }
}

export const fetchAllCompany = ()=>{
    return (dispatch)=>{
        return fetch(BACK.base_ip+'/get/companys',{
            method:'GET',
            headers:{
                'Content-Type':'application/json',
                'Accept':'application/json'
            }
        }).then((res)=>res.json()).then((res)=>{
            // console.log('companys:',res.data);
            dispatch(allCompany(res.data));
        })
    }
}

export const showAdd = (isShow)=>{
    return {
        type:COMPANY_ADD_SHOW,
        isShowAdd:isShow
    }
}

const addPre = ()=>{
    return {
        type:COMPANY_ADD_DETAIL_PRE
    }
}

const addDone = (companys)=>{
    return{
        type:COMPANY_ADD_DETAIL_DONE,
        companys:companys
    }
}

export const fetchAddCompany = (company)=>{
    return (dispatch)=>{
        dispatch(addPre());
        return fetch(BACK.base_ip+'/add/company',{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                'Accept':'application/json'
            },
            body:JSON.stringify(company)
        }).then((res)=>res.json()).then((res)=>{
            if(res.status === 1){
                //数据插入成功！
                fetch(BACK.base_ip+'/get/companys',{
                    method:'GET',
                    headers:{
                        'Content-Type':'application/json',
                        'Accept':'application/json'
                    }
                }).then((res)=>res.json()).then((res)=>{
                    if(res.status === 1){
                        dispatch(addDone(res.data));
                    }else{
                        alert('网络访问错误！');
                    }
                })
            }else{
                alert('网络访问错误！');
            }
        })
    }
}