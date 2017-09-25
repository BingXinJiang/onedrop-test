/**
 * Created by jiangsong on 2017/9/25.
 */
import { PROJECT_ADD_TYPE } from '../../actionTypes';

const projectReducer = (state = {projectNum:5}, action) => {
    switch (action.type) {
        case PROJECT_ADD_TYPE:
            return Object.assign({},state,{projectNum:state.projectNum+1});
        default:
            return state;
    }
}

export default projectReducer;