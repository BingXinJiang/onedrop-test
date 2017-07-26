/**
 * Created by jiangsong on 2017/7/26.
 */
import React from 'react';
import { Table } from 'antd';

const columns = [
    {
        title: 'teacher_id',
        dataIndex: 'teacher_id',
        key: 'teacher_id'
    },
    {
        title: 'teacher_name',
        dataIndex: 'teacher_name',
        key: 'teacher_name',
    },
    {
        title: 'teacher_position',
        dataIndex: 'teacher_position',
        key: 'teacher_position',
    },
    {
        title: 'teacher_des',
        dataIndex: 'teacher_des',
        key: 'teacher_des',
    },
    {
        title: 'teacher_head',
        dataIndex: 'teacher_head',
        key: 'teacher_head',
        render: imgUrl => <img style={{width:'60px',height:'60px'}} src={imgUrl}/>
    },
    {
        title: 'teacher_img',
        dataIndex: 'teacher_img',
        key: 'teacher_img',
        render: imgUrl => <img style={{width:'60px',height:'60px'}} src={imgUrl}/>
    }
];

const data = [{
    key: '1',
    teacher_id: '1',
    teacher_name: '马成功',
    teacher_position: '乐视文化培训经理',
    teacher_des:'乐视文化培训经理',
    teacher_head:'http://imglf0.nosdn.127.net/img/NFk3V1AwUXAxRTlOTFNHWEkrWHdmUmxkM3VJV2UxcXNKY1hOeWI3TmJiaDMxSFVOb1VzQ09RPT0.jpg?imageView&thumbnail=500x0&quality=96&stripmeta=0&type=jpg',
    teacher_img:'http://imglf1.nosdn.127.net/img/R0NsVFp1Y3d6K0ErOEZzMVk4a2h1emVxOExkbncvMFVLdHo4N3FrLzlvU3BOM0h5aCtEWld3PT0.jpg?imageView&thumbnail=500x0&quality=96&stripmeta=0&type=jpg'
}];

export default class Teacher extends React.Component{
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