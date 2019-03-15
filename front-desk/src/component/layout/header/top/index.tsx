import React from 'react';
import { Button, Form, Input, Select, Icon } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import Link from 'next/link';
import Router from 'next/router';
import './index.scss';

// 当前组件的类型声明
interface Props extends FormComponentProps {
  toggleMobileSearchContainer: any;
  toggleMobileHeaderNavContainer: any;
}

interface State {

}

// 当前组件类
export default Form.create()(
  class HeaderTop extends React.Component<Props, State> {
    /**
     * 搜索表单提交事件
     *
     * @param e
     */
    public handleSearchSubmit = (e: any): void => {
      e.preventDefault();
      const { props } = this;
      props.form.validateFields(async (error, valueList) => {
        if (!error) {
          // 隐藏搜索框
          props.toggleMobileSearchContainer(false);
          switch (valueList.type) {
            case 1:
              Router.push({
                pathname: '/collection',
                query: {
                  keyword: valueList.value
                }
              });
              break;
          }
        }
      });
    };

    public render = (): JSX.Element => {
      const { props } = this;
      return (
        <section className="header-top-container">
          <section className="header-top-inner-container">
            <Link href="/home">
              <a href="/home">
                <img src="http://www.cguardian.com.hk/images/logo.png" className="logo" alt="logo"/>
              </a>
            </Link>
            <section className="operation-container">
              <section className="search-container">
                <Form onSubmit={this.handleSearchSubmit}>
                  <Form.Item>
                    {props.form.getFieldDecorator('type', {
                      initialValue: 1
                    })(
                      <Select>
                        <Select.Option value={1}>拍卖品</Select.Option>
                      </Select>
                    )}
                  </Form.Item>
                  <Form.Item>
                    {props.form.getFieldDecorator('value', {
                      initialValue: ''
                    })(
                      <Input type="text" placeholder="请输入关键字"/>
                    )}
                  </Form.Item>
                  <Form.Item>
                    <Button type="primary" icon="search" htmlType="submit"/>
                  </Form.Item>
                </Form>
              </section>
              {/* 手机端搜索框画布容器 */}
              <section
                className="mobile-search-container-mask"
                onClick={() => props.toggleMobileSearchContainer(false)}
              />
            </section>
            {/* 手机端操作容器 */}
            <section className="mobile-header-top-action-container">
              <span className="show-header-nav-container">
                <Icon
                  type="menu"
                  onClick={() => props.toggleMobileHeaderNavContainer(true)}
                />
              </span>
              <span className="show-search-container">
                <Icon
                  type="search"
                  onClick={() => props.toggleMobileSearchContainer(true)}
                />
              </span>
            </section>
          </section>
        </section>
      );
    };
  }
);
