/**
 * Created by jiangsong on 2017/9/25.
 */
import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as LoginActions from '../actions/loginAction';

class Login extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        const {num,add} = this.props;
        return(
            <div>
                <p>{'当前显示数字是：'+num}</p>
                <button onClick={add}>点我点我</button>
            </div>
        )
    }
}


const mapStateToProps = (state)=>{
    return {
        num:state.loginReducer.num
    }
}
const mapDispatchToProps = (dispatch)=>{
    return bindActionCreators(LoginActions,dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(Login);