/**
 * Created by jiangsong on 2017/9/29.
 */
import React from 'react';
import CONFIG from '../../const/BackConfig';
import BACK from '../../const/BackControll';
import Avator from '../class/views/Avator';

const CHAPTER_LEFT = '120px';
const TEXT_LEFT = '80px';
const AddContainerStyle = {
    width:'100%',display:'flex',flexDirection:'row',marginTop:'10px',height:'60px',justifyContent:'center',
    alignItems:'center'
}
const AddStyle = {
    width:'90px',height:'50px',fontSize:CONFIG.wordSize,backgroundColor:CONFIG.cellBgColorBlueMiddle,
    display:'flex',justifyContent:'center',alignItems:'center',color:'white',
}
const ContainerStyle = {
    width:'100%',display:'flex',flexDirection:'column',borderStyle:'solid',borderWidth:'1px',borderColor:'black'
}
const TitleContainerStyle = {
    width:'100%',display:'flex',flexDirection:'row',marginTop:'30px'
}
const TitleStyle = {
    width:CHAPTER_LEFT,display:'flex',justifyContent:'flex-end',alignItems:'center'
}
const InputContainerStyle = {
    display:'flex',flex:'1',justifyContent:'flex-start',alignItems:'center'
}
const TextContainerStyle = {
    width:'100%',display:'flex',flexDirection:'row',marginTop:'30px',flex:'1'
}
const TextareaStyle = {
    fontSize:CONFIG.wordSize,width:'80%',height:'70px'
}
const InputStyle = {
    fontSize:CONFIG.wordSize,width:'80%'
}
const TextStyle = {
    width:TEXT_LEFT,display:'flex',justifyContent:'flex-end',alignItems:'center'
}

const COURSE = {
    text:[
        {
            title:'',
            text:[
                {
                    text:'',
                    htext:[]
                }
            ]
        }
    ],
    image:[

    ],
    htext:[]
}

class TextCon extends React.Component{
    constructor(props){
        super(props);
        this.imgName = null;
    }
    static propTypes = {
        chapter:React.PropTypes.number,
        section:React.PropTypes.number
    }
    handleImgBack(imgName){
        this.imgName = '/images/courses/detail/' + imgName;
    }
    confirmText(){
        const {chapter,section} = this.props;
        let text = this.refs[`course_content_chapter_${chapter}_section_${section}_text`].value.trim();
        let htext = this.refs[`course_content_chapter_${chapter}_section_${section}_htext`].value.trim();
        if(!text){
            alert('请输入正文内容！');
            return;
        }
        COURSE.text[chapter].text[section].text = text;
        COURSE.text[chapter].text[section].htext[0] = htext;
        if(this.imgName){
            let img = {
                part:chapter,
                section:section,
                url:this.imgName
            }
            COURSE.image.push(img);
        }
        // console.log('COURSE:',COURSE);
    }
    render(){
        const {chapter,section} = this.props;
        return(
            <div style={{...ContainerStyle,marginTop:'20px'}}>
                <div style={{...TextContainerStyle}}>
                    <div style={{...TextStyle}}>
                        <p style={{fontSize:CONFIG.wordSize}}>正文{section+1}：&nbsp;&nbsp;</p>
                    </div>
                    <div style={{...InputContainerStyle}}>
                        <textarea ref={`course_content_chapter_${chapter}_section_${section}_text`} style={{...TextareaStyle}}/>
                    </div>
                </div>
                <div style={{...TextContainerStyle}}>
                    <div style={{...TextStyle}}>
                        <p style={{fontSize:CONFIG.wordSize}}>高亮{section+1}：&nbsp;&nbsp;</p>
                    </div>
                    <div style={{...InputContainerStyle}}>
                        <textarea ref={`course_content_chapter_${chapter}_section_${section}_htext`} style={{...TextareaStyle}}/>
                    </div>
                </div>
                <div style={{...TextContainerStyle,marginBottom:'10px'}}>
                    <div style={{...TextStyle}}>
                        <p style={{fontSize:CONFIG.wordSize}}>插图{section+1}：&nbsp;&nbsp;</p>
                    </div>
                    <div style={{...InputContainerStyle,justifyContent:'space-between'}}>
                        <Avator callback={this.handleImgBack.bind(this)} upUrl={BACK.base_ip+'/upload/img/course_detail'}/>
                        <p style={{...AddStyle,marginRight:'60px'}} onClick={this.confirmText.bind(this)}>确认</p>
                    </div>
                </div>
            </div>
        )
    }
}


