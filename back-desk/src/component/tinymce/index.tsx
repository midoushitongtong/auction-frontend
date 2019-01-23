import React from 'react';
// @ts-ignore
import { Editor } from '@tinymce/tinymce-react';
import TinymceUploadImage from './upload-image';
import config from '../../config';
import './index.scss';

// 当前组件的类型声明
interface Props {
  initialValue: string
  onEditorChange: (value: string) => void
}

interface State {
  // 富文本的值
  value: string
}

// 当前组件类
export default class Tinymce extends React.Component<Props, State> {
  public state: State = {
    value: ''
  };

  public componentDidMount = (): void => {
    const { props } = this;
    this.setState({
      value: props.initialValue
    });
  };

  /**
   * 文件上传成功回调
   *
   */
  public appendValue = (imgHTML: string): void => {
    const { state } = this;
    // 拼接 img 标签到富文本值得后方
    this.setState({
      value: state.value + imgHTML
    });
  };

  /**
   * 富文本的值发送改变
   *
   */
  public handlerEditorChange = (value: string): void => {
    const { props } = this;
    // 更新富文本的状态
    this.setState({
      value
    });
    // 告诉父组件值发送改变
    props.onEditorChange(value);
  };

  public render = (): JSX.Element => {
    const { state } = this;
    return (
      <section className="tinymce-container">
        <Editor
          cloudChannel="dev"
          value={state.value}
          plugins={config.TINYMCE_PLUGINS}
          toolbar={config.TINYMCE_TOOLBAR}
          onEditorChange={(value: string) => this.handlerEditorChange(value)}
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
  };
}
