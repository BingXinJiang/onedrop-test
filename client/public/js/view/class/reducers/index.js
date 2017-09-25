/**
 * Created by jiangsong on 2017/9/25.
 */
import { combineReducers } from 'redux';
import loginReducer from './login/loginReducer';
import classReducer from './classControl/classReducer';
import companyReducer from './classControl/companyReducer';
import projectReducer from './classControl/projectReducer';

export default combineReducers({
    loginReducer,
    classReducer,
    companyReducer,
    projectReducer
})