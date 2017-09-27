/**
 * Created by jiangsong on 2017/9/25.
 */

import React from 'react';
import {Route, Link} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as CompanyActions from '../actions/classActions/companyAction';
import CONFIG from '../../../const/BackConfig';
import AddCompany from './AddCompany';
import Loading from '../views/Loading';

class Cell extends React.Component{
    constructor(props){
        super(props);
    }

    static propTypes = {
        companyID:React.PropTypes.number,
        companyName:React.PropTypes.string,
        companyLog:React.PropTypes.string,
        companyIntro:React.PropTypes.string
    }

    render(){
        const {companyID,companyName,companyLog,companyIntro} = this.props;
        return(
            <Link style={{display:'block',width:'250px',height:'300px',
                padding:'10px'
            }} to={`/main/company/project/${companyID}`}>
                <div style={{
                    width:'100%',height:'100%',fontSize:CONFIG.wordSize,display:'flex',justifyContent:'center',
                    color:CONFIG.wordColorBgBlue,alignItems:'center',backgroundColor:CONFIG.cellBgColorBlueLight,
                    backgroundImage:'url('+companyLog+')',backgroundSize:'100% 100%',flexDirection:'column'
                }}>
                    <p>{companyName}</p>
                    <p style={{marginTop:'10px',fontSize:'14px'}}>{companyIntro}</p>
                </div>
            </Link>
        )
    }
}


class Company extends React.Component{
    constructor(props){
        super(props);
    }
    showAdd(isShow){
        const {showAdd} = this.props;
        showAdd(isShow);
    }
    addCompany(isAdd,company){
        const {fetchAddCompany} = this.props;
        if(isAdd === 'cancel'){
            this.showAdd(false);
        }
        if(isAdd === 'add'){
            fetchAddCompany(company);
        }
    }
    componentDidMount(){
        const {fetchAllCompany} = this.props;
        fetchAllCompany();
    }
    render(){
        const {companys,isShowAdd,isLoading} = this.props;
        return(
            <div>
                <div style={{display:'flex',flexWrap:'wrap'}}>
                    {
                        companys.map((company,idx)=><Cell key={idx}
                                                          companyID={company.company_id}
                                                          companyLog={company.company_log}
                                                          companyIntro={company.company_intro}
                                                          companyName={company.company_name}/>)
                    }
                    <div style={{display:'block',width:'250px',height:'300px',padding:'10px'
                    }}>
                        <div style={{
                            width:'100%',height:'100%',fontSize:'72px',display:'flex',justifyContent:'center',
                            color:CONFIG.wordColorBgBlue,alignItems:'center',backgroundColor:CONFIG.cellBgColorBlueLight,
                        }} onClick={this.showAdd.bind(this,true)}>
                            +
                        </div>
                    </div>
                </div>
                {
                    isShowAdd ? <AddCompany callback={this.addCompany.bind(this)}/> : null
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
        companyNum:state.companyReducer.companyNum,
        companys:state.companyReducer.companys,
        isShowAdd:state.companyReducer.isShowAdd,
        isLoading:state.companyReducer.isLoading
    }
}
const mapDispatchToProps = (dispatch)=>{
    return bindActionCreators(CompanyActions,dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(Company);