/**
 * Created by jiangsong on 2017/9/22.
 */

var React = require('react');
var ReactDOM = require('react-dom');

import { Layout, Menu, Breadcrumb, Icon } from 'antd';
const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';

import Company from './classControl/Company';
import Publish from './contentPublish/Publish';
import Project from './classControl/Project';
import Classes from './classControl/Classes';

export default class Class extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <Content style={{ padding: '0 50px' }}>
                <Layout style={{ padding: '24px 0', background: '#fff' }}>
                    <Content style={{ padding: '0 24px', minHeight: 280 }}>
                        <Route path='/main/company/2' component={Company}/>
                        <Route path='/main/company/project/:companyID' component={Project}/>
                        <Route path='/main/company/classes/:projectID' component={Classes}/>
                        <Route path='/main/company/3' component={Publish}/>
                    </Content>
                </Layout>
            </Content>
        )
    }
}