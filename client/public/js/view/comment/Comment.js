/**
 * Created by jiangsong on 2017/7/26.
 */
import React from 'react';
import { Table, Input, Popconfirm } from 'antd';
import BACK from '../../const/BackControll';
import Tool from '../../Tool/Tool';
import Loading from '../class/views/Loading';

class EditableCell extends React.Component {
    state = {
        value: this.props.value,
        editable: this.props.editable || false,
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.editable !== this.state.editable) {
            this.setState({ editable: nextProps.editable });
            if (nextProps.editable) {
                this.cacheValue = this.state.value;
            }
        }
        if (nextProps.status && nextProps.status !== this.props.status) {
            if (nextProps.status === 'save') {
                this.props.onChange(this.state.value);
            } else if (nextProps.status === 'cancel') {
                this.setState({ value: this.cacheValue });
                this.props.onChange(this.cacheValue);
            }
        }
    }
    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.editable !== this.state.editable ||
            nextState.value !== this.state.value;
    }
    handleChange(e) {
        const value = e.target.value;
        this.setState({ value });
    }
    render() {
        const { value, editable } = this.state;
        return (
            <div>
                {
                    editable ?
                        <div>
                            <Input
                                value={value}
                                onChange={e => this.handleChange(e)}
                            />
                        </div>
                        :
                        <div className="editable-row-text">
                            {value.toString() || ' '}
                        </div>
                }
            </div>
        );
    }
}
class EditableTable extends React.Component {
    constructor(props) {
        super(props);
        this.columns = [{
            title: '评论ID',
            dataIndex: 'comment_id',
            width: '10%',
            render: (text, record, index) => this.renderColumns(this.state.data, index, 'comment_id', text),
        }, {
            title: '评论人',
            dataIndex: 'nickname',
            width: '10%',
            render: (text, record, index) => this.renderColumns(this.state.data, index, 'nickname', text),
        }, {
            title: '文章标题',
            dataIndex: 'section_name',
            width: '15%',
            render: (text, record, index) => this.renderColumns(this.state.data, index, 'section_name', text),
        }, {
            title: '评论内容',
            dataIndex: 'comment',
            width: '38%',
            render: (text, record, index) => this.renderColumns(this.state.data, index, 'comment', text),
        }, {
            title: '评论日期',
            dataIndex: 'datetime',
            width: '10%',
            render: (text, record, index) => this.renderColumns(this.state.data, index, 'datetime', text),
        }, {
            title: '审核',
            dataIndex: 'is_checked',
            width: '10%',
            render: (text, record, index) => this.renderColumns(this.state.data, index, 'is_checked', text),
        }, {
            title: '编辑',
            dataIndex: 'operation',
            render: (text, record, index) => {
                const { editable } = this.state.data[index].is_checked;
                return (
                    <div className="editable-row-operations">
                        {
                            editable ?
                                <span>
                                  <a onClick={() => this.editDone(index, 'save')}>确定</a>
                                  <Popconfirm title="Sure to cancel?" onConfirm={() => this.editDone(index, 'cancel')}>
                                    <a>取消</a>
                                  </Popconfirm>
                                </span>
                                :
                                <span>
                                  <a onClick={() => this.edit(index)}>Edit</a>
                                </span>
                        }
                    </div>
                );
            },
        }];
        this.state = {
            data: []
        };
    }
    static propTypes = {
        callback:React.PropTypes.func
    }
    renderColumns(data, index, key, text) {
        const { editable, status } = data[index][key];
        if (typeof editable === 'undefined') {
            return text;
        }
        return (<EditableCell
            editable={editable}
            value={text}
            onChange={value => this.handleChange(key, index, value)}
            status={status}
        />);
    }
    handleChange(key, index, value) {
        const { data } = this.state;
        data[index][key].value = value;
        this.setState({ data });
        let comment_id = data[index].comment_id.value;
        this.fetchEdit(comment_id,value);
    }
    fetchEdit(comment_id,value){
        process.nextTick(()=>{
            fetch(BACK.base_ip+'/comment/edit',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                    'accept':'application'
                },
                body:JSON.stringify({comment_id:comment_id,is_checked:value})
            }).then((res)=>res.json()).then((res)=>{
                if(res.status === 1){
                    alert('评论审核信息提交成功！');
                }else{
                    alert('评论审核信息提交失败！');
                }
            })
        })
    }
    edit(index) {
        const { data } = this.state;
        Object.keys(data[index]).forEach((item) => {
            if (data[index][item] && typeof data[index][item].editable !== 'undefined') {
                data[index][item].editable = true;
            }
        });

        this.setState({ data });
    }
    editDone(index, type) {
        const { data } = this.state;

        Object.keys(data[index]).forEach((item) => {
            if (data[index][item] && typeof data[index][item].editable !== 'undefined') {
                data[index][item].editable = false;
                data[index][item].status = type;
            }
        });

        this.setState({ data }, () => {
            Object.keys(data[index]).forEach((item) => {
                if (data[index][item] && typeof data[index][item].editable !== 'undefined') {
                    delete data[index][item].status;
                }
            });
        });
    }
    getData(page){
        fetch(BACK.base_ip+'/get/comments?page='+page,{
            method:'GET',
            headers:{
                'Content-Type':'application/json',
                'Accept':'application/json'
            }
        }).then((res)=>res.json()).then((resText)=>{
            if(resText.status === 1){
                var comments = resText.data;
                var newComments = [];
                comments.map((co,idx)=>{
                    var el = {
                        key: idx+'',
                        comment_id: {
                            value: co.comment_id+'',
                        },
                        nickname: {
                            value: co.nickname,
                        },
                        section_name: {
                            value: co.section_name,
                        },
                        comment: {
                            value: co.comment,
                        },
                        datetime: {
                            value: Tool.dateFormat(co.datetime),
                        },
                        is_checked: {
                            editable: false,
                            value: co.is_checked+'',
                        }
                    }
                    newComments.push(el);
                })
                this.setState({
                    data:newComments
                })
            }else{
                alert(JSON.stringify(resText.data));
            }
        })
    }
    componentDidMount(){
        this.getData(1);
    }
    render() {
        const { data } = this.state;
        const dataSource = data.map((item) => {
            const obj = {};
            Object.keys(item).forEach((key) => {
                obj[key] = key === 'key' ? item[key] : item[key].value;
            });
            return obj;
        });
        const columns = this.columns;
        return <Table bordered dataSource={dataSource} columns={columns} />;
    }
}


export default class Comment extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isLoading:false
        }
    }
    handleLoading(isLoading){
        if(isLoading){
            this.setState({
                isLoading:true
            })
        }else {
            this.setState({
                isLoading:false
            })
        }
    }
    render(){
        return(
            <div>
                <EditableTable callback={this.handleLoading.bind(this)}/>
                {
                    this.state.isLoading ? <Loading/> : null
                }
            </div>
        )
    }
}