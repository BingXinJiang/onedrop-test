/**
 * Created by jiangsong on 2017/7/26.
 */
import React from 'react';
import { Form, Input, Icon, Button,
    InputNumber
} from 'antd';
const FormItem = Form.Item;
import BACK from '../../const/BackControll';

let uuid = 0;
class DynamicFieldSet extends React.Component {
    remove = (k) => {
        if(this.props.canGet){
            return;
        }
        const { form } = this.props;
        // can use data-binding to get
        const keys = form.getFieldValue('keys');
        // We need at least one passenger
        if (keys.length === 1) {
            return;
        }

        // can use data-binding to set
        form.setFieldsValue({
            keys: keys.filter(key => key !== k),
        });
    }

    add = () => {
        if(this.props.canGet){
            return;
        }
        uuid++;
        const { form } = this.props;
        // can use data-binding to get
        const keys = form.getFieldValue('keys');
        const nextKeys = keys.concat(uuid);
        // can use data-binding to set
        // important! notify form to detect changes
        form.setFieldsValue({
            keys: nextKeys,
        });
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.canGet){
            nextProps.form.validateFields((err, values) => {
                if (!err) {
                    // console.log('Received values of form: ', values);
                    nextProps.callback(values);
                }
            });
        }
    }

    render() {
        const { getFieldDecorator, getFieldValue } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 4 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 20 },
            },
        };
        const formItemLayoutWithOutLabel = {
            wrapperCol: {
                xs: { span: 24, offset: 0 },
                sm: { span: 20, offset: 4 },
            },
        };
        getFieldDecorator('keys', { initialValue: [] });
        const keys = getFieldValue('keys');
        const formItems = keys.map((k, index) => {
            return (
                <FormItem
                    {...formItemLayout}
                    label={`标签--${index+1}`}
                    required={false}
                    key={k}
                >
                    {getFieldDecorator(`labelNames-${k}`, {
                        validateTrigger: ['onChange', 'onBlur'],
                        rules: [{
                            required: true,
                            whitespace: true,
                            message: "Please input label's name or delete this field.",
                        }],
                    })(
                        <Input placeholder="label name" style={{ width: '60%', marginRight: 8 }} />
                    )}
                    {keys.length > 1 ? (
                        <Icon
                            className="dynamic-delete-button"
                            type="minus-circle-o"
                            disabled={keys.length === 1}
                            onClick={() => this.remove(k)}
                        />
                    ) : null}
                </FormItem>
            );
        });
        return (
            <Form onSubmit={this.handleSubmit}>
                {formItems}
                <FormItem {...formItemLayoutWithOutLabel}>
                    <Button type="dashed" onClick={this.add} style={{ width: '60%' }}>
                        <Icon type="plus" /> 增加标签
                    </Button>
                </FormItem>
            </Form>
        );
    }
}

const WrappedDynamicFieldSet = Form.create()(DynamicFieldSet);

class RegistrationForm extends React.Component {
    state = {
        confirmDirty: false,
    };

    componentWillReceiveProps(nextProps){
        if(nextProps.canGet){
            nextProps.form.validateFieldsAndScroll((err, fieldValues) => {
                if (!err) {
                    const values = {
                        ...fieldValues
                    }
                    // console.log('Received values of form: ', values);
                    nextProps.callback(values);
                }
            });
        }
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
                    label="(课程章节ID)section_id"
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
            </Form>
        );
    }
}

const WrappedRegistrationForm = Form.create()(RegistrationForm);

export default class CourseLabel extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            getFromSon1:false,
            getFromSun2:false,
            isLoading:false
        }
        this.callbackFromSun1 = this.callbackFromSun1.bind(this);
        this.callbackFromSun2 = this.callbackFromSun2.bind(this);
        this.addLabel = this.addLabel.bind(this);
        this.section_id = 0;
        this.labels = [];
        this.singal = 0;
    }
    pushLabels = ()=>{
        if(this.singal<2){
            return;
        }
        console.log('this.section_id:',this.section_id);
        console.log('this.labels:',this.labels);
        var body = {
            section_id:this.section_id,
            labels:this.labels
        }
        fetch(BACK.base_ip+'/add/label/section',{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                'Accept':'application/json'
            },
            body:JSON.stringify(body)
        }).then((res)=>res.json()).then((resText)=>{
            if(resText.status === 1){
                alert('课程标签添加成功！');
            }else{
                alert(JSON.stringify(resText.data));
            }
        })
    }
    callbackFromSun1(values){
        this.section_id = values.section_id;
        this.singal++;
        this.pushLabels();
        this.setState({
            getFromSon1:false
        })
    }
    callbackFromSun2(values){
        values.keys.map((a,idx)=>{
            this.labels.push(values[`labelNames-${a}`]);
        })
        this.singal++;
        this.pushLabels();
        this.setState({
            getFromSon2:false
        })
    }
    addLabel(){
        if(this.state.isLoading){
            return;
        }
        this.setState({
            getFromSon1:true,
            getFromSon2:true,
            isLoading:true
        })

    }
    render(){
        return(
            <div>
                <WrappedRegistrationForm canGet={this.state.getFromSon1} callback={this.callbackFromSun1}/>
                <WrappedDynamicFieldSet canGet={this.state.getFromSon2} callback={this.callbackFromSun2}/>
                <div style={{width:'80%',display:'flex',justifyContent:'center'}}>
                    <Button type="primary" onClick={this.addLabel}>增加课程标签</Button>
                </div>
            </div>
        )
    }
}