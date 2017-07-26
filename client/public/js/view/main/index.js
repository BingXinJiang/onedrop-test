/**
 * Created by Administrator on 2017/3/29 0029.
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

import Answer from '../answer/Answer';
import Course from '../course/Course';
import CourseCommit from '../course/CourseCommit';
import CourseLabel from '../course/CourseLabel';
import Label from '../label/Label';
import AddLabel from '../label/AddLabel';
import Question from '../question/Question';
import Rank from '../rank/Rank';
import Teacher from '../teacher/Teacher';
import AddTeacher from '../teacher/AddTeacher';
import Comment from '../comment/Comment';

class MainPage extends React.Component{
    constructor(props){
        super(props);
    }

    componentDidMount() {

    }
    render(){
        const layoutStyle = {
            width:'120px',height:'31px',backgroundColor:'#333',borderRadius:'6px',
            margin:'16px 28px 16px 0',float:'left'
        }
        return (
            <div style={{width:'100%'}}>
                <Layout>
                    <Header className="header">
                        <div style={{...layoutStyle}} className="logo" />
                        <Menu
                            theme="dark"
                            mode="horizontal"
                            defaultSelectedKeys={['2']}
                            style={{ lineHeight: '64px' }}
                        >
                            <Menu.Item key="1">nav 1</Menu.Item>
                            <Menu.Item key="2">nav 2</Menu.Item>
                            <Menu.Item key="3">nav 3</Menu.Item>
                        </Menu>
                    </Header>
                    <Content style={{ padding: '0 50px' }}>
                        <Breadcrumb style={{ margin: '12px 0' }}>
                            <Breadcrumb.Item>Home</Breadcrumb.Item>
                            <Breadcrumb.Item>List</Breadcrumb.Item>
                            <Breadcrumb.Item>App</Breadcrumb.Item>
                        </Breadcrumb>
                        <Layout style={{ padding: '24px 0', background: '#fff' }}>
                            <Sider width={200} style={{ background: '#fff' }}>
                                <Menu
                                    mode="inline"
                                    defaultSelectedKeys={['1']}
                                    defaultOpenKeys={['sub1']}
                                    style={{ height: '100%' }}
                                >
                                    <SubMenu key="sub1" title={<span><Icon type="book" />课程</span>}>
                                        <Menu.Item key="1"><Link to="/main/course">所有课程</Link></Menu.Item>
                                        <Menu.Item key="2"><Link to="/main/course_commit">提交课程</Link></Menu.Item>
                                        <Menu.Item key="3"><Link to="/main/course_label">课程标签</Link></Menu.Item>
                                    </SubMenu>
                                    <SubMenu key="sub2" title={<span><Icon type="laptop" />标签</span>}>
                                        <Menu.Item key="5"><Link to="/main/label">所有标签</Link></Menu.Item>
                                        <Menu.Item key="6"><Link to="/main/add_label">增加标签</Link></Menu.Item>
                                    </SubMenu>
                                    <SubMenu key="sub3" title={<span><Icon type="notification" />排行</span>}>
                                        <Menu.Item key="9"><Link to="/main/rank">所有排行</Link></Menu.Item>
                                    </SubMenu>
                                    <SubMenu key="sub4" title={<span><Icon type="notification" />问题</span>}>
                                        <Menu.Item key="13"><Link to="/main/question">所有问题</Link></Menu.Item>
                                    </SubMenu>
                                    <SubMenu key="sub5" title={<span><Icon type="notification" />答案</span>}>
                                        <Menu.Item key="17"><Link to="/main/answer">所有答案</Link></Menu.Item>
                                    </SubMenu>
                                    <SubMenu key="sub6" title={<span><Icon type="notification" />老师</span>}>
                                        <Menu.Item key="21"><Link to="/main/teacher">所有老师</Link></Menu.Item>
                                        <Menu.Item key="22"><Link to="/main/add_teacher">增加老师</Link></Menu.Item>
                                    </SubMenu>
                                    <SubMenu key="sub7" title={<span><Icon type="notification" />留言</span>}>
                                        <Menu.Item key="26"><Link to="/main/comment">所有留言</Link></Menu.Item>
                                    </SubMenu>
                                </Menu>
                            </Sider>
                            <Content style={{ padding: '0 24px', minHeight: 280 }}>
                                <Route path="/main/answer" component={Answer}></Route>
                                <Route path="/main/course" component={Course}></Route>
                                <Route path="/main/course_commit" component={CourseCommit}></Route>
                                <Route path="/main/course_label" component={CourseLabel}></Route>
                                <Route path="/main/label" component={Label}></Route>
                                <Route path="/main/add_label" component={AddLabel}></Route>
                                <Route path="/main/question" component={Question}></Route>
                                <Route path="/main/rank" component={Rank}></Route>
                                <Route path="/main/teacher" component={Teacher}></Route>
                                <Route path="/main/add_teacher" component={AddTeacher}></Route>
                                <Route path="/main/comment" component={Comment}></Route>
                            </Content>
                        </Layout>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>
                        cvwisdom.com ©2016 Created by 云谷慧
                    </Footer>
                </Layout>
            </div>
        )
    }
}

ReactDOM.render(
    <Router>
        <MainPage/>
    </Router>
    ,
    document.getElementById('main-container')
)