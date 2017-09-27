/**
 * Created by jiangsong on 2017/9/27.
 */
import React from 'react';
import CONFIG from '../../../const/BackConfig';
import BACK from '../../../const/BackControll';
import { DatePicker } from 'antd';


export default class AddProject extends React.Component {
    constructor(props) {
        super(props);
        this.dateString = '';
    }

    static propTypes = {
        project: React.PropTypes.object,
        callback: React.PropTypes.func
    }

    handleCallback(isAdd) {
        if (isAdd) {
            var projectName = this.refs['input_project_name'].value.trim();
            var projectIntro = this.refs['textarea_project_intro'].value.trim();
            var dateString = this.dateString;

            if (!projectName) {
                alert('项目名称必须填写！');
                return;
            }

            if (!dateString) {
                alert('请选择日期！');
                return;
            }

            var project = {
                project_name: projectName,
                project_intro: projectIntro,
                open_date: dateString
            }

            this.props.callback('add', project);
        } else {
            this.props.callback('cancel');
        }
    }

    handleDate(date, dateString) {
        this.dateString = dateString;
    }

    render() {
        return (
            <div style={{
                position: 'absolute',
                width: CONFIG.WindowWidth,
                height: CONFIG.BodyHeight,
                backgroundColor: 'rgba(0,0,0,0.1)',
                left: '0',
                top: '0',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <div style={{
                    width: '600px', height: '700px', backgroundColor: 'white', display: 'flex', flexDirection: 'column',
                    justifyContent: 'center'
                }}>
                    <div>
                        <div style={{display: 'flex', flexDirection: 'row'}}>
                            <div style={{
                                width: '150px', display: 'flex', justifyContent: 'flex-end'
                            }}><p style={{fontSize: CONFIG.wordSize}}>项目ID:&nbsp;&nbsp; </p></div>
                            <div style={{
                                display: 'flex', flex: '1', justifyContent: 'flex-start'
                            }}><input style={{width: '350px'}}/></div>
                        </div>
                        <div style={{display: 'flex', flexDirection: 'row', marginTop: '30px'}}>
                            <div style={{
                                width: '150px', display: 'flex', justifyContent: 'flex-end'
                            }}><p style={{fontSize: CONFIG.wordSize}}>项目名称:&nbsp;&nbsp; </p></div>
                            <div style={{
                                display: 'flex', flex: '1', justifyContent: 'flex-start'
                            }}><input ref='input_project_name' style={{width: '350px'}}/></div>
                        </div>
                        <div style={{display: 'flex', flexDirection: 'row', marginTop: '30px'}}>
                            <div style={{
                                width: '150px', display: 'flex', justifyContent: 'flex-end'
                            }}><p style={{fontSize: CONFIG.wordSize}}>项目介绍:&nbsp;&nbsp; </p></div>
                            <div style={{
                                display: 'flex', flex: '1', justifyContent: 'flex-start'
                            }}><textarea ref="textarea_project_intro" style={{width: '350px', height: '60px'}}/></div>
                        </div>

                        <div style={{display: 'flex', flexDirection: 'row', marginTop: '30px'}}>
                            <div style={{
                                width: '150px', display: 'flex', justifyContent: 'flex-end'
                            }}><p style={{fontSize: CONFIG.wordSize}}>添加日期:&nbsp;&nbsp; </p></div>
                            <div style={{
                                display: 'flex', flex: '1', justifyContent: 'flex-start'
                            }}><DatePicker onChange={this.handleDate.bind(this)}/></div>
                        </div>
                    </div>
                    <div style={{display: 'flex', marginTop: '60px'}}>
                        <div style={{width: '300px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                            <p style={{
                                width: '70px',
                                height: '40px',
                                borderRadius: '7px',
                                backgroundColor: CONFIG.cellBgColorBlueHeight,
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                color: CONFIG.wordColorBgBlue
                            }} onClick={this.handleCallback.bind(this, false)}>
                                取消
                            </p>
                        </div>
                        <div style={{width: '300px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                            <p style={{
                                width: '90px',
                                height: '40px',
                                borderRadius: '7px',
                                backgroundColor: CONFIG.cellBgColorBlueHeight,
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                color: CONFIG.wordColorBgBlue
                            }} onClick={this.handleCallback.bind(this, true)}>
                                添加/修正
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}