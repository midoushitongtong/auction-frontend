import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { AppState } from '../../../../store';
import { Button, Form, Input, Icon, notification } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import api from '../../../../api';
import './index.less';

// 当前组件的类型声明
interface ConnectState {
  userInfo: any;
}

interface ConnectDispatch {

}

interface Props extends FormComponentProps, ConnectState, ConnectDispatch {
}

interface State {
  // 修改用户信息加载状态
  updatePersonInfoLoading: boolean;
}

// 当前组件类
export default compose<React.ComponentClass>(
  connect<ConnectState, ConnectDispatch, Props>(
    (state: any | AppState) => ({
      userInfo: state.account.userInfo
    }),
    {}
  ),
  Form.create()
)(
  class AccountPersonInfoDetail extends React.Component<Props, State> {
    constructor(props: any) {
      super(props);
      this.state = {
        updatePersonInfoLoading: false
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
            updatePersonInfoLoading: true
          });
          const result: any = await api.account.updateUserInfo({
            password: valueList.password,
            mail: valueList.email,
            phone: valueList.phoneNumber
          });
          this.setState({
            updatePersonInfoLoading: false
          });
          if (parseInt(result.code) === 0) {
            notification.open({
              placement: 'bottomLeft',
              message: '修改成功',
              duration: 5
            });
          } else {
            if (parseInt(result.code) === 1) {
              notification.open({
                placement: 'bottomLeft',
                message: '修改成功',
                duration: 5
              });
            } else if (parseInt(result.code) === 2) {

            } else {
              notification.open({
                placement: 'bottomLeft',
                message: `修改失败: ${JSON.stringify(result)}`,
                duration: 5
              });
            }
          }
        }
      });
    };

    public render = (): JSX.Element => {
      const { props, state } = this;
      return (
        <section className="account-person-info-search-detail-container">
          <Form onSubmit={this.handleSubmit} className="form-container">
            <Form.Item>
              {props.form.getFieldDecorator('password', {
                validateTrigger: 'onBlur',
                rules: [],
              })(
                <Input
                  type="password"
                  prefix={<Icon type="lock"/>}
                  placeholder="留空不修改"
                />
              )}
            </Form.Item>
            <Form.Item>
              {props.form.getFieldDecorator('email', {
                initialValue: props.userInfo.email,
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
                initialValue: props.userInfo.phoneNumber,
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
            <Form.Item>
              <Button
                loading={state.updatePersonInfoLoading}
                type="primary"
                htmlType="submit"
                className="sign-up"
                style={{ width: '100%' }}
              >
                修改我的信息
              </Button>
            </Form.Item>
          </Form>
        </section>
      );
    }
  }
);
