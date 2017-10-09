/**
 * Created by jiangsong on 2017/7/24.
 */
import React from 'react';
import { Table } from 'antd';
import BACK from '../../const/BackControll';

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
        fetch(BACK.base_ip+'/get/labels',{
            method:'GET',
            credentials : 'include',
            headers:{
                'Content-Type':'application/json',
                'Accept':'application/json'
            }
        }).then((re)=>re.json()).then((resText)=>{
            if(resText.status === 1){
                var labels = resText.data;
                var newLabels = [];
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
            }else{
                alert(JSON.stringify(resText.data));
            }
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