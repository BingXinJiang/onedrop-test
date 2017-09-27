/**
 * Created by jiangsong on 2017/9/25.
 */
import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as ProjectActions from '../actions/classActions/projectAction';
import CONFIG from '../../../const/BackConfig';
import { Table } from 'antd';
import AddProject from './AddProject';
import Loading from '../views/Loading';

class Company extends React.Component{
    constructor(props){
        super(props);
    }
    static propTpyes = {
        company:React.PropTypes.object
    }
    render(){
        const {company} = this.props;
        return (
            <div style={{display:'flex',justifyContent:'center',alignItems:'center',flex:'1',
                backgroundColor:CONFIG.bgColorGrayLight
            }}>
                <img style={{width:'250px',height:'300px',marginRight:'20px'}}
                     src={company.company_log}
                />
                <div style={{width:'250px',height:'300px',display:'flex',flexDirection:'column'}}>
                    <p style={{fontSize:'18px',marginTop:'10px'}}>企业：{company.company_name}</p>
                    <p style={{fontSize:'16px',marginTop:'10px'}}>简介：{company.company_intro}</p>
                </div>
            </div>
        )
    }
}

const columns = [
    {
        title:'项目ID',
        dataIndex:'project_id'
    },
    {
        title:'项目名称',
        dataIndex:'project_name'
    },
    {
        title:'项目介绍',
        dataIndex:'project_intro'
    },
    {
        title:'开放时间',
        dataIndex:'open_date'
    }
]

class ProjectTable extends React.Component{
    constructor(props){
        super(props);
    }
    static propTypes = {
        projects:React.PropTypes.array,
        callback:React.PropTypes.func
    }

    render(){
        const {projects} = this.props;
        return (
            <div style={{marginTop:'30px'}}>
                <div style={{width:'100%',display:'flex',justifyContent:'flex-end'}}>
                    <div style={{width:'90px',height:'60px',borderRadius:'7px',backgroundColor:CONFIG.cellBgColorBlueHeight,
                        display:'flex',justifyContent:'center',alignItems:'center',marginRight:'70px'
                    }} onClick={this.props.callback}>
                        <p style={{fontSize:'16px',color:'white'}}>添加项目</p>
                    </div>
                </div>
                <Table style={{marginTop:'30px'}} columns={columns} dataSource={projects} size="middle" />
            </div>
        )
    }
}

class Project extends React.Component{
    constructor(props){
        super(props);
        this.companyID = 0;
    }
    showAdd(isShow){
        const {addShow} = this.props;
        addShow(isShow);
    }
    callAdd(){
        this.showAdd(true);
    }
    addProject(isAdd,project){
        const {fetchAddProject} = this.props;
        if(isAdd === 'add'){
            project.company_id = this.companyID;
            fetchAddProject(project);
        }
        if(isAdd === 'cancel'){
            this.showAdd(false);
        }
    }
    componentDidMount(){
        const {fetchCompany,fetchProjects} = this.props;
        this.companyID = location.pathname.split('/').pop();
        fetchCompany(this.companyID);
        fetchProjects(this.companyID);
    }
    render(){
        const {company,projects,isShowAdd,isLoading} = this.props;
        return(
            <div>
                {
                    company ? <Company company={company}/> : null
                }
                <ProjectTable projects={projects} callback={this.callAdd.bind(this)}/>
                {
                    isShowAdd ? <AddProject callback={this.addProject.bind(this)}/> : null
                }
                {
                    isLoading ? <Loading/> : null
                }
            </div>
        )
    }
}

const mapStateToProps = (state)=>{
    return {
        projectNum:state.projectReducer.projectNum,
        company:state.projectReducer.company,
        projects:state.projectReducer.projects,
        isShowAdd:state.projectReducer.isShowAdd,
        isLoading:state.projectReducer.isLoading
    }
}
const mapDispatchToProps = (dispatch)=>{
    return bindActionCreators(ProjectActions,dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(Project);