/**
 * Created by jiangsong on 2017/10/10.
 */
import React from 'react';
import CONFIG from '../../../const/BackConfig';

export default class JSAlert extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isShowPoint:false
        }
    }
    static propTypes = {
        title:React.PropTypes.string,
        pointTitle:React.PropTypes.string,
        confirm:React.PropTypes.func,
        cancel:React.PropTypes.func
    }
    render(){
        return(
            <div>
                <a href="javascript:void(0);" onClick={(e)=>{
                    e.stopPropagation();
                    this.setState({
                        isShowPoint:true
                    })
                }}>{this.props.title}</a>
                {
                    this.state.isShowPoint ?
                        <div style={{
                            position:'absolute',width:'200px',height:'120px',backgroundColor:CONFIG.bgColorGrayMiddle,
                            display:'flex',flexDirection:'column',alignItems:'center',borderRadius:'10px',
                            left:(CONFIG.BodyWidth/2-400)+'px',top:(CONFIG.BodyHeight/2-120)+'px'

                        }}>
                            <p style={{marginTop:'15px',fontSize:'18px'}}>{this.props.pointTitle}</p>
                            <div style={{
                                display:'flex',flexDirection:'row',width:'100%',height:'60px',marginTop:'10px'
                            }}>
                                <div style={{
                                    display:'flex',justifyContent:'center',alignItems:'center',height:'100%',width:'50%'
                                }}>
                                    <p style={{
                                        display:'flex',width:'60px',height:'40px',backgroundColor:CONFIG.cellBgColorBlueMiddle,
                                        color:'white',justifyContent:'center',alignItems:'center'
                                    }} onClick={()=>{
                                        this.setState({
                                            isShowPoint:false
                                        })
                                        this.props.confirm();
                                    }}>确定</p>
                                </div>
                                <div style={{
                                    display:'flex',justifyContent:'center',alignItems:'center',height:'100%',flex:'1'
                                }}>
                                    <p style={{
                                        display:'flex',width:'60px',height:'40px',backgroundColor:CONFIG.cellBgColorBlueMiddle,
                                        color:'white',justifyContent:'center',alignItems:'center'
                                    }} onClick={()=>{
                                        this.setState({
                                            isShowPoint:false
                                        })
                                        this.props.cancel();
                                    }}>取消</p>
                                </div>
                            </div>
                        </div>
                        : null
                }
            </div>
        )
    }
}