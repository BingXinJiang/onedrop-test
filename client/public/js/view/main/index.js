/**
 * Created by Administrator on 2017/3/29 0029.
 */

var React = require('react');
var ReactDOM = require('react-dom');

var WeUI = require('react-weui');
require ('weui');
require('react-weui/lib/react-weui.min.css');
//
const {Button} = WeUI;

class MainPage extends React.Component{
    constructor(props){
        super(props);
    }

    componentDidMount() {

    }
    render(){
        return (
            <div>
                用来测试吧
            </div>
        )
    }
}

ReactDOM.render(
    <MainPage/>,
    document.getElementById('main-container')
)