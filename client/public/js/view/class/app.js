/**
 * Created by jiangsong on 2017/9/25.
 */
import React from 'react';
import {Provider} from 'react-redux';
import configStore from './store/configStore';
import Class from './class';

const preloadedState = window.__PRELOADED_STATA__;
const store = configStore(preloadedState);

export default class App extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <Provider store={store}>
                <Class selected={this.props.selected}/>
            </Provider>
        )
    }
}