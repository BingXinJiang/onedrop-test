/**
 * Created by jiangsong on 2017/7/26.
 */
import React from 'react';
import { Table, Input, Popconfirm } from 'antd';

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
            width: '40%',
            render: (text, record, index) => this.renderColumns(this.state.data, index, 'comment', text),
        },{
            title: 'datetime',
            dataIndex: 'datetime',
            width: '12%',
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
            data: [{
                key: '0',
                comment_id: {
                    value: '1',
                },
                nickname: {
                    value: '风居住的街道',
                },
                section_name: {
                    value: '逻辑思维的小组制',
                },
                comment: {
                    value: '从逻辑思维的小组制，学到了很多东西！从逻辑思维的小组制，学到了很多东西！从逻辑思维的小组制，学到了很多东西！从逻辑思维的小组制，学到了很多东西！从逻辑思维的小组制，学到了很多东西！从逻辑思维的小组制，学到了很多东西！从逻辑思维的小组制，学到了很多东西！',
                },
                datetime: {
                    value: '2017-7-28 12:34:15',
                },
                is_checked: {
                    editable: false,
                    value: '0',
                },
            }],
        };
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
    }
    render(){
        return(
            <div>
                <EditableTable />
            </div>
        )
    }
}