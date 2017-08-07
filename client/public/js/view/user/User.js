/**
 * Created by jiangsong on 2017/7/28.
 */
import React from 'react';
import {
    Button
} from 'antd';
import {
    observable
} from 'mobx';
import {
    observer
} from 'mobx-react';


const titles = ['Eat','Drink','Think'];

class Todo {

    id = `${Date.now()}${Math.floor(Math.random()*10)}`;

    @observable
    title='';

    @observable
    done = false;

    constructor(title){
        this.title = title;
    }
}

function randomTodoTitle() {
    return titles[Math.floor(Math.random()*titles.length)];
}

@observer
class TodoItem extends React.Component{

}

@observer
export default class User extends React.Component{
    constructor(props){
        super(props);

    }


    render(){
        return(
            <div>
                <div style={{
                    width:'100%'
                }}>
                    <div style={{
                        width:'100%',display:'flex',flexDirection:'row',justifyContent:'space-between',alignItems:'center',
                        height:'90px'
                    }}>
                        <div><p style={{fontSize:'18px'}}>用户的个人信息</p></div>
                        <Button type="primary" icon="download" size='large'>Download</Button>
                    </div>

                    <div>

                    </div>

                </div>
            </div>
        )
    }
}