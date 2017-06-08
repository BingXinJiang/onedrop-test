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
        $('#first').bind('click', function () {
            console.log('点击了')
        })
    }
    render(){
        return (
            <div>
                <Button id="first">这是WeUI的按钮</Button>
            </div>
        )
    }
}

ReactDOM.render(
    <MainPage/>,
    document.getElementById('main-container')
)