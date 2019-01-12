import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { RouteConfigComponentProps } from 'react-router-config';
import { compose } from 'redux';
import { Button, Form, Input, Select, Menu, Icon } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import NProgress from 'nprogress';
import './index.scss';

// 当前组件的类型声明
// antd 菜单 model
enum HeaderNavMode {
  HORIZONTAL = 'horizontal',
  INLINE = 'inline'
}

// antd 菜单
interface NavItem {
  // 菜单 key
  key: string,
  // 菜单名称
  name: string,
  // 菜单跳转路径
  path?: string,
  // 菜单的子菜单
  children?: NavItem[]
}

interface Props extends RouteConfigComponentProps, FormComponentProps {
}

interface State {
  headerNavMode: HeaderNavMode,
  headerNavList: NavItem[]
}

// 当前组件类
export default compose<React.ComponentClass>(
  withRouter,
  Form.create()
)(
  class LayoutHeader extends React.Component<Props, State> {
    public state: State = {
      headerNavMode: HeaderNavMode.HORIZONTAL,
      headerNavList: [
        { key: '1', name: '首页', path: '/home' },
        { key: '2', name: '收藏品查询', path: '/collection' },
        {
          key: '3', name: '拍卖指南',
          children: [
            { key: '3-1', name: '卖家指南', path: '/home' },
            { key: '3-2', name: '买家指南', path: '/home' }
          ]
        }
      ]
    };

    public componentDidMount = (): void => {
      this.watchWindowReSize();
    };

    /**
     * 监听屏幕的宽度自适应菜单
     *
     */
    public watchWindowReSize = (): void => {
      const handlerReSize = () => {
        // 获取客户端的可视区域
        const clientWidth = document.body.offsetWidth;
        if (clientWidth >= 768) {
          // 客户端的可视区域大于 768 电脑端
          this.setState({
            headerNavMode: HeaderNavMode.HORIZONTAL
          });
          // 移除移动端样式
          this.toggleMobileHeaderNavContainer(false);
          this.toggleMobileSearchContainer(false);
        } else {
          // 客户端的可视区域小于 768 手机端
          this.setState({
            headerNavMode: HeaderNavMode.INLINE
          });
        }
      };

      let reSizeTimeOut: any = null;
      window.addEventListener('resize', () => {
        clearInterval(reSizeTimeOut);
        // 定时器防抖
        reSizeTimeOut = setTimeout(handlerReSize, 500);
      });

      // 页面加载触发一次
      handlerReSize();
    };

    /**
     * 获取当前的 url 对应的菜单 key
     *
     */
    public getHeaderNavSelectKey = (): string => {
      const { state, props } = this;
      // 顶部加载动画
      NProgress.start();

      // 更新菜单激活样式 =====
      // 当前 url 的路径
      const currentPathName = props.location.pathname.split('/')[1];

      // 当前 url 的路径匹配的菜单
      let currentRouteNav: any | NavItem = null;
      // 遍历所有菜单, 获取与当前 url 的路径匹配的菜单
      state.headerNavList.forEach(navItem => {
        if (currentRouteNav) return false;
        // 无二级菜单, 匹配一级菜单
        if (!navItem.children && navItem.path) {
          const navItemPathName = navItem.path.split('/')[1];
          if (navItemPathName === currentPathName) {
            currentRouteNav = navItem;
          }
        }
        // 有二级菜单, 匹配二级菜单
        if (navItem.children) {
          navItem.children.forEach(navItemChildrenItem => {
            if (currentRouteNav) return false;
            if (navItemChildrenItem.path) {
              const navItemChildrenItemPathName = navItemChildrenItem.path.split('/')[1];
              if (navItemChildrenItemPathName === currentPathName) {
                currentRouteNav = navItemChildrenItem;
              }
            }
          });
        }
      });

      // 顶部加载动画
      NProgress.done();
      return currentRouteNav !== null ? currentRouteNav.key : '3';
    };

    /**
     * 搜索表单提交事件
     *
     * @param e
     */
    public handleSearchSubmit = (e: React.FormEvent): void => {
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
     */
    public handleHeaderNavClick = (): void => {
      const { state } = this;
      // 如果是手机端点击菜单 收起菜单
      if (state.headerNavMode === 'inline') {
        this.toggleMobileHeaderNavContainer(false);
      }
    };

    /**
     * 隐藏 / 显示顶部菜单事件
     *
     */
    public toggleMobileHeaderNavContainer = (isShow: boolean): void => {
      const bodyElem = document.querySelector('body');
      const rootElem = document.querySelector('#root');
      const headerContainerElem = document.querySelector('.layout-header-container');
      if (bodyElem && rootElem && headerContainerElem) {
        if (isShow) {
          bodyElem.classList.add('mobile-active');
          rootElem.classList.add('mobile-active');
          headerContainerElem.classList.add('mobile-active');
        } else {
          bodyElem.classList.remove('mobile-active');
          rootElem.classList.remove('mobile-active');
          headerContainerElem.classList.remove('mobile-active');
        }
      }
    };

    /**
     * 隐藏 / 显示搜索框事件
     *
     */
    public toggleMobileSearchContainer = (isShow: boolean): void => {
      const operationContainerElem = document.querySelector('.operation-container');
      if (operationContainerElem) {
        if (isShow) {
          operationContainerElem.classList.add('mobile-active');
        } else {
          operationContainerElem.classList.remove('mobile-active');
        }
      }
    };

    public render = (): JSX.Element => {
      const { props, state } = this;
      return (
        <section className="layout-header-container">
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
              <section className="operation-container">
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
                <section
                  className="mobile-search-container-mask"
                  onClick={() => this.toggleMobileSearchContainer(false)}
                />
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
                selectedKeys={[this.getHeaderNavSelectKey()]}
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
                            <Link to={itemChild.path ? itemChild.path : ''}>
                              {itemChild.name}
                            </Link>
                          </Menu.Item>
                        ))}
                      </Menu.SubMenu>
                    )
                    // 无二级菜单
                    : (
                      <Menu.Item key={item.key}>
                        {item.path != undefined && (
                          <Link to={item.path}>
                            {item.name}
                          </Link>
                        )}
                      </Menu.Item>
                    )
                ))}
              </Menu>
            </section>
            {/* 手机端菜单画布容器 */}
            <section
              className="mobile-header-nav-container-mask"
              onClick={() => this.toggleMobileHeaderNavContainer(false)}
            />
          </section>
        </section>
      );
    };
  }
);
