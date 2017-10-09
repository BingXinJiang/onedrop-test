/**
 * Created by jiangsong on 2017/7/26.
 */
import React from 'react';
import { Form, Input, Tooltip, Icon, Button,Mention,
} from 'antd';
const FormItem = Form.Item;
import BACK from '../../const/BackControll';

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
                fetch(BACK.base_ip+'/add/label',{
                    method:'POST',
                    credentials : 'include',
                    headers:{
                        'Content-Type':'application/json',
                        'Accept':'application/json'
                    },
                    body:JSON.stringify(values)
                }).then((res)=>res.json())
                    .then((resText)=>{
                        if(resText.status === 1){
                            alert(resText.data.msg);
                        }else{
                            alert(JSON.stringify(resText.data));
                        }
                    })
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
                    label={(
                        <span>
                          标签名称(label_name)&nbsp;
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
                    <Button type="primary" htmlType="submit">增加课程标签</Button>
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