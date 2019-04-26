import React from 'react';
import { Button, Form, Input, Icon, notification } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import Router from 'next/router';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { updateUserInfo } from '../../../store/account';
import { updateCollectionFavoriteIdList } from '../../../store/account/person';
import api from '../../../api';
import config from '../../../config';
import './index.less';

// 当前组件的类型声明
interface ConnectState {

}

interface ConnectDispatch {
  // 修改用户登陆状态
  updateUserInfo: (data: any) => object;
  // 修改我收藏的收藏品id
  updateCollectionFavoriteIdList: (data: any) => object;
}

interface Props extends FormComponentProps, ConnectState, ConnectDispatch {
}

interface State {
  // 验证码地址
  captchaSrc: string;
  // 验证码地址, 用于刷新验证码
  originCaptchaSrc: string;
  // 登陆加载状态
  signInLoading: boolean;
}

// 当前组件类

export default compose<React.ComponentClass>(
  connect<ConnectState, ConnectDispatch, Props>(
    () => ({}),
    {
      updateUserInfo,
      updateCollectionFavoriteIdList
    }
  ),
  Form.create()
)(
  class AccountSignInDetail extends React.Component<Props, State> {
    constructor(props: any) {
      super(props);
      this.state = {
        captchaSrc: `${config.API_ROOT}/captcha.html?r=${Math.random()}`,
        originCaptchaSrc: `${config.API_ROOT}/captcha.html`,
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
          const result1: any = await api.account.signIn({
            status: 1,
            v: valueList.captcha,
            username: valueList.username,
            password: valueList.password
          });
          this.setState({
            signInLoading: false
          });
          if (parseInt(result1.code) === 0) {
            // 获取用户信息
            let result1: any = await api.account.selectUserInfo();
            let userInfo: any = {
              username: result1.data.username,
              email: result1.data.mail,
              phoneNumber: result1.data.phone,
              // 无论用户是否登陆, 标记为获取用户信息完成
              isGet: true
            };
            // 保存登陆状态到 redux
            props.updateUserInfo(userInfo);
            // 初始化我收藏的收藏品
            const result2: any = await api.accountPerson.selectCollectionFavoriteIdList();
            if (parseInt(result2.code) === 0) {
              props.updateCollectionFavoriteIdList(result2.data);
            }
            // 提示登陆成功
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
            if (parseInt(result1.code) === 1) {
              notification.open({
                placement: 'bottomLeft',
                message: '验证码输入有误',
                duration: 5
              });
            } else if (parseInt(result1.code) === 2) {
              this.refreshCaptcha();
              notification.open({
                placement: 'bottomLeft',
                message: '用户名或密码不正确',
                duration: 5
              });
            } else {
              notification.open({
                placement: 'bottomLeft',
                message: '登陆失败, 未知原因',
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
        <section className="account-sign-in-detail-container">
          <section className="header-container">
            <h3 className="title">登陆您的 新创文化艺术品 账号</h3>
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
                loading={state.signInLoading}
                type="primary"
                htmlType="submit"
                className="sign-in"
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
