/**
 * Created by jiangsong on 2017/9/25.
 */
import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as ClassActions from '../actions/classActions/classAction';

class Classes extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div>这是班级！</div>
        )
    }
}

const mapStateToProps = (state)=>{
    return {
        classNum:state.classReducer.classNum
    }
}
const mapDispatchToProps = (dispatch)=>{
    return bindActionCreators(ClassActions,dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(Classes);