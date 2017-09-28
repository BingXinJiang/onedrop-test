/**
 * Created by jiangsong on 2017/9/28.
 */
import React from 'react';
import CONFIG from '../../../const/BackConfig';
import BACK from '../../../const/BackControll';
import { DatePicker } from 'antd';
import Avator from '../views/Avator';


export default class AddClass extends React.Component{
    constructor(props){
        super(props);
        this.imgName = '';
        this.dateString = '';
    }
    static propTypes = {
        pclass:React.PropTypes.object,
        callback:React.PropTypes.func
    }
    handleCallback(isAdd){
        if(isAdd){
            let className = this.refs['input_class_name'].value.trim();
            let classIntro = this.refs['textarea_class_intro'].value.trim();
            let classNum = this.refs['input_class_num'].value.trim();
            classNum = Number(classNum);
            let imgName = this.imgName;
            let dateString = this.dateString;

            if(!className){
                alert('班级名称必须填写！');
                return;
            }

            if(!dateString){
                alert('请选择日期！');
                return;
            }

            if(!classNum || typeof classNum !== 'number' || classNum<=0){
                alert('请输入正确的班级人数!');
                return;
            }

            var pclass = {
                class_name:className,
                class_logo:imgName,
                class_intro:classIntro,
                class_num:classNum,
                open_date:dateString
            }

            this.props.callback('add',pclass);
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
                            }}><p style={{fontSize:CONFIG.wordSize}}>班级ID:&nbsp;&nbsp; </p></div>
                            <div style={{
                                display:'flex',flex:'1',justifyContent:'flex-start'
                            }}><input style={{width:'350px'}}/></div>
                        </div>
                        <div style={{display:'flex',flexDirection:'row',marginTop:'30px'}}>
                            <div style={{
                                width:'150px',display:'flex',justifyContent:'flex-end'
                            }}><p style={{fontSize:CONFIG.wordSize}}>班级名称:&nbsp;&nbsp; </p></div>
                            <div style={{
                                display:'flex',flex:'1',justifyContent:'flex-start'
                            }}><input ref='input_class_name' style={{width:'350px'}}/></div>
                        </div>
                        <div style={{display:'flex',flexDirection:'row',marginTop:'30px'}}>
                            <div style={{
                                width:'150px',display:'flex',justifyContent:'flex-end'
                            }}><p style={{fontSize:CONFIG.wordSize}}>班级介绍:&nbsp;&nbsp; </p></div>
                            <div style={{
                                display:'flex',flex:'1',justifyContent:'flex-start'
                            }}><textarea ref="textarea_class_intro" style={{width:'350px',height:'60px'}}/></div>
                        </div>
                        <div style={{display:'flex',flexDirection:'row',marginTop:'30px'}}>
                            <div style={{
                                width:'150px',display:'flex',justifyContent:'flex-end'
                            }}><p style={{fontSize:CONFIG.wordSize}}>班级人数:&nbsp;&nbsp; </p></div>
                            <div style={{
                                display:'flex',flex:'1',justifyContent:'flex-start'
                            }}><input ref='input_class_num' style={{width:'350px'}}/></div>
                        </div>
                        <div style={{display:'flex',flexDirection:'row',marginTop:'30px'}}>
                            <div style={{
                                width:'150px',display:'flex',justifyContent:'flex-end'
                            }}><p style={{fontSize:CONFIG.wordSize}}>班级Logo:&nbsp;&nbsp; </p></div>
                            <div style={{
                                display:'flex',flex:'1',justifyContent:'flex-start'
                            }}><Avator callback={this.handleImage.bind(this)} upUrl={BACK.base_ip+'/upload/class/logo'}/></div>
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