class Chapter extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            texts:['1']
        }
    }
    static propTypes = {
        chapter:React.PropTypes.number
    }
    addText(){
        const {chapter} = this.props;
        var newTexts = this.state.texts;
        newTexts.push('1');
        this.setState({
            texts:newTexts
        });
        let section = {
            text:'',
            htext:[]
        }
        COURSE.text[chapter].text[newTexts.length-1] = section;
    }
    confirmTitle(){
        const {chapter} = this.props;
        let title = this.refs[`course_content_chapter_${chapter}_title`].value.trim();
        COURSE.text[chapter].title = title;
    }
    render(){
        const {chapter} = this.props;
        return(
            <div style={{...ContainerStyle,marginTop:'30px'}}>
                <div style={{...TitleContainerStyle}}>
                    <div style={{...TitleStyle}}>
                        <p style={{fontSize:CONFIG.wordSize}}>段落{chapter+1}标题：&nbsp;&nbsp;</p>
                    </div>
                    <div style={{...InputContainerStyle,flexDirection:'row'}}>
                        <input ref={`course_content_chapter_${chapter}_title`} style={{...InputStyle,flex:'1'}}/>
                        <p style={{...AddStyle,height:'30px',fontSize:'14px',marginRight:'30px',marginLeft:'30px'}}
                           onClick={this.confirmTitle.bind(this)}>
                            确认段落
                        </p>
                    </div>
                </div>
                <div style={{...TitleContainerStyle}}>
                    <div style={{...TitleStyle,alignItems:'flex-start'}}>
                        <p style={{fontSize:CONFIG.wordSize}}>段落{chapter+1}正文：&nbsp;&nbsp;</p>
                    </div>
                    <div style={{...InputContainerStyle,flexDirection:'column'}}>
                        {
                            this.state.texts.map((con,idx)=>{
                                return <TextCon key={idx} chapter={chapter} section={idx}/>
                            })
                        }
                        <div style={{...AddContainerStyle}}>
                            <p style={{...AddStyle}} onClick={this.addText.bind(this)}>增加正文</p>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}
const BtnStyle = {
    width:'60px',height:'60px',display:'flex',justifyContent:'center',fontSize:CONFIG.wordSize,
    alignItems:'center',backgroundColor:CONFIG.cellBgColorBlueMiddle,color:CONFIG.wordColorBgBlue
}
export default class Content extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            chapters:['1']
        }
    }
    static propTypes = {
        callback:React.PropTypes.func
    }
    addChapter(){
        let newChapters = this.state.chapters;
        newChapters.push('1');
        this.setState({
            chapters:newChapters
        });
        let chapter = {
            title:'',
            text:[
                {
                    text:'',
                    htext:[]
                }
            ]
        }
        COURSE.text[newChapters.length-1] = chapter;
    }
    handleCallback(isDone){
        if(isDone === 'done'){
            this.props.callback('done',JSON.stringify(COURSE));
        }
        if(isDone === 'cancel'){
            this.props.callback('cancel');
        }
    }
    render(){
        return(
            <div style={{width:'100%',backgroundColor:'rgba(0,0,0,0.5)', display:'flex',justifyContent:'center',
                position:'absolute',left:'0',top:'0'
            }}>
                <div style={{width:'900px',marginTop:'60px',backgroundColor:CONFIG.bgColorGrayLight}}>
                    {
                        this.state.chapters.map((con,idx)=>{
                            return <Chapter key={idx} chapter={idx}/>
                        })
                    }
                    <div style={{...AddContainerStyle}}>
                        <p style={{...AddStyle}} onClick={this.addChapter.bind(this)}>增加段落</p>
                    </div>
                    <div style={{width:'100%',marginTop:'50px',display:'flex',flexDirection:'row',justifyContent:'center',
                        alignItems:'center'
                    }}>
                        <p style={{...BtnStyle,marginRight:'30px'}} onClick={this.handleCallback.bind(this,'cancel')}>取消</p>
                        <p style={{...BtnStyle,width:'120px',marginLeft:'30px'}} onClick={this.handleCallback.bind(this,'done')}>添加文章正文</p>
                    </div>
                </div>
            </div>
        )
    }
}