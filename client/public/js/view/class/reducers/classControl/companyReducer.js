/**
 * Created by jiangsong on 2017/9/25.
 */
import { COMPANY_ADD_TYPE,COMPANY_GET_ALL,
    COMPANY_ADD_SHOW,
    COMPANY_ADD_DETAIL_PRE,
    COMPANY_ADD_DETAIL_DONE
} from '../../actionTypes';

const companyReducer = (state = {
    companyNum:0,
    companys:[],
    isShowAdd:false,
    isLoading:false,

}, action) => {
    switch (action.type) {
        case COMPANY_ADD_TYPE:
            return Object.assign({},state,{companyNum:state.companyNum+1});
            break;
        case COMPANY_GET_ALL:
            return Object.assign({},state,{companys:action.companys});
            break;
        case COMPANY_ADD_SHOW:
            return Object.assign({},state,{isShowAdd:action.isShowAdd});
            break;
        case COMPANY_ADD_DETAIL_PRE:
            return Object.assign({},state,{
                isLoading:true
            });
            break;
        case COMPANY_ADD_DETAIL_DONE:
            return Object.assign({},state,{
                isLoading:false,
                isShowAdd:false,
                companys:action.companys
            })
        default:
            return state;
    }
}

export default companyReducer;