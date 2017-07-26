/**
 * Created by jiangsong on 2017/7/26.
 */
import React from 'react';
import { Form, Input, Tooltip, Icon, Button,Mention,
    InputNumber,Upload
} from 'antd';
const FormItem = Form.Item;
const { toString } = Mention;

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
                    ...fieldValues
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
                    label="teacher_id"
                    hasFeedback
                >
                    {getFieldDecorator('teacher_id', {
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
                          teacher_name&nbsp;
                            <Tooltip title="请输入老师的姓名">
                            <Icon type="question-circle-o" />
                          </Tooltip>
                        </span>
                    )}
                    hasFeedback
                >
                    {getFieldDecorator('teacher_name', {
                        rules: [{ required: true, message: 'Please input teacher_name!', whitespace: true }],
                    })(
                        <Input />
                    )}
                </FormItem>



                <FormItem
                    {...formItemLayout}
                    label={(
                        <span>
                          teacher_position&nbsp;
                            <Tooltip title="请输入老师的职位">
                            <Icon type="question-circle-o" />
                          </Tooltip>
                        </span>
                    )}
                    hasFeedback
                >
                    {getFieldDecorator('teacher_position', {
                        rules: [{ required: true, message: 'Please input teacher_position!', whitespace: true }],
                    })(
                        <Input />
                    )}
                </FormItem>




                <FormItem
                    {...formItemLayout}
                    label={(
                        <span>
                          teacher_des&nbsp;
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
                    label="teacher_head"
                >
                    <Upload {...{...picProps , action:'http://192.168.1.37:3300/upload/teacher/head'}}>
                        <Button>
                            <Icon type="upload" /> upload
                        </Button>
                    </Upload>
                </FormItem>



                <FormItem
                    {...formItemLayout}
                    label="teacher_img"
                >
                    <Upload {...{...picProps , action:'http://192.168.1.37:3300/upload/teacher/photo'}}>
                        <Button>
                            <Icon type="upload" /> upload
                        </Button>
                    </Upload>
                </FormItem>




                <FormItem {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">Register</Button>
                </FormItem>
            </Form>
        );
    }
}

const WrappedRegistrationForm = Form.create()(RegistrationForm);

export default class AddTeacher extends React.Component{
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