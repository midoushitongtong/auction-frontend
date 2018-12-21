import React from 'react';
import { connect } from 'react-redux';
import { Button, Form, Input, Select, Menu, Icon } from 'antd';
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
    class LayoutHeader extends React.Component {
      state = {
        headerNavMode: 'horizontal',
        headerNavSelectKeys: '1',
        headerNavList: [
          { key: '1', name: '首页', path: '/' },
          {
            key: '2', name: '拍卖', path: '/',
            children: [
              { key: '2-1', name: '拍卖预告', path: '/' },
              { key: '2-2', name: '拍卖结果', path: '/' }
            ]
          },
          { key: '3', name: '拍品查询', path: '/' },
          {
            key: '4', name: '拍卖指南', path: '/',
            children: [
              { key: '4-1', name: '卖家指南', path: '/' },
              { key: '4-2', name: '买家指南', path: '/' }
            ]
          }
        ]
      };

      componentDidMount = () => {
        this.watchWindowReSize();
      };

      /**
       * 监听屏幕的宽度自适应菜单
       *
       */
      watchWindowReSize() {
        const handlerReSize = () => {
          // 获取客户端的可视区域
          const clientWidth = document.body.offsetWidth;
          if (clientWidth >= 768) {
            // 客户端的可视区域大于 768 电脑端
            this.setState({
              headerNavMode: 'horizontal'
            });
            // 移除移动端样式
            this.toggleMobileHeaderNavContainer(false);
            this.toggleMobileSearchContainer(false);
          } else {
            // 客户端的可视区域小于 768 手机端
            this.setState({
              headerNavMode: 'inline'
            });
          }
        };

        let reSizeTimeOut = null;
        window.addEventListener('resize', () => {
          clearInterval(reSizeTimeOut);
          // 定时器防抖
          reSizeTimeOut = setTimeout(handlerReSize, 500);
        });

        // 页面加载触发一次
        handlerReSize();
      }

      /**
       * 搜索表单提交事件
       *
       * @param e
       */
      handleSearchSubmit = (e) => {
        e.preventDefault();
        const { props } = this;
        props.form.validateFields(async (error, valueList) => {
          if (!error) {
            console.log(valueList);
          }
        });
      };

      /**
       * 菜单点击事件
       *
       * @param e
       */
      handleHeaderNavClick = (e) => {
        console.log('click ', e);
        this.setState({
          headerNavSelectKeys: e.key,
        });
      };

      /**
       * 隐藏 / 显示顶部菜单事件
       *
       */
      toggleMobileHeaderNavContainer = (isShow) => {
        const bodyElem = document.querySelector('body');
        const rootElem = document.querySelector('#root');
        const headerContainerElem = this.refs['headerContainerElem'];
        if (isShow) {
          bodyElem.classList.add('mobile-active');
          rootElem.classList.add('mobile-active');
          headerContainerElem.classList.add('mobile-active');
        } else {
          bodyElem.classList.remove('mobile-active');
          rootElem.classList.remove('mobile-active');
          headerContainerElem.classList.remove('mobile-active');
        }
      };

      /**
       * 隐藏 / 显示搜索框事件
       *
       */
      toggleMobileSearchContainer = (isShow) => {
        const operationContainerElem = this.refs['operationContainerElem'];
        if (isShow) {
          operationContainerElem.classList.add('mobile-active');
        } else {
          operationContainerElem.classList.remove('mobile-active');
        }
      };

      render() {
        const { props, state } = this;
        return (
          <section className="layout-header-container" ref="headerContainerElem">
            <section className="header-action-container">
              <section className="header-action-inner-container">
                <section className="hello">
                  欢迎来到 新创文化艺术品
                </section>
                <section className="action-tooltip">
                  <span>登陆</span>
                  <span>注册</span>
                </section>
              </section>
            </section>
            <section className="header-top-container">
              <section className="header-top-inner-container">
                <img src="http://www.cguardian.com.hk/images/logo.png" className="logo" alt="logo"/>
                <section className="operation-container" ref="operationContainerElem">
                  <section className="search-container">
                    <Form onSubmit={this.handleSearchSubmit}>
                      <Form.Item>
                        {props.form.getFieldDecorator('bookCategoryId', {
                          initialValue: 1
                        })(
                          <Select>
                            <Select.Option value={1}>拍卖品</Select.Option>
                            <Select.Option value={2}>文章</Select.Option>
                          </Select>
                        )}
                      </Form.Item>
                      <Form.Item>
                        {props.form.getFieldDecorator('name', {
                          initialValue: ''
                        })(
                          <Input type="text" placeholder="请输入关键字"/>
                        )}
                      </Form.Item>
                      <Form.Item>
                        <Button type="primary" icon="search" htmlType="submit">搜索</Button>
                      </Form.Item>
                    </Form>
                  </section>
                  {/* 手机端搜索框画布容器 */}
                  <section className="mobile-search-container-mask"
                           onClick={() => this.toggleMobileSearchContainer(false)}/>
                </section>
                {/* 手机端操作容器 */}
                <section className="mobile-header-top-action-container">
                  <span className="show-header-nav-container">
                    <Icon type="menu" onClick={() => this.toggleMobileHeaderNavContainer(true)}/>
                  </span>
                  <span className="show-search-container">
                    <Icon type="search" onClick={() => this.toggleMobileSearchContainer(true)}/>
                  </span>
                </section>
              </section>
            </section>
            <section className="header-nav-container">
              <section className="header-nav-inner-container">
                <Menu
                  onClick={this.handleHeaderNavClick}
                  selectedKeys={[state.headerNavSelectKeys]}
                  mode={state.headerNavMode}
                >
                  {state.headerNavList.map(nav => (
                    nav.children && nav.children.length > 0
                      // 有二级菜单
                      ? (
                        <Menu.SubMenu
                          key={nav.key}
                          title={
                            <span>
                              {nav.name}
                              <Icon type="down"/>
                            </span>
                          }
                        >
                          {/* 二级菜单 */}
                          {nav.children.map(navChildren => (
                            <Menu.Item key={navChildren.key}>{navChildren.name}</Menu.Item>
                          ))}
                        </Menu.SubMenu>
                      )
                      // 无二级菜单
                      : (
                        <Menu.Item key={nav.key}>{nav.name}</Menu.Item>
                      )
                  ))}
                </Menu>
              </section>
              {/* 手机端菜单画布容器 */}
              <section className="mobile-header-nav-container-mask"
                       onClick={() => this.toggleMobileHeaderNavContainer(false)}/>
            </section>
          </section>
        );
      }
    }
  )
);
