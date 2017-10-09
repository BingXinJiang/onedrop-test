/**
 * Created by jiangsong on 2017/7/26.
 */
import React from 'react';
import { Table } from 'antd';
import BACK from '../../const/BackControll';

const columns = [
    {
        title: '老师ID',
        dataIndex: 'teacher_id',
        key: 'teacher_id'
    },
    {
        title: '老师名字',
        dataIndex: 'teacher_name',
        key: 'teacher_name',
    },
    {
        title: '老师职位',
        dataIndex: 'teacher_position',
        key: 'teacher_position',
    },
    {
        title: '老师介绍',
        dataIndex: 'teacher_des',
        key: 'teacher_des',
    },
    {
        title: '老师头像',
        dataIndex: 'teacher_head',
        key: 'teacher_head',
        render: imgUrl => <img style={{width:'60px',height:'60px'}} src={BACK.res_ip+imgUrl}/>
    },
    {
        title: '老师照片',
        dataIndex: 'teacher_image',
        key: 'teacher_img',
        render: imgUrl => <img style={{width:'60px',height:'60px'}} src={BACK.res_ip+imgUrl}/>
    }
];

export default class Teacher extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            teachers:[]
        }
    }
    componentDidMount(){
        fetch(BACK.base_ip+'/get/teachers',{
            method:'GET',
            credentials : 'include',
            headers:{
                'Content-Type':'application/json',
                'Accept':'application/json'
            }
        }).then((res)=>res.json()).then((resText)=>{
            if(resText.status === 1){
                var teachers = [];
                resText.data.map((te,idx)=>{
                    te.key = (idx+1) + '';
                    teachers.push(te);
                })
                this.setState({
                    teachers:teachers
                })
            }else{
                alert(JSON.stringify(resText.data));
            }
        })
    }
    render(){
        return(
            <div>
                <Table columns={columns} dataSource={this.state.teachers} />
            </div>
        )
    }
}