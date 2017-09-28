/**
 * Created by jiangsong on 2017/9/25.
 */
import { CLASS_ADD_TYPE,
    CLASS_GET_ALL_PRE,
    CLASS_GET_ALL_DONE,
    CLASS_ADD_SHOW,
    CLASS_ADD_DETAIL_PRE,
    CLASS_ADD_DETAIL_DONE
} from '../../actionTypes';

const classReducer = (state = {classNum:5,
    isLoading:false,
    pclasses:[],
    isShowAdd:false
}, action) => {
    switch (action.type) {
        case CLASS_ADD_TYPE:
            return Object.assign({},state,{classNum:state.classNum+1});
            break;
        case CLASS_GET_ALL_PRE:
            return Object.assign({},state,{
                isLoading:true
            });
            break;
        case CLASS_GET_ALL_DONE:
            return Object.assign({},state,{
                isLoading:false,
                pclasses:action.pclasses
            });
            break;
        case CLASS_ADD_SHOW:
            return Object.assign({},state,{
                isShowAdd:action.isShowAdd
            });
            break;
        case CLASS_ADD_DETAIL_PRE:
            return Object.assign({},state,{
                isLoading:true
            });
            break;
        case CLASS_ADD_DETAIL_DONE:
            return Object.assign({},state,{
                isLoading:false,
                isShowAdd:false,
                pclasses:action.pclasses
            });
            break;
        default:
            return state;
    }
}

export default classReducer;