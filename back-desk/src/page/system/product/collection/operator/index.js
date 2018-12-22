import React from 'react';
import { connect } from 'react-redux';
import { Form, Input, Button, Upload, Icon, message } from 'antd';
// import api from '../../../../../api/index';
import './index.scss';

export default connect(
  // mapStateToProps
  state => {
    return {};
  },
  // mapDispatchToProps
  {}
)(
  Form.create()(
    class SystemUserPersonOperator extends React.Component {
      state = {
        // 操作类型[添加, 修改]
        actionType: null,
        // 表单默认值[操作类型为修改异步获取]
        formInitialValue: {},
        loading: false,
      };

      componentDidMount = () => {
        this.initPage();
      };

      /**
       * 初始化页面数据
       *
       */
      initPage = async () => {
        const { state, props } = this;
        const id = props.match.params.id;
        if (id) {
          // 修改操作
          state.actionType = 'update';
          // 获取当前数据
          // const result = await api.person.selectPersonById(id);
          const result = {
            "code": "0",
            "data": {
              id: 1,
              name: "赵春翔",
              previewImage: "http://www.cguardian.com.hk/upload/image/127/s/0002.jpg",
              createdAt: "2018-12-02 15:37:00",
              updatedAt: "2018-12-11 18:49:11"
            }
          };
          this.setState({
            formInitialValue: result.data
          });
        } else {
          // 新增操作
          state.actionType = 'insert';
        }
      };

      /**
       * 验证上传文件的类型和大小
       *
       */
      checkBeforeUpload = (file) => {
        const isJPG = file.type === 'image/jpeg';
        if (!isJPG) {
          message.error('You can only upload JPG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
          message.error('Image must smaller than 2MB!');
        }
        return isJPG && isLt2M;
      };

      /**
       * 上传文件发送改变
       *
       */
      handleChange = (info) => {
        if (info.file.status === 'uploading') {
          this.setState({
            loading: true
          });
          return;
        }
        if (info.file.status === 'done') {
          this.getBase64(info.file.originFileObj, imageUrl => this.setState({
            imageUrl,
            loading: false
          }));
        }
      };

      /**
       * 获取图片的 base64
       *
       */
      getBase64 = (img, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
      };

      /**
       * 处理表单提交
       *
       */
      handleSubmit = (e) => {
        e.preventDefault();
        const { state, props } = this;
        props.form.validateFields(async (error, valueList) => {
          if (!error) {
            // 保存数据
            if (state.actionType === 'update') {
              // 修改操作
              // await api.person.updatePersonById(state.formInitialValue.id, valueList);
            } else {
              // 添加操作
              // await api.person.insertPerson(valueList);
            }

            // 跳转到列表页
            props.history.push('/system/user/person/list');
          }
        });
      };

      render() {
        const { state, props } = this;

        const baseFormItemLayout = {
          labelCol: {
            xs: { span: 24 },
            sm: { span: 7 }
          },
          wrapperCol: {
            xs: { span: 24 },
            sm: { span: 12 },
            md: { span: 10 }
          }
        };

        const tailFormItemLayout = {
          wrapperCol: {
            xs: { span: 24, offset: 0 },
            sm: { span: 12, offset: 7 },
            md: { span: 10, offset: 7 }
          }
        };

        return (
          <section className="collection-operation-container">
            <Form onSubmit={this.handleSubmit}>
              <Form.Item {...baseFormItemLayout} label="收藏品名称">
                {props.form.getFieldDecorator('name', {
                  initialValue: state.formInitialValue.username,
                  rules: [
                    { required: true, message: '请输入收藏品名称' },
                    { min: 2, max: 20, message: '收藏品名称由2~20个字符组成！' }
                  ]
                })(
                  <Input type="text" placeholder="请输入收藏品名称"/>
                )}
              </Form.Item>

              <Form.Item {...baseFormItemLayout} label="收藏品预览图" className="update-form-item">
                {props.form.getFieldDecorator('previewImage', {})(
                  <Upload
                    name="avatar"
                    listType="picture-card"
                    className="avatar-uploader"
                    showUploadList={false}
                    action="//jsonplaceholder.typicode.com/posts/"
                    beforeUpload={this.checkBeforeUpload}
                    onChange={this.handleChange}
                  >
                    {state.imageUrl
                      ? (
                        <img src={state.imageUrl} alt="avatar"/>
                      )
                      : (
                        <div>
                          <Icon type={this.state.loading ? 'loading' : 'plus'}/>
                          <div className="ant-upload-text">Upload</div>
                        </div>
                      )}
                  </Upload>
                )}
              </Form.Item>

              {/* 提交 */}
              <Form.Item {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit">保存</Button>
              </Form.Item>
            </Form>
          </section>
        );
      }
    }
  )
);
