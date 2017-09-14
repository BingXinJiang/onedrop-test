/**
 * Created by jiangsong on 2017/7/25.
 */

import React from 'react';
import { Form, Input, Tooltip, Icon, Cascader, Button,DatePicker,Mention,
    InputNumber,Upload
} from 'antd';
import UploadFile from '../../Tool/UploadFile';
const FormItem = Form.Item;
const { toString } = Mention;
import BACK from '../../const/BackControll';
import Tool from '../../Tool/Tool';

const authors = [{
    value: '马成功',
    label: '马成功'
}, {
    value: '邰宏伟',
    label: '邰宏伟'
}];

const authorIDs = [{
    value: 1,
    label: '01---马成功'
}, {
    value: 2,
    label: '02---邰宏伟'
}];

const picList = [];

const picProps = {
    action: '//jsonplaceholder.typicode.com/posts/',
    listType: 'picture',
    defaultFileList: [...picList]
};

class RegistrationForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            confirmDirty: false,
            authors:[],
            authorIDs:[]
        }
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, fieldValues) => {
            if (!err) {
                const values = {
                    ...fieldValues,
                    'date-picker': fieldValues['date-picker'].format('YYYY-MM-DD')
                }
                const newValues = {
                    ...values,
                    'author_id':values['author_id'][0],
                    'course_author':values['course_author'][0],
                    'open_date':values['date-picker']
                }
                console.log('newValues:',newValues);
                fetch(BACK.base_ip+'/addcourse/add_course_section',{
                    method:'POST',
                    headers:{
                        'Content-Type':'application/json',
                        'Accept':'application/json'
                    },
                    body:JSON.stringify(newValues)
                }).then((response)=> response.json()).then((resText)=>{
                    console.log(resText);
                }).catch((err)=>{
                    console.log(err);
                })
            }
        });
    }

    componentDidMount(){
        fetch(BACK.base_ip+'/get/teachers',{
            method:'GET',
            headers:{
                'Content-Type':'application/json',
                'Accept':'application/json'
            }
        }).then((response)=>response.json())
            .then((res)=>{
                if(res.status === 1){
                    let teachers = res.data;
                    let authors = [];
                    let authorsIDs = [];
                    teachers.map((ta,idx)=>{
                        let t1={};
                        let t2={};
                        t1.value = ta.teacher_name;
                        t1.label = ta.teacher_name;
                        t2.value = ta.teacher_id;
                        t2.label = ta.teacher_id + '----' + ta.teacher_name;
                        authors.push(t1);
                        authorsIDs.push(t2);
                    })
                    this.setState({
                        authors:authors,
                        authorIDs:authorsIDs
                    })
                }else{
                    alert('数据请求错误！');
                }
            }).catch((err)=>{alert(err)})
    }

    render() {
        const { getFieldDecorator } = this.props.form;

        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 6 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 14 },
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 14,
                    offset: 6,
                },
            },
        };

        const config = {
            rules: [{ type: 'object', required: true, message: 'Please select time!' }],
        };

        return (
            <Form onSubmit={this.handleSubmit}>

                <FormItem
                    {...formItemLayout}
                    label="课程ID(course_id)"
                    hasFeedback
                >
                    {getFieldDecorator('course_id', {
                        rules: [{
                            type: 'number', message: 'The input is not valid number!',
                        }, {
                            required: true, message: 'Please input a number!',
                        }],
                    })(
                        <InputNumber/>
                    )}
                </FormItem>


                <FormItem
                    {...formItemLayout}
                    label={(
                        <span>
                          课程标题(course_title)&nbsp;
                                        <Tooltip title="请输入课程的标题">
                            <Icon type="question-circle-o" />
                          </Tooltip>
                        </span>
                    )}
                    hasFeedback
                >
                    {getFieldDecorator('course_title', {
                        rules: [{ required: true, message: 'Please input course_title!', whitespace: true }],
                    })(
                        <Input />
                    )}
                </FormItem>


                <FormItem
                    {...formItemLayout}
                    label="章节ID(section_id)"
                    hasFeedback
                >
                    {getFieldDecorator('section_id', {
                        rules: [{
                            type: 'number', message: 'The input is not valid number!',
                        }, {
                            required: true, message: 'Please input a number!',
                        }],
                    })(
                        <InputNumber/>
                    )}
                </FormItem>


                <FormItem
                    {...formItemLayout}
                    label={(
                        <span>
                          章节标题(section_name)&nbsp;
                            <Tooltip title="请输入章节标题">
                            <Icon type="question-circle-o" />
                          </Tooltip>
                        </span>
                    )}
                    hasFeedback
                >
                    {getFieldDecorator('section_name', {
                        rules: [{ required: true, message: 'Please input section_name!', whitespace: true }],
                    })(
                        <Input />
                    )}
                </FormItem>



                <FormItem
                    {...formItemLayout}
                    label={(
                        <span>
                          章节详细内容(section_des)&nbsp;
                            <Tooltip title="请输入小节详细内容json">
                            <Icon type="question-circle-o" />
                          </Tooltip>
                        </span>
                    )}
                    hasFeedback
                >

                    {getFieldDecorator('section_des', {
                        rules: [{ required: true, message: 'Please input section_des!', whitespace: true }],
                    })(
                        <textarea style={{width:'100%',height:'120px',paddingLeft:'10px',paddingRight:'10px'}}/>
                    )}

                </FormItem>



                <FormItem
                    {...formItemLayout}
                    label="章节作者(course_author)"
                >
                    {getFieldDecorator('course_author', {
                        initialValue: ['邰宏伟'],
                        rules: [{ type: 'array', required: true, message: 'Please select course_author!' }],
                    })(
                        <Cascader options={this.state.authors} />
                    )}
                </FormItem>


                <FormItem
                    {...formItemLayout}
                    label="章节公开日期(open_date)"
                >
                    {getFieldDecorator('date-picker', config)(
                        <DatePicker />
                    )}
                </FormItem>


                <FormItem
                    {...formItemLayout}
                    label="章节作者ID(author_id)"
                >
                    {getFieldDecorator('author_id', {
                        initialValue: ['1----邰宏伟'],
                        rules: [{ type: 'array', required: true, message: 'Please select course_author!' }],
                    })(
                        <Cascader options={this.state.authorIDs} />
                    )}
                </FormItem>



                <FormItem
                    {...formItemLayout}
                    label="章节语音(section_voice)"
                >
                    <UploadFile uploadUrl="/upload/file"/>
                </FormItem>



                <FormItem
                    {...formItemLayout}
                    label="章节列表图(section_list_img)"
                >
                    <Upload {...{...picProps , action:BACK.base_ip+'/upload/img/list'}}>
                        <Button>
                            <Icon type="upload"/> upload
                        </Button>
                    </Upload>
                </FormItem>



                <FormItem
                    {...formItemLayout}
                    label="章节详情页头图(section_detail_img)"
                >
                    <Upload {...{...picProps , action:BACK.base_ip+'/upload/img/detail'}}>
                        <Button>
                            <Icon type="upload" /> upload
                        </Button>
                    </Upload>
                </FormItem>



                <FormItem
                    {...formItemLayout}
                    label="章节文章内部图(section_content_detail_img)"
                >
                    <Upload {...{...picProps , action:BACK.base_ip+'/upload/img/course_detail'}}>
                        <Button>
                            <Icon type="upload" /> upload
                        </Button>
                    </Upload>
                </FormItem>



                <FormItem
                    {...formItemLayout}
                    label={(
                        <span>
                          章节简介(section_intro)&nbsp;
                            <Tooltip title="请输入小节简介">
                            <Icon type="question-circle-o" />
                          </Tooltip>
                        </span>
                    )}
                    hasFeedback
                >

                    {getFieldDecorator('section_intro', {
                        rules: [{ required: true, message: 'Please input section_intro!', whitespace: true }],
                    })(
                        <textarea style={{width:'100%',height:'80px',paddingLeft:'10px',paddingRight:'10px'}}/>
                    )}


                </FormItem>



                <FormItem
                    {...formItemLayout}
                    label={(
                        <span>
                          章节标签描述(label_des)&nbsp;
                            <Tooltip title="请输入小节标签">
                            <Icon type="question-circle-o" />
                          </Tooltip>
                        </span>
                    )}
                    hasFeedback
                >
                    {getFieldDecorator('label_des', {
                        rules: [{ required: true, message: 'Please input label_des!', whitespace: true }],
                    })(
                        <Input />
                    )}
                </FormItem>


                <FormItem {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">增加课程</Button>
                </FormItem>
            </Form>
        );
    }
}

const WrappedRegistrationForm = Form.create()(RegistrationForm);


export default class CourseCommit extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div>
                <WrappedRegistrationForm/>
            </div>
        )
    }
}