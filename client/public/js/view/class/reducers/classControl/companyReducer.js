/**
 * Created by jiangsong on 2017/9/25.
 */
import { COMPANY_ADD_TYPE } from '../../actionTypes';

const companyReducer = (state = {companyNum:7}, action) => {
    switch (action.type) {
        case COMPANY_ADD_TYPE:
            return Object.assign({},state,{companyNum:state.companyNum+1});
        default:
            return state;
    }
}

export default companyReducer;