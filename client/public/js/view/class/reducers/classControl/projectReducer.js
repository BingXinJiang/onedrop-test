/**
 * Created by jiangsong on 2017/9/25.
 */
import { PROJECT_ADD_TYPE,
    PROJECT_COMPANY_DETAIL,
    PROJECT_COMPANY_ALL,
    PROJECT_ADD_SHOW,
    PROJECT_ADD_DETAIL_PRE,
    PROJECT_ADD_DETAIL_DONE
} from '../../actionTypes';

const projectReducer = (state = {projectNum:5,
    company:null,
    projects:[],
    isShowAdd:false,
    isLoading:false
}, action) => {
    switch (action.type) {
        case PROJECT_ADD_TYPE:
            return Object.assign({},state,{projectNum:state.projectNum+1});
            break;
        case PROJECT_COMPANY_DETAIL:
            return Object.assign({},state,{
                company:action.company
            });
            break;
        case PROJECT_COMPANY_ALL:
            return Object.assign({},state,{
                projects:action.projects
            });
            break;
        case PROJECT_ADD_SHOW:
            return Object.assign({},state,{
                isShowAdd:action.isShowAdd
            });
            break;
        case PROJECT_ADD_DETAIL_PRE:
            return Object.assign({},state,{
                isLoading:true
            });
            break;
        case PROJECT_ADD_DETAIL_DONE:
            return Object.assign({},state,{
                isLoading:false,
                isShowAdd:false,
                projects:action.projects
            });
            break;
        default:
            return state;
    }
}

export default projectReducer;