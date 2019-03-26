import React from 'react';
import { Button, Form, Input, Icon, notification } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { compose } from 'redux';
import Router from 'next/router';
import api from '../../../api';
import './index.scss';

// 当前组件的类型声明
interface Props extends FormComponentProps {

}

interface State {
  // 发送验证码冷却时间
  sendCaptchaNumber: number;
  // 注册加载状态
  signUpLoading: boolean;
}

// 当前组件类
export default compose<React.ComponentClass>(
  Form.create()
)(
  class AccountSignUpDetail extends React.Component<Props, State> {
    constructor(props: any) {
      super(props);
      this.state = {
        sendCaptchaNumber: 0,
        signUpLoading: false
      };
    }


    /**
     * 发送验证码倒计时定时器
     *
     */
    public sendCaptchaNumberInterval: any;

    public componentWillUnmount = (): void => {
      if (this.sendCaptchaNumberInterval != null) {
        clearInterval(this.sendCaptchaNumberInterval);
      }
    };

    /**
     * 发送验证码
     *
     */
    public sendCaptcha = (): void => {
      const { props } = this;
      props.form.validateFields(['phoneNumber'], async (error, valueList) => {
        if (!error) {
          this.setState({
            sendCaptchaNumber: 10
          });

          // 启动发送验证码倒计时定时器
          this.sendCaptchaNumberInterval = setInterval(() => {
            this.setState((state) => {
              if (state.sendCaptchaNumber === 0) {
                clearInterval(this.sendCaptchaNumberInterval);
                return {
                  ...state
                };
              } else {
                return {
                  sendCaptchaNumber: state.sendCaptchaNumber - 1
                }
              }
            });
          }, 1000);

          const result: any = await api.account.sendCaptcha({
            phoneNumber: valueList['phoneNumber']
          });

          if (parseInt(result.code) === 0) {
            notification.open({
              placement: 'bottomLeft',
              message: '验证码已发送, 请注意查收',
              duration: 5
            });
          } else {
            notification.open({
              placement: 'bottomLeft',
              message: '验证码发送失败',
              duration: 5,
              style: {
                backgroundColor: '#ff5555b3',
                color: '#fff'
              }
            });
          }
        }
      });
    };

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
            signUpLoading: true
          });
          const result: any = await api.account.signUp(valueList);
          this.setState({
            signUpLoading: false
          });
          if (parseInt(result.code) === 0) {
            notification.open({
              placement: 'bottomLeft',
              message: '注册成功',
              duration: 5
            });
            // 跳转至首页
            Router.push({
              pathname: '/home'
            });
          } else {
            notification.open({
              placement: 'bottomLeft',
              message: '注册失败',
              duration: 5
            });
          }
        }
      });
    };

    public render = (): JSX.Element => {
      const { props, state } = this;
      return (
        <section className="account-sign-up-detail-container">
          <section className="header-container">
            <h3 className="title">创建您的 新创文化艺术品 账号</h3>
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
            <Form.Item className="captcha">
              {props.form.getFieldDecorator('captcha', {
                rules: [
                  { required: true, message: '请输入短信验证码!' }
                ]
              })(
                <Input
                  placeholder="短信验证码"
                  addonAfter={(
                    <Button
                      onClick={this.sendCaptcha}
                      disabled={state.sendCaptchaNumber > 0}
                    >{state.sendCaptchaNumber > 0 ? `重新获取 (${state.sendCaptchaNumber})` : '获取验证码'}</Button>
                  )}
                />
              )}
            </Form.Item>
            <Form.Item>
              <Button
                loading={state.signUpLoading}
                type="primary"
                htmlType="submit"
                className="sign-up"
                style={{ width: '100%' }}
              >
                立即创建
              </Button>
            </Form.Item>
          </Form>
        </section>
      );
    }
  }
);
