import React from 'react';
import PropTypes from 'prop-types';
import { Editor } from '@tinymce/tinymce-react';
import TinymceUploadImage from './upload-image';
import config from '../../config';
import './index.scss';

export default class Tinymce extends React.Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    initialValue: PropTypes.string.isRequired,
    onEditorChange: PropTypes.func.isRequired
  };

  state = {
    value: ''
  };

  componentDidMount = () => {
    const { props } = this;
    this.setState({
      value: props.initialValue
    });
  };

  /**
   * 文件上传成功回调
   *
   */
  appendValue = (imgHTML) => {
    const { state } = this;
    // 拼接 img 标签到富文本值得后方
    this.setState({
      value: state.value += imgHTML
    });
  };

  /**
   * 富文本的值发送改变
   *
   */
  handlerEditorChange = (value) => {
    const { props } = this;
    // 更新富文本的状态
    this.setState({
      value
    });
    // 告诉父组件值发送改变
    props.onEditorChange(value);
  };

  render() {
    const { state, props } = this;
    return (
      <section className="tinymce-container">
        <Editor
          cloudChannel="dev"
          id={props.id}
          value={state.value}
          plugins={config.TINYMCE_PLUGINS}
          toolbar={config.TINYMCE_TOOLBAR}
          onEditorChange={value => this.handlerEditorChange(value)}
          init={{
            language: 'zh_CN',
            height: 500
          }}
        />
        {/* 图片上传组件 */}
        <div className="editor-custom-btn-container">
          <TinymceUploadImage className="editor-upload-btn" appendValue={this.appendValue}/>
        </div>
      </section>
    );
  }
}
