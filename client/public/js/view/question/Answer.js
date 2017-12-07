/**
 * Created by jiangsong on 2017/9/30.
 */
import React from 'react';
import {Table} from 'antd';
import {Link} from 'react-router-dom';
import BACK from '../../const/BackControll';
import Tool from '../../Tool/Tool';

const columns = [
    {
        title:'答案ID',
        dataIndex:'answer_id',
        width:'13%'
    },
    {
        title:'答案描述',
        dataIndex:'answer_desc'
    },
    {
        title:'用户ID',
        dataIndex:'user_id',
        width:'20%'
    },
    {
        title:'回答时间',
        dataIndex:'answer_time',
        width:'15%'
    }
]

class TableAnswer extends React.Component{
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

export default class Answer extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            tableData:[]
        }
        this.questionId = '';
    }
    componentWillMount(){
        this.questionId = location.pathname.split('/').pop();
    }
    componentDidMount(){
        let url = '/get/answers?question_id='+this.questionId;
        Tool.get(url,(data)=>{
            let tbs = data;
            let newTbs = [];
            tbs.map((con,idx)=>{
                con.key = idx+1+'';
                newTbs.push(con);
            })
            this.setState({
                tableData:newTbs
            })
        },()=>{
            alert('数据请求错误！');
        })
    }
    render(){
        return(
            <div>
                <TableAnswer tableData={this.state.tableData}/>
            </div>
        )
    }
}