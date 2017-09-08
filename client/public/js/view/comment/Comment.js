/**
 * Created by jiangsong on 2017/7/26.
 */
import React from 'react';
import { Table, Input, Popconfirm } from 'antd';
import BACK from '../../const/BackControll';

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
            title: 'comment_id',
            dataIndex: 'comment_id',
            width: '10%',
            render: (text, record, index) => this.renderColumns(this.state.data, index, 'comment_id', text),
        }, {
            title: 'nickname',
            dataIndex: 'nickname',
            width: '10%',
            render: (text, record, index) => this.renderColumns(this.state.data, index, 'nickname', text),
        }, {
            title: 'section_name',
            dataIndex: 'section_name',
            width: '15%',
            render: (text, record, index) => this.renderColumns(this.state.data, index, 'section_name', text),
        },{
            title: 'comment',
            dataIndex: 'comment',
            width: '38%',
            render: (text, record, index) => this.renderColumns(this.state.data, index, 'comment', text),
        },{
            title: 'datetime',
            dataIndex: 'datetime',
            width: '10%',
            render: (text, record, index) => this.renderColumns(this.state.data, index, 'datetime', text),
        },{
            title: 'is_checked',
            dataIndex: 'is_checked',
            width: '10%',
            render: (text, record, index) => this.renderColumns(this.state.data, index, 'is_checked', text),
        }, {
            title: 'operation',
            dataIndex: 'operation',
            render: (text, record, index) => {
                const { editable } = this.state.data[index].is_checked;
                return (
                    <div className="editable-row-operations">
                        {
                            editable ?
                                <span>
                                  <a onClick={() => this.editDone(index, 'save')}>Save</a>
                                  <Popconfirm title="Sure to cancel?" onConfirm={() => this.editDone(index, 'cancel')}>
                                    <a>Cancel</a>
                                  </Popconfirm>
                                </span> :
                                <span>
                                  <a onClick={() => this.edit(index)}>Edit</a>
                                </span>
                        }
                    </div>
                );
            },
        }];
        this.state = {
            comments: [],
        };
        this.getData = this.getData.bind(this);
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
                            value: co.datetime,
                        },
                        is_checked: {
                            editable: false,
                            value: co.is_checked+'',
                        }
                    }
                    newComments.push(el);
                })
                this.setState({
                    comments:newComments
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
        const { comments } = this.state;
        const dataSource = comments.map((item) => {
            const obj = {};
            Object.keys(item).forEach((key) => {
                obj[key] = key === 'key' ? item[key] : item[key].value;
            });
            return obj;
        });
        console.log('dataSource:',dataSource);
        const columns = this.columns;
        return <Table bordered dataSource={dataSource} columns={columns} />;
    }
}




export default class Comment extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div>
                <EditableTable />
            </div>
        )
    }
}