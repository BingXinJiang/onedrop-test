/**
 * Created by jiangsong on 2017/7/24.
 */
import React from 'react';
import Tool from '../../Tool/Tool';
import {Table} from 'antd';

const columns = [
    {
        title:'排名',
        dataIndex:'key'
    },
    {
        title:'用户ID',
        dataIndex:'user_id'
    },
    {
        title:'用户昵称',
        dataIndex:'nickname'
    },
    {
        title:'用户积分',
        dataIndex:'fraction'
    }
]

class RankTable extends React.Component{
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
            ranks:[]
        }
    }
    componentDidMount(){
        Tool.get('/get/ranks?page=1',(data)=>{
            let newRanks = [];
            data.map((con,idx)=>{
                con.key = idx+1;
                newRanks.push(con);
            })
            this.setState({
                ranks:newRanks
            })
        },(data)=>{
            alert(JSON.stringify(data));
        })
    }
    render(){
        return(
            <div>
                <RankTable tableData={this.state.ranks}/>
            </div>
        )
    }
}