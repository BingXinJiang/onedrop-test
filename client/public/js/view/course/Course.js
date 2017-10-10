/**
 * Created by jiangsong on 2017/7/24.
 */

import React from 'react';
import Tool from '../../Tool/Tool';
import {Table} from 'antd';
import JSAlert from '../main/view/JSAlert';

const columns = [
    {
        title:'课程ID',
        dataIndex:'section_id',
        width:'5%'
    },
    {
        title:'课程名称',
        dataIndex:'section_name'
    },
    {
        title:'老师',
        dataIndex:'teacher_name',
        width:'5%'
    },
    {
        title:'课程介绍',
        dataIndex:'section_intro'
    },
    {
        title:'课程标签',
        dataIndex:'label_des',
        width:'17%'
    },
    {
        title:'开放时间',
        dataIndex:'open_date',
        width:'15%'
    },
    {
        title:'删除课程',
        dataIndex:'delete',
        width:'7%',
        render:(text,course)=>{
            let sectionId = course.section_id;
            return (
                <JSAlert title='删除' pointTitle='确认删除该课程吗？' confirm={()=>{
                    Tool.post('/del/course',{section_id:sectionId},(data)=>{
                        alert('课程删除成功！');
                    },()=>{
                        alert('课程删除失败！');
                    })
                }} cancel={()=>{

                }}/>
            )
        }
    }
]

class CourseTable extends React.Component{
    constructor(props){
        super(props);
    }
    static propTypes = {
        tableData:React.PropTypes.array
    }
    render(){
        return(
            <div>
                <Table columns={columns} dataSource={this.props.tableData}/>
            </div>
        )
    }
}

export default class Course extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            courses:[]
        }
    }
    componentDidMount(){
        Tool.get('/get/courses?page=1',(data)=>{
            let newCourses = [];
            data.map((con,idx)=>{
                con.key = idx+1;
                newCourses.push(con);
            })
            this.setState({
                courses:newCourses
            })
        },(data)=>{
            alert(JSON.stringify(data));
        })
    }
    render(){
        return(
            <div>
                <CourseTable tableData={this.state.courses}/>
            </div>
        )
    }
}