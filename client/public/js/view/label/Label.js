/**
 * Created by jiangsong on 2017/7/24.
 */
import React from 'react';
import { Table } from 'antd';
import Tool from '../../Tool/Tool';
import JSAlert from '../main/view/JSAlert';

const columns = [
    {
        title: '标签ID',
        dataIndex: 'label_id',
        key: 'label_id'
    },
    {
        title: '标签名字',
        dataIndex: 'label_name',
        key: 'label_name',
    },
    {
        title:'删除课程',
        dataIndex:'delete',
        width:'7%',
        render:(text,label)=>{
            let labelId = label.label_id;
            return (
                <JSAlert title='删除' pointTitle='确认删除该标签吗？' confirm={()=>{
                    Tool.post('/del/label',{label_id:labelId},()=>{
                        alert('标签删除成功！');
                    },()=>{
                        alert('标签删除失败！');
                    })
                }} cancel={()=>{

                }}/>
            )
        }
    }
];


export default class Course extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            labels:[]
        }
    }
    componentDidMount(){
        Tool.get('/get/labels',(data)=>{
            let labels = data;
            let newLabels = [];
            labels.map((label,idx)=>{
                var newLabel = {
                    key:label.label_id+'',
                    label_id:label.label_id+'',
                    label_name:label.label_name
                };
                newLabels.push(newLabel);
            });
            this.setState({
                labels:newLabels
            })
        },(data)=>{
            alert(JSON.stringify(data));
        })
    }
    render(){
        return(
            <div>
                <Table columns={columns} dataSource={this.state.labels} />
            </div>
        )
    }
}