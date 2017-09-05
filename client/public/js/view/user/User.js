/**
 * Created by jiangsong on 2017/7/28.
 */
import React from 'react';
import {
    Button
} from 'antd';
import {
    observable,computed,action
} from 'mobx';
import {
    observer
} from 'mobx-react';
import BACK from '../../const/BackControll';

class downData {

    @observable
    downUrl = '';

    @observable
    title = '';

    constructor(title,downUrl){
        this.downUrl = downUrl;
        this.title = title;
    }
}

@observer
class DownCell extends React.Component{
    constructor(props){
        super(props);
    }
    fetchFile(data){
        window.open(data.downUrl);
    }
    render(){
        const {data} = this.props;
        return(
            <div style={{
                width:'100%',display:'flex',flexDirection:'row',justifyContent:'space-between',alignItems:'center',
                height:'90px'
            }}>
                <div><p style={{fontSize:'16px'}}>{data.title}</p></div>
                <Button onClick={this.fetchFile.bind(this,data)} type="primary" icon="download" size='large'>
                    下载
                </Button>
            </div>
        )
    }
}


@observer
export default class User extends React.Component{
    constructor(props){
        super(props);
    }


    render(){
        var item1 = new downData('用户个人信息',BACK.base_ip+'/userdown/user');
        var item2 = new downData('用户个人积分和能量值',BACK.base_ip+'/userdown/fraction');
        var item3 = new downData('用户个人信息和积分能量值',BACK.base_ip+'/userdown/user_value');
        var items = [item1,item2,item3];
        return(
            <div>
                <div style={{
                    width:'100%'
                }}>
                    {
                        items.map((data,idx)=>{
                            return <DownCell key={idx} data={data}/>
                        })
                    }
                </div>
            </div>
        )
    }
}