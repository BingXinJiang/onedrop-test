/**
 * Created by jiangsong on 2017/9/30.
 */
import React from 'react';
import {Table} from 'antd';
import {Link} from 'react-router-dom';
import BACK from '../../const/BackControll';

const columns = [
    {
        title:'答案ID',
        dataIndex:'answer_id'
    },
    {
        title:'答案描述',
        dataIndex:'answer_desc'
    },
    {
        title:'用户ID',
        dataIndex:'user_id'
    },
    {
        title:'回答时间',
        dataIndex:'answer_time'
    },
    {
        title:'所属问题',
        dataIndex:'question_id'
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
        var url = BACK.base_ip+'/get/answers?question_id='+this.questionId;
        fetch(url,{
            method:'GET',
            headers:{
                'Content-Type':'application/json',
                'accept':'application/json'
            }
        }).then((res)=>res.json()).then((res)=>{
            if(res.status === 1){
                var tbs = res.data;
                var newTbs = [];
                tbs.map((con,idx)=>{
                    con.key = idx+1+'';
                    newTbs.push(con);
                })
                this.setState({
                    tableData:newTbs
                })
            }else{
                alert('数据请求错误！');
            }
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