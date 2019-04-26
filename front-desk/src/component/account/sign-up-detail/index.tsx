import React from 'react';
import { Button, Form, Input, Icon, notification } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import Router from 'next/router';
import api from '../../../api';
import config from '../../../config';
import './index.less';

// 当前组件的类型声明
interface Props extends FormComponentProps {
}

interface State {
  // 验证码地址
  captchaSrc: string;
  // 验证码地址, 用于刷新验证码
  originCaptchaSrc: string;
  // 注册加载状态
  signUpLoading: boolean;
}

// 当前组件类
export default Form.create()(
  class AccountSignUpDetail extends React.Component<Props, State> {
    constructor(props: any) {
      super(props);
      this.state = {
        captchaSrc: `${config.API_ROOT}/captcha.html?r=${Math.random()}`,
        originCaptchaSrc: `${config.API_ROOT}/captcha.html`,
        signUpLoading: false
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
            signUpLoading: true
          });
          const result1: any = await api.account.signUp({
            status: 0,
            v: valueList.captcha,
            username: valueList.username,
            password: valueList.password,
            mail: valueList.email,
            phone: valueList.phoneNumber
          });
          if (parseInt(result1.code) === 0) {
            notification.open({
              placement: 'bottomLeft',
              message: '注册成功',
              duration: 5
            });
            this.setState({
              signUpLoading: false
            });
            // 跳转至登陆页
            Router.push({
              pathname: '/account/sign-in'
            });
          } else {
            this.setState({
              signUpLoading: false
            });
            if (parseInt(result1.code) === 1) {
              notification.open({
                placement: 'bottomLeft',
                message: '验证码输入有误',
                duration: 5
              });
            } else if (parseInt(result1.code) === 3) {
              this.refreshCaptcha();
              notification.open({
                placement: 'bottomLeft',
                message: '用户名已被占用',
                duration: 5
              });
            } else {
              this.refreshCaptcha();
              notification.open({
                placement: 'bottomLeft',
                message: `注册失败: ${JSON.stringify(result1)}`,
                duration: 5
              });
            }
          }
        }
      });
    };

    /**
     * 刷新验证码
     *
     */
    public refreshCaptcha = (): void => {
      this.setState((state) => ({
        captchaSrc: `${state.originCaptchaSrc}?r=${Math.random()}`
      }));
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
              {props.form.getFieldDecorator('username', {
                validateTrigger: 'onBlur',
                rules: [
                  { required: true, message: '用户名由2~20个字符组成' },
                  { min: 2, message: '用户名由2~20个字符组成' },
                  { max: 20, message: '用户名由2~20个字符组成' }
                ],
              })(
                <Input
                  type="text"
                  prefix={<Icon type="user"/>}
                  placeholder="用户名"
                />
              )}
            </Form.Item>
            <Form.Item>
              {props.form.getFieldDecorator('password', {
                validateTrigger: 'onBlur',
                rules: [
                  {
                    required: true,
                    message: '密码由5~30个字符组成'
                  },
                  {
                    min: 5,
                    message: '密码由5~30个字符组成'
                  },
                  {
                    max: 30,
                    message: '密码由5~30个字符组成'
                  }
                ],
              })(
                <Input
                  type="password"
                  prefix={<Icon type="lock"/>}
                  placeholder="密码"
                />
              )}
            </Form.Item>
            <Form.Item>
              {props.form.getFieldDecorator('email', {
                validateTrigger: 'onBlur',
                rules: [
                  {
                    required: true,
                    message: '请输入正确的邮箱地址!'
                  },
                  {
                    pattern: new RegExp(/^([A-Za-z0-9_\-\.\u4e00-\u9fa5])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,8})$/),
                    message: '请输入正确的邮箱地址!'
                  }
                ]
              })(
                <Input
                  prefix={<Icon type="mail"/>}
                  placeholder="邮箱地址"
                />
              )}
            </Form.Item>
            <Form.Item>
              {props.form.getFieldDecorator('phoneNumber', {
                validateTrigger: 'onBlur',
                rules: [
                  {
                    required: true,
                    message: '请输入正确的手机号码!'
                  },
                  {
                    pattern: new RegExp(/^1[34578]\d{9}$/),
                    message: '请输入正确的手机号码!'
                  }
                ]
              })(
                <Input
                  prefix={<Icon type="phone"/>}
                  placeholder="手机号"
                />
              )}
            </Form.Item>
            <Form.Item className="captcha-form-item">
              {props.form.getFieldDecorator('captcha', {
                validateTrigger: 'onBlur',
                rules: [
                  {
                    required: true,
                    message: '请输入验证码!'
                  }
                ]
              })(
                <Input
                  addonAfter={<img
                    src={state.captchaSrc}
                    className="captcha"
                    onClick={this.refreshCaptcha}
                  />}
                  placeholder="验证码"
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
