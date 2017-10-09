/**
 * Created by jiangsong on 2017/7/26.
 */
import React from 'react';
import { Form, Input, Tooltip, Icon, Button,Mention,
    InputNumber,Upload
} from 'antd';
import BACK from '../../const/BackControll';
const FormItem = Form.Item;
import Avator from '../class/views/Avator';

class RegistrationForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            confirmDirty: false
        }
        this.teacherHeadName = '';
        this.teacherPhotoName = '';
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, fieldValues) => {
            if (!err) {
                if(!this.teacherHeadName){
                    alert('必须上传老师头像！');
                    return;
                }
                const values = {
                    ...fieldValues,
                    teacher_head:this.teacherHeadName,
                    teacher_image:this.teacherPhotoName
                }
                // console.log('Received values of form: ', values);
                fetch(BACK.base_ip+'/add/teacher',{
                    method:'POST',
                    credentials : 'include',
                    headers:{
                        'Content-Type':'application/json',
                        'accept':'application/json'
                    },
                    body:JSON.stringify(values)
                }).then((res)=>res.json()).then((res)=>{
                    if(res.status === 1){
                        alert('老师信息提交成功！');
                    }else{
                        alert('数据提交失败！');
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
                            <Tooltip title="请输入老师介绍">
                            <Icon type="question-circle-o" />
                          </Tooltip>
                        </span>
                    )}
                    hasFeedback
                >
                    {getFieldDecorator('teacher_des', {
                        rules: [{ required: true, message: 'Please input teacher_des!', whitespace: true }],
                    })(
                        <textarea style={{width:'100%',height:'60px',paddingLeft:'10px',paddingRight:'10px'}}/>
                    )}

                </FormItem>




                <FormItem
                    {...formItemLayout}
                    label="teacher_head"
                >
                    <Avator callback={(imgName)=>{this.teacherHeadName=imgName}} upUrl={BACK.base_ip+'/upload/teacher/head'}/>
                </FormItem>



                <FormItem
                    {...formItemLayout}
                    label="teacher_image"
                >
                    <Avator callback={(imgName)=>{this.teacherPhotoName=imgName}} upUrl={BACK.base_ip+'/upload/teacher/photo'}/>
                </FormItem>




                <FormItem {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">增加老师</Button>
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