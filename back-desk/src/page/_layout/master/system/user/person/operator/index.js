import React from 'react';
import { Form, Input, Button, Radio } from 'antd';
import NProgress from 'nprogress';
import api from '../../../../../../../api/index';

export default Form.create()(
  class LayoutMasterSystemUserPersonOperator extends React.Component {
    state = {
      // 按钮的加载
      submitButtonLoading: false,
      // 操作类型[添加, 修改]
      actionType: null,
      // 表单默认值[操作类型为修改异步获取]
      formInitialValue: {}
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
        // 获取当前数据
        NProgress.start();
        const result = await api.person.selectPersonById(id);
        NProgress.done();
        this.setState({
          actionType: 'update',
          formInitialValue: result.data
        });
      } else {
        // 新增操作
        state.actionType = 'insert';
      }
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
          // 开始加载状态
          NProgress.start();
          this.setState({
            submitButtonLoading: true
          });

          // 封装请求数据
          const requestData = {
            gender: valueList.gender,
            username: valueList.username
          };
          console.log(requestData);

          // 保存数据
          if (state.actionType === 'update') {
            // 修改操作
            await api.person.updatePersonById(state.formInitialValue.id, requestData);
          } else {
            // 添加操作
            await api.person.insertPerson(requestData);
          }

          // 取消加载状态
          NProgress.done();
          this.setState({
            submitButtonLoading: false
          });

          // 跳转到列表页
          props.history.push('/system/user/person/list');
        }
      });
    };

    render = () => {
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
        <section className="person-operation-container">
          <section className="operation-container">
            <Form onSubmit={this.handleSubmit}>
              {/* 用户名 */}
              <Form.Item {...baseFormItemLayout} label="用户名">
                {props.form.getFieldDecorator('username', {
                  initialValue: state.formInitialValue.username,
                  rules: [
                    { required: true, message: '请输入用户名' },
                    { min: 2, max: 20, message: '用户名由2~20个字符组成！' }
                  ]
                })(
                  <Input type="text" placeholder="请输入用户名"/>
                )}
              </Form.Item>

              {/* 性别 */}
              <Form.Item {...baseFormItemLayout} label="性别">
                {props.form.getFieldDecorator('gender', {
                  initialValue: state.formInitialValue.gender,
                  rules: [
                    { required: true, message: '请选择性别！' },
                  ]
                })(
                  <Radio.Group>
                    <Radio value={1}>男</Radio>
                    <Radio value={2}>女</Radio>
                  </Radio.Group>
                )}
              </Form.Item>

              {/* 提交 */}
              <Form.Item {...tailFormItemLayout}>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={state.submitButtonLoading}
                >保存</Button>
              </Form.Item>
            </Form>
          </section>
        </section>
      );
    };
  }
);
