/**
 * Created by jiangsong on 2017/7/24.
 */
import React from 'react';
import {Table} from 'antd';
import {Link} from 'react-router-dom';
import BACK from '../../const/BackControll';

const columns = [
    {
        title:'问题ID',
        dataIndex:'question_id',
        width:'15%'
    },
    {
        title:'问题描述',
        dataIndex:'question_desc'
    },
    {
        title:'提问者ID',
        dataIndex:'user_id',
        width:'19%'
    },
    {
        title:'提问时间',
        dataIndex:'up_time',
        width:'15%'
    },
    {
        title:'查看详情',
        dataIndex:'check_detail',
        width:'8%',
        render:(text,question) => {
            var questionId = question.question_id
            return (
                <Link to={'/main/q/answer/'+questionId}>查看答案</Link>
            )
        }
    }
]

class QuestionTable extends React.Component{
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

export default class Question extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            tableData:[]
        }
    }
    componentDidMount(){
        fetch(BACK.base_ip+'/get/all/questions',{
            method:'GET',
            credentials : 'include',
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
                <QuestionTable tableData={this.state.tableData}/>
            </div>
        )
    }
}