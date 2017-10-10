/**
 * Created by jiangsong on 2017/7/26.
 */
import React from 'react';
import { Table } from 'antd';
import BACK from '../../const/BackControll';
import JSAlert from '../main/view/JSAlert';
import Tool from '../../Tool/Tool';

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
    },
    {
        title:'删除课程',
        dataIndex:'delete',
        width:'7%',
        render:(text,teacher)=>{
            let teacherId = teacher.teacher_id;
            return (
                <JSAlert title='删除' pointTitle='确认删除该老师吗？' confirm={()=>{
                    Tool.post('/del/teacher',{teacher_id:teacherId},(data)=>{
                        alert('老师删除成功！');
                    },()=>{
                        alert('老师删除失败！');
                    })
                }} cancel={()=>{

                }}/>
            )
        }
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
        Tool.get('/get/teachers',(data)=>{
            var teachers = [];
            data.map((te,idx)=>{
                te.key = (idx+1) + '';
                teachers.push(te);
            })
            this.setState({
                teachers:teachers
            })
        },(data)=>{
            alert(JSON.stringify(data));
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