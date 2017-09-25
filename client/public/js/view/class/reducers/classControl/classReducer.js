/**
 * Created by jiangsong on 2017/9/25.
 */
import { CLASS_ADD_TYPE } from '../../actionTypes';

const classReducer = (state = {classNum:5}, action) => {
    switch (action.type) {
        case CLASS_ADD_TYPE:
            return Object.assign({},state,{classNum:state.classNum+1});
        default:
            return state;
    }
}

export default classReducer;