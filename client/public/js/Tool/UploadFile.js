/**
 * Created by jiangsong on 2017/7/25.
 */

import React from 'react';
import { Upload, Button, Icon, message } from 'antd';
import reqwest from 'reqwest';

export default class UploadFile extends React.Component{
    constructor(props){
        super(props);
        this.state={
            fileList: [],
            uploading: false
        }
        this.handleUpload = this.handleUpload.bind(this);
    }
    handleUpload(){
        const { fileList } = this.state;
        const formData = new FormData();
        fileList.forEach((file) => {
            formData.append('files[]', file);
        });

        this.setState({
            uploading: true,
        });

        reqwest({
            url: 'http://192.168.1.37:3300/upload/file',
            method: 'post',
            processData: false,
            data: formData,
            contentType:'multipart/form-data',
            success: () => {
                this.setState({
                    fileList: [],
                    uploading: false,
                });
                message.success('upload successfully.');
            },
            error: () => {
                this.setState({
                    uploading: false,
                });
                message.error('upload failed.');
            },
        });
    }
    render(){
        const { uploading } = this.state;
        const props = {
            action: 'http://192.168.1.37:3300/upload/file',
            onRemove: (file) => {
                this.setState(({ fileList }) => {
                    const index = fileList.indexOf(file);
                    const newFileList = fileList.slice();
                    newFileList.splice(index, 1);
                    return {
                        fileList: newFileList,
                    };
                });
            },
            beforeUpload: (file) => {
                this.setState(({ fileList }) => ({
                    fileList: [...fileList, file],
                }));
                return false;
            },
            fileList: this.state.fileList,
        };
        return(
            <div>
                <Upload {...props}>
                    <Button>
                        <Icon type="upload" /> Select File
                    </Button>
                </Upload>
                <Button
                    className="upload-demo-start"
                    type="primary"
                    onClick={this.handleUpload}
                    disabled={this.state.fileList.length === 0}
                    loading={uploading}
                >
                    {uploading ? 'Uploading' : 'Start Upload' }
                </Button>
            </div>
        )
    }
}