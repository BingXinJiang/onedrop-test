/**
 * Created by jiangsong on 2017/7/28.
 */
import React from 'react';
import Tool from '../../Tool/Tool';
import {Table} from 'antd';
import {Link} from 'react-router-dom';
import BACK from '../../const/BackControll';

const columns = [
    {
        title:'用户ID',
        dataIndex:'user_id'
    },
    {
        title:'用户昵称',
        dataIndex:'nickname'
    },
    {
        title:'加入时间',
        dataIndex:'be_date'
    },
    {
        title:'用户姓名',
        dataIndex:'username'
    },
    {
        title:'查看详情',
        dataIndex:'check_detail',
        render:(text,user) => {
            var userId = user.user_id;
            return (
                <a>查看</a>
            )
        }
    }
]

class UserTable extends React.Component{
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

export default class UserFraction extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            users:[]
        }
    }
    componentDidMount(){
        Tool.get('/get/users?page=1',(data)=>{
            let newUsers = [];
            data.map((con,idx)=>{
                con.key = idx+1;
                newUsers.push(con);
            })
            this.setState({
                users:newUsers
            })
        },(data)=>{
            alert(JSON.stringify(data));
        })
    }
    render(){
        return(
            <div>
                <UserTable tableData={this.state.users}/>
            </div>
        )
    }
}