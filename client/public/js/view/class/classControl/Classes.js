/**
 * Created by jiangsong on 2017/9/25.
 */
import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as ClassActions from '../actions/classActions/classAction';
import { Table } from 'antd';
import Loading from '../views/Loading';
import AddClass from './AddClass';
import CONFIG from '../../../const/BackConfig';

const columns = [
    {
        title:'班级ID',
        dataIndex:'class_id'
    },
    {
        title:'班级名称',
        dataIndex:'class_name'
    },
    {
        title:'班级logo',
        dataIndex:'class_logo'
    },
    {
        title:'班级简介',
        dataIndex:'class_intro'
    },
    {
        title:'班级人数',
        dataIndex:'class_num'
    },
    {
        title:'开放日期',
        dataIndex:'open_date'
    },
    {
        title:'项目ID',
        dataIndex:'project_id'
    },
    {
        title:'班级密码',
        dataIndex:'access_code'
    },
]

class ClassTable extends React.Component{
    constructor(props){
        super(props);
    }
    static propTypes = {
        pclasses:React.PropTypes.array,
        callback:React.PropTypes.func
    }
    render(){
        const {pclasses} = this.props;
        let newClasses = [];
        pclasses.map((con,idx)=>{
            con.key = idx+'';
            newClasses.push(con);
        })
        return(
            <div style={{marginTop:'30px'}}>
                <div style={{width:'100%',display:'flex',justifyContent:'flex-end'}}>
                    <div style={{width:'90px',height:'60px',borderRadius:'7px',backgroundColor:CONFIG.cellBgColorBlueHeight,
                        display:'flex',justifyContent:'center',alignItems:'center',marginRight:'70px'
                    }} onClick={this.props.callback}>
                        <p style={{fontSize:'16px',color:'white'}}>添加班级</p>
                    </div>
                </div>
                <Table style={{marginTop:'30px'}} columns={columns} dataSource={newClasses}/>
            </div>
        )
    }
}

class Classes extends React.Component{
    constructor(props){
        super(props);
        this.projectID = 0;
    }
    showAdd(isShow){
        const {addShow} = this.props;
        addShow(isShow);
    }
    addClass(isAdd,pclass){
        const {fetchAddClass} = this.props;
        if(isAdd === 'add'){
            pclass.project_id = this.projectID;
            fetchAddClass(pclass);
        }
        if(isAdd === 'cancel'){
            this.showAdd(false);
        }
    }
    componentWillMount(){
        this.projectID = location.pathname.split('/').pop();
    }
    componentDidMount(){
        const {fetchAllClasses} = this.props;
        fetchAllClasses(this.projectID);
    }
    render(){
        const {isLoading,pclasses,isShowAdd} = this.props;
        return(
            <div>
                <ClassTable pclasses={pclasses} callback={this.showAdd.bind(this)}/>
                {
                    isShowAdd ? <AddClass callback={this.addClass.bind(this)}/> : null
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
        classNum:state.classReducer.classNum,
        isLoading:state.classReducer.isLoading,
        pclasses:state.classReducer.pclasses,
        isShowAdd:state.classReducer.isShowAdd
    }
}
const mapDispatchToProps = (dispatch)=>{
    return bindActionCreators(ClassActions,dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(Classes);