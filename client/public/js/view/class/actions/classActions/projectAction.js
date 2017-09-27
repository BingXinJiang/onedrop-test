/**
 * Created by jiangsong on 2017/9/25.
 */
import {PROJECT_ADD_TYPE,
    PROJECT_COMPANY_DETAIL,
    PROJECT_COMPANY_ALL,
    PROJECT_ADD_SHOW,
    PROJECT_ADD_DETAIL_PRE,
    PROJECT_ADD_DETAIL_DONE
} from '../../actionTypes';
import BACK from '../../../../const/BackControll';

export const addProject = ()=>{
    return {
        type:PROJECT_ADD_TYPE
    }
}

const company = (company)=>{
    return{
        type:PROJECT_COMPANY_DETAIL,
        company:company
    }
}

export const fetchCompany = (companyID)=>{
    return (dispatch)=>{
        var url = BACK.base_ip + '/get/company?company_id='+companyID;
        return fetch(url,{
            method:'GET',
            headers:{
                'Content-Type':'application/json',
                'Accept':'application/json'
            }
        }).then((res)=>res.json()).then((res)=>{
            if(res.status === 1){
                dispatch(company(res.data))
            }else {
                alert(JSON.stringify(res.data));
            }
        })
    }
}

const projects = (projects)=>{
    return{
        type:PROJECT_COMPANY_ALL,
        projects:projects
    }
}

export const fetchProjects = (companyID)=>{
    return (dispatch)=>{
        var url = BACK.base_ip + '/get/projects?company_id=' + companyID;
        return fetch(url,{
            method:'GET',
            headers:{
                'Content-Type':'application/json',
                'Accept':'application/json'
            }
        }).then((res)=>res.json()).then((res)=>{
            if(res.status === 1){
                dispatch(projects(res.data));
            }else{
                alert(JSON.stringify(res.data));
            }
        })
    }
}

export const addShow = (isShowAdd)=>{
    return{
        type:PROJECT_ADD_SHOW,
        isShowAdd:isShowAdd
    }
}

const addPre = ()=>{
    return{
        type:PROJECT_ADD_DETAIL_PRE
    }
}

const addDone = (projects)=>{
    return{
        type:PROJECT_ADD_DETAIL_DONE,
        projects:projects
    }
}

export const fetchAddProject = (project)=>{
    return (dispatch)=>{
        var url = BACK.base_ip + '/add/project';
        return fetch(url,{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                'Accept':'application/json'
            },
            body:JSON.stringify(project)
        }).then((res)=>res.json()).then((res)=>{
            if(res.status === 1){
                var url = BACK.base_ip + '/get/projects?company_id=' + project.company_id;
                fetch(url,{
                    method:'GET',
                    headers:{
                        'Content-Type':'application/json',
                        'Accept':'application/json'
                    }
                }).then((res)=>res.json()).then((res)=>{
                    if(res.status === 1){
                        dispatch(addDone(res.data));
                    }else{
                        alert(JSON.stringify(res.data));
                    }
                })
            }else{
                alert(JSON.stringify(res.data));
            }
        })
    }
}