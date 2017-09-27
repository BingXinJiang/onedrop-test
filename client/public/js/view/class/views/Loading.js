/**
 * Created by jiangsong on 2017/9/27.
 */
import React from 'react';
import CONFIG from '../../../const/BackConfig';

export default class Loading extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div style={{
                position:'absolute',width:CONFIG.WindowWidth,height:CONFIG.WindowHeight,backgroundColor:'rgba(0,0,0,0)',
                display:'flex',justifyContent:'center',alignItems:'center'
            }}>
                <img src="../../../../img/tool/loading.gif"/>
            </div>
        )
    }
}