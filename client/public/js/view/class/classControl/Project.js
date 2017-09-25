/**
 * Created by jiangsong on 2017/9/25.
 */
import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as ProjectActions from '../actions/classActions/projectAction';

class Project extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        const {projectNum,projectAdd,location} = this.props;
        let projectID = location.pathname.split('/').pop();
        return(
            <div>
                <p>这是项目啊，你知道吗？</p>
                <p>{`这是项目编号：${projectID}`}</p>
            </div>
        )
    }
}

const mapStateToProps = (state)=>{
    return {
        projectNum:state.projectReducer.projectNum
    }
}
const mapDispatchToProps = (dispatch)=>{
    return bindActionCreators(ProjectActions,dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(Project);