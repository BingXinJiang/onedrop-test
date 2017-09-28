/**
 * Created by jiangsong on 2017/9/28.
 */
import React from 'react';
import { Upload, Icon, message } from 'antd';

function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

function beforeUpload(file) {
    const isJPG = file.type === 'image/jpeg';
    if (!isJPG) {
        message.error('You can only upload JPG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    return isJPG && isLt2M;
}

export default class Avator extends React.Component {
    state = {};

    static propTypes = {
        callback:React.PropTypes.func,
        upUrl:React.PropTypes.string
    }

    handleChange = (info) => {
        if (info.file.status === 'done') {
            // console.log('info.file.name:',info.file.name);
            this.props.callback(info.file.name);
            getBase64(info.file.originFileObj, imageUrl => {
                // console.log('imageUrl:',imageUrl);
                this.setState({ imageUrl })
            });
        }
    }

    render() {
        const imageUrl = this.state.imageUrl;
        return (
            <Upload
                className="avatar-uploader"
                name="avatar"
                showUploadList={false}
                action={this.props.upUrl}
                beforeUpload={beforeUpload}
                onChange={this.handleChange}
            >
                {
                    imageUrl ?
                        <img src={imageUrl} alt="" className="avatar" /> :
                        <Icon type="plus" className="avatar-uploader-trigger" />
                }
            </Upload>
        );
    }
}