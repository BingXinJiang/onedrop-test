/**
 * Created by jiangsong on 2017/9/26.
 */
import React from 'react';
import CONFIG from '../../../const/BackConfig';
import BACK from '../../../const/BackControll';
import { DatePicker,Upload, Icon, message } from 'antd';

function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

function beforeUpload(file) {
    const isJPG = file.type === 'image/jpeg';
    if (!isJPG) {
        message.error('You can only upload JPG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    return isJPG && isLt2M;
}

class Avatar extends React.Component {
    state = {};

    static propTypes = {
        callback:React.PropTypes.func
    }

    handleChange = (info) => {
        if (info.file.status === 'done') {
            // console.log('info.file.name:',info.file.name);
            this.props.callback(info.file.name);
            getBase64(info.file.originFileObj, imageUrl => {
                // console.log('imageUrl:',imageUrl);
                this.setState({ imageUrl })
            });
        }
    }

    render() {
        const imageUrl = this.state.imageUrl;
        return (
            <Upload
                className="avatar-uploader"
                name="avatar"
                showUploadList={false}
                action={BACK.base_ip+'/upload/company/logo'}
                beforeUpload={beforeUpload}
                onChange={this.handleChange}
            >
                {
                    imageUrl ?
                        <img src={imageUrl} alt="" className="avatar" /> :
                        <Icon type="plus" className="avatar-uploader-trigger" />
                }
            </Upload>
        );
    }
}

export default class AddCompany extends React.Component{
    constructor(props){
        super(props);
        this.imgName = '';
        this.dateString = '';
    }
    static propTypes = {
        company:React.PropTypes.object,
        callback:React.PropTypes.func
    }
    handleCallback(isAdd){
        if(isAdd){
            var companyName = this.refs['input_company_name'].value.trim();
            var companyIntro = this.refs['textarea_company_intro'].value.trim();
            var imgName = this.imgName;
            var dateString = this.dateString;

            if(!companyName){
                alert('公司名称必须填写！');
                return;
            }

            if(!dateString){
                alert('请选择日期！');
                return;
            }

            var company = {
                company_name:companyName,
                company_log:imgName,
                company_intro:companyIntro,
                open_date:dateString
            }

            this.props.callback('add',company);
        }else{
            this.props.callback('cancel');
        }
    }
    handleImage(imgName){
        this.imgName = imgName;
    }
    handleDate(date,dateString){
        this.dateString = dateString;
    }
    render(){
        return(
            <div style={{
                position:'absolute',width:CONFIG.WindowWidth,height:CONFIG.BodyHeight,backgroundColor:'rgba(0,0,0,0.1)',left:'0',top:'0',
                display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'
            }}>
                <div style={{width:'600px',height:'700px',backgroundColor:'white',display:'flex',flexDirection:'column',
                    justifyContent:'center'
                }}>
                    <div>
                        <div style={{display:'flex',flexDirection:'row'}}>
                            <div style={{
                                width:'150px',display:'flex',justifyContent:'flex-end'
                            }}><p style={{fontSize:CONFIG.wordSize}}>公司ID:&nbsp;&nbsp; </p></div>
                            <div style={{
                                display:'flex',flex:'1',justifyContent:'flex-start'
                            }}><input style={{width:'350px'}}/></div>
                        </div>
                        <div style={{display:'flex',flexDirection:'row',marginTop:'30px'}}>
                            <div style={{
                                width:'150px',display:'flex',justifyContent:'flex-end'
                            }}><p style={{fontSize:CONFIG.wordSize}}>公司名字:&nbsp;&nbsp; </p></div>
                            <div style={{
                                display:'flex',flex:'1',justifyContent:'flex-start'
                            }}><input ref='input_company_name' style={{width:'350px'}}/></div>
                        </div>
                        <div style={{display:'flex',flexDirection:'row',marginTop:'30px'}}>
                            <div style={{
                                width:'150px',display:'flex',justifyContent:'flex-end'
                            }}><p style={{fontSize:CONFIG.wordSize}}>公司介绍:&nbsp;&nbsp; </p></div>
                            <div style={{
                                display:'flex',flex:'1',justifyContent:'flex-start'
                            }}><textarea ref="textarea_company_intro" style={{width:'350px',height:'60px'}}/></div>
                        </div>
                        <div style={{display:'flex',flexDirection:'row',marginTop:'30px'}}>
                            <div style={{
                                width:'150px',display:'flex',justifyContent:'flex-end'
                            }}><p style={{fontSize:CONFIG.wordSize}}>公司Logo:&nbsp;&nbsp; </p></div>
                            <div style={{
                                display:'flex',flex:'1',justifyContent:'flex-start'
                            }}><Avatar callback={this.handleImage.bind(this)}/></div>
                        </div>
                        <div style={{display:'flex',flexDirection:'row',marginTop:'30px'}}>
                            <div style={{
                                width:'150px',display:'flex',justifyContent:'flex-end'
                            }}><p style={{fontSize:CONFIG.wordSize}}>添加日期:&nbsp;&nbsp; </p></div>
                            <div style={{
                                display:'flex',flex:'1',justifyContent:'flex-start'
                            }}><DatePicker onChange={this.handleDate.bind(this)} /></div>
                        </div>
                    </div>
                    <div style={{display:'flex',marginTop:'60px'}}>
                        <div style={{width:'300px',display:'flex',justifyContent:'center',alignItems:'center'}}>
                            <p style={{width:'70px',height:'40px',borderRadius:'7px',backgroundColor:CONFIG.cellBgColorBlueHeight,
                                display:'flex',justifyContent:'center',alignItems:'center',color:CONFIG.wordColorBgBlue
                            }} onClick={this.handleCallback.bind(this,false)}>
                                取消
                            </p>
                        </div>
                        <div style={{width:'300px',display:'flex',justifyContent:'center',alignItems:'center'}}>
                            <p style={{width:'90px',height:'40px',borderRadius:'7px',backgroundColor:CONFIG.cellBgColorBlueHeight,
                                display:'flex',justifyContent:'center',alignItems:'center',color:CONFIG.wordColorBgBlue
                            }} onClick={this.handleCallback.bind(this,true)}>
                                添加/修正
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}