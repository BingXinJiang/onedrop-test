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


        return (
            <Form onSubmit={this.handleSubmit}>

                <FormItem
                    {...formItemLayout}
                    label="label_id"
                    hasFeedback
                >
                    {getFieldDecorator('label_id', {
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
                          label_name&nbsp;
                            <Tooltip title="请输入课程标签">
                            <Icon type="question-circle-o" />
                          </Tooltip>
                        </span>
                    )}
                    hasFeedback
                >
                    {getFieldDecorator('label_name', {
                        rules: [{ required: true, message: 'Please input label_name!', whitespace: true }],
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

export default class AddLabel extends React.Component{
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