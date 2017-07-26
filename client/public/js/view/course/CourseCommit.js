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
    state = {
        confirmDirty: false,
    };
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, fieldValues) => {
            if (!err) {
                const values = {
                    ...fieldValues,
                    'date-picker': fieldValues['date-picker'].format('YYYY-MM-DD')
                }
                console.log('Received values of form: ', values);
            }
        });
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
                    label="course_id"
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
                          course_title&nbsp;
                                        <Tooltip title="请输入课程的总标题">
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
                    label="section_id"
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
                          section_name&nbsp;
                            <Tooltip title="请输入小节标题">
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
                          section_des&nbsp;
                            <Tooltip title="请输入小节详细内容json">
                            <Icon type="question-circle-o" />
                          </Tooltip>
                        </span>
                    )}
                    hasFeedback
                >
                    <Mention
                        style={{ width: '100%', height: 100 }}
                        onChange={(editorState)=>{
                            // console.log(toString(editorState));
                        }}
                        suggestions={[]}
                        multiLines
                    />

                </FormItem>



                <FormItem
                    {...formItemLayout}
                    label="course_author"
                >
                    {getFieldDecorator('course_author', {
                        initialValue: ['马成功'],
                        rules: [{ type: 'array', required: true, message: 'Please select course_author!' }],
                    })(
                        <Cascader options={authors} />
                    )}
                </FormItem>


                <FormItem
                    {...formItemLayout}
                    label="open_date"
                >
                    {getFieldDecorator('date-picker', config)(
                        <DatePicker />
                    )}
                </FormItem>



                <FormItem
                    {...formItemLayout}
                    label="author_id"
                >
                    {getFieldDecorator('author_id', {
                        initialValue: ['01--马成功'],
                        rules: [{ type: 'array', required: true, message: 'Please select course_author!' }],
                    })(
                        <Cascader options={authorIDs} />
                    )}
                </FormItem>



                <FormItem
                    {...formItemLayout}
                    label="section_voice"
                >
                    <UploadFile/>
                </FormItem>



                <FormItem
                    {...formItemLayout}
                    label="section_list_img"
                >
                    <Upload {...{...picProps , action:'http://192.168.1.37:3300/upload/img/list'}}>
                        <Button>
                            <Icon type="upload" /> upload
                        </Button>
                    </Upload>
                </FormItem>



                <FormItem
                    {...formItemLayout}
                    label="section_detail_img"
                >
                    <Upload {...{...picProps , action:'http://192.168.1.37:3300/upload/img/detail'}}>
                        <Button>
                            <Icon type="upload" /> upload
                        </Button>
                    </Upload>
                </FormItem>



                <FormItem
                    {...formItemLayout}
                    label={(
                        <span>
                          section_intro&nbsp;
                            <Tooltip title="请输入小节简介">
                            <Icon type="question-circle-o" />
                          </Tooltip>
                        </span>
                    )}
                    hasFeedback
                >
                    <Mention
                        style={{ width: '100%', height: 100 }}
                        onChange={(editorState)=>{
                            // console.log(toString(editorState));
                        }}
                        suggestions={[]}
                        multiLines
                    />

                </FormItem>



                <FormItem
                    {...formItemLayout}
                    label={(
                        <span>
                          label_des&nbsp;
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
                    <Button type="primary" htmlType="submit">Register</Button>
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