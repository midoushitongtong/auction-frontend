import React from 'react';
import { connect } from 'react-redux';
import { Button, Form, Input, Select, Menu, Icon } from 'antd';
import { Link, withRouter } from 'react-router-dom';
import NProgress from 'nprogress';
import './index.scss';

export default connect(
  // mapStateToProps
  state => {
    return {};
  },
  // mapDispatchToProps
  {}
)(
  withRouter(Form.create()(
    class LayoutHeader extends React.Component {
      state = {
        headerNavMode: 'horizontal',
        headerNavSelectKeys: null,
        headerNavList: [
          { key: '1', name: '首页', path: '/home' },
          { key: '3', name: '收藏品查询', path: '/collection' },
          {
            key: '4', name: '拍卖指南',
            children: [
              { key: '4-1', name: '卖家指南', path: '/home' },
              { key: '4-2', name: '买家指南', path: '/home' }
            ]
          }
        ]
      };

      componentDidMount = () => {
        this.watchWindowReSize();
        this.watchUrl();
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
       * 监听 url 改变当前状态key
       *
       */
      watchUrl = () => {
        const { state, props } = this;
        // 顶部加载动画
        NProgress.start();

        // 更新菜单激活样式 =====
        // 当前 url 的路径匹配的菜单
        let headerNavItem = null;
        // 当前 url 的路径
        const currentPathName = props.location.pathname.split('/')[1];
        // 遍历所有菜单, 获取与当前 url 的路径匹配的菜单
        props.location && state.headerNavList.forEach(item => {
          if (headerNavItem) return false;
          // 无二级菜单, 匹配一级菜单
          if (!item.children) {
            const navPathName = item.path.split('/')[1];
            if (navPathName === currentPathName) {
              headerNavItem = item;
            }
          }
        });
        // 更新菜单的 key
        this.setState({
          headerNavSelectKeys: headerNavItem.key,
        });

        // 顶部加载动画
        NProgress.done();
      };

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
        const { state } = this;
        // 如果是手机端点击菜单 收起菜单
        if (state.headerNavMode === 'inline') {
          this.toggleMobileHeaderNavContainer(false);
        }

        // 更新菜单的 key
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
                  {/* 渲染一级菜单 */}
                  {state.headerNavList.map(item => (
                    item.children && item.children.length > 0
                      // 有二级菜单
                      ? (
                        <Menu.SubMenu
                          key={item.key}
                          title={
                            <span>
                              {item.name}
                              <Icon type="down"/>
                            </span>
                          }
                        >
                          {/* 渲染二级菜单 */}
                          {item.children.map(itemChild => (
                            <Menu.Item key={itemChild.key}>
                              <Link to={itemChild.path}>
                                {itemChild.name}
                              </Link>
                            </Menu.Item>
                          ))}
                        </Menu.SubMenu>
                      )
                      // 无二级菜单
                      : (
                        <Menu.Item key={item.key}>
                          <Link to={item.path}>
                            {item.name}
                          </Link>
                        </Menu.Item>
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
  )
);
