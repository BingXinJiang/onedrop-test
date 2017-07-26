/**
 * Created by jiangsong on 2017/7/24.
 */
import React from 'react';
import { Table } from 'antd';

const columns = [
    {
        title: 'label_id',
        dataIndex: 'label_id',
        key: 'label_id'
    },
    {
        title: 'label_name',
        dataIndex: 'label_name',
        key: 'label_name',
    }
];

const data = [{
    key: '1',
    label_id: '1',
    label_name: '工作效力'
},{
    key: '2',
    label_id: '2',
    label_name: '员工激励'
},{
    key: '3',
    label_id: '3',
    label_name: '公司文化'
},{
    key: '4',
    label_id: '4',
    label_name: '领导力原理'
},{
    key: '5',
    label_id: '5',
    label_name: '盖子法则'
},{
    key: '6',
    label_id: '6',
    label_name: '激活个体'
},{
    key: '7',
    label_id: '7',
    label_name: '评价反馈'
},{
    key: '8',
    label_id: '8',
    label_name: '管理工具'
}];

export default class Course extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div>
                <Table columns={columns} dataSource={data} />
            </div>
        )
    }
}