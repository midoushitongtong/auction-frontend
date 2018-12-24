import React from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, Upload, Icon, message } from 'antd';

export default class TinymceUploadImage extends React.Component {
  static propTypes = {
    uploadImageSuccess: PropTypes.func.isRequired
  };

  state = {
    visible: false,
    fileList: []
  };

  /**
   * 显示上传文件模态框
   *
   */
  visibleUploadModel = () => {
    this.setState({
      visible: true
    });
  };

  /**
   * 验证上传文件的类型和大小
   *
   */
  uploadFileCheck = (file) => {
    if (file.type !== 'image/jpeg') {
      message.error('文件类型必须为 jpg 格式!');
      return false;
    }
    if (file.size / 1024 / 1024 > 2) {
      message.error('文件大小不能超过 2MB!');
      return false;
    }
  };

  /**
   * 上传文件发送改变
   *
   */
  uploadFileChange = (changeInfo) => {
    this.setState({
      fileList: changeInfo.fileList
    });
    switch (changeInfo.file.status) {
      case 'uploading':
        console.log('uploading...');
        break;
      case 'done':
        console.log('done...');
        break;
      default:
    }
  };

  /**
   * 上传图片确认按钮
   *
   */
  handleOk = () => {
    const { props, state } = this;
    // 回调上传图片成功
    props.uploadImageSuccess(state.fileList.filter(item => item.status === 'done'));
    // 隐藏上传模态框, 清空已上传文件
    this.setState({
      visible: false,
      fileList: []
    });
  };

  /**
   * 上传图片取消按钮
   *
   */
  handleCancel = () => {
    // 隐藏上传模态框, 清空已上传文件
    this.setState({
      visible: false,
      fileList: []
    });
  };

  render() {
    const { state } = this;
    return (
      <section className="tinymce-editor-image-container">
        <Button
          className="editor-upload-btn"
          type="primary"
          onClick={() => this.visibleUploadModel()}
        >上传图片</Button>
        {/* 上传文件模态框 */}
        <Modal
          title="上传图片"
          okText="保存"
          cancelText="取消"
          visible={state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          maskClosable={false}
        >
          <Upload
            action="https://httpbin.org/post"
            className="avatar-uploader"
            name="previewImage"
            listType="picture-card"
            fileList={state.fileList}
            showUploadList={{
              showPreviewIcon: false
            }}
            beforeUpload={this.uploadFileCheck}
            onChange={this.uploadFileChange}
          >
            <div>
              <Icon type="plus"/>
              <div className="ant-upload-text">选择图片</div>
            </div>
          </Upload>
        </Modal>
      </section>
    );
  };
}
