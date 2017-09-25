/**
 * Created by jiangsong on 2017/9/25.
 */

import React from 'react';
import {Route, Link} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as CompanyActions from '../actions/classActions/companyAction';

class Company extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        const {companyNum,companyAdd} = this.props;
        return(
            <div>
                <Link to={`/main/company/project/${companyNum}`}>去项目</Link>
            </div>
        )
    }
}

const mapStateToProps = (state)=>{
    return {
        companyNum:state.companyReducer.companyNum
    }
}
const mapDispatchToProps = (dispatch)=>{
    return bindActionCreators(CompanyActions,dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(Company);