import React from 'react';
import { Button, Form, Input, Icon, notification } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import Router from 'next/router';
import api from '../../../api';
import './index.less';

// 当前组件的类型声明
interface Props extends FormComponentProps {
}

interface State {
  // 登陆加载状态
  signInLoading: boolean;
}

// 当前组件类
export default Form.create()(
  class AccountSignInDetail extends React.Component<Props, State> {
    constructor(props: any) {
      super(props);
      this.state = {
        signInLoading: false
      };
    }


    /**
     * 处理表单提交
     *
     * @param e
     */
    public handleSubmit = (e: any) => {
      e.preventDefault();
      const { props } = this;
      props.form.validateFields(async (error, valueList) => {
        if (!error) {
          this.setState({
            signInLoading: true
          });
          const result: any = await api.account.signIn(valueList);
          this.setState({
            signInLoading: false
          });
          if (parseInt(result.code) === 0) {
            notification.open({
              placement: 'bottomLeft',
              message: '登陆成功',
              duration: 5
            });
            // 跳转至首页
            Router.push({
              pathname: '/home'
            });
          } else {
            notification.open({
              placement: 'bottomLeft',
              message: '登陆失败',
              duration: 5
            });
          }
        }
      });
    };

    public render = (): JSX.Element => {
      const { props, state } = this;
      return (
        <section className="account-sign-in-detail-container">
          <section className="header-container">
            <h3 className="title">登陆您的 新创文化艺术品 账号</h3>
          </section>
          <Form onSubmit={this.handleSubmit} className="form-container">
            <Form.Item>
              {props.form.getFieldDecorator('phoneNumber', {
                rules: [
                  { required: true, message: '请输入手机号!' }
                ]
              })(
                <Input
                  prefix={<Icon type="phone"/>}
                  placeholder="手机号"
                />
              )}
            </Form.Item>
            <Form.Item>
              {props.form.getFieldDecorator('password', {
                rules: [{ required: true, message: '请输入密码' }],
              })(
                <Input
                  type="password"
                  prefix={<Icon type="lock"/>}
                  placeholder="密码"
                />
              )}
            </Form.Item>
            <Form.Item>
              <Button
                loading={state.signInLoading}
                type="primary"
                className="sign-up"
                style={{ width: '100%' }}
              >
                登陆
              </Button>
            </Form.Item>
          </Form>
        </section>
      );
    }
  }
);
