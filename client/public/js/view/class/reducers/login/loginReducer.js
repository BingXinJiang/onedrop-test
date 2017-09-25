/**
 * Created by jiangsong on 2017/9/25.
 */
import { TEST_ACTION_TYPE } from '../../actionTypes';

const loginReducer = (state = {num:5}, action) => {
    switch (action.type) {
        case TEST_ACTION_TYPE:
            return Object.assign({},state,{num:state.num+1});
        default:
            return state;
    }
}

export default loginReducer;