import React from 'react';
import { Menu, Icon } from 'antd';
import { withRouter, WithRouterProps } from 'next/router';
import Link from 'next/link';
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
  key: string;
  // 菜单名称
  name: string;
  // 菜单跳转路径
  path?: string;
  // 菜单的子菜单
  children?: NavItem[];
}

interface Props extends WithRouterProps {
  toggleMobileHeaderNavContainer: any;
}

interface State {
  // 菜单模式[垂直, 水平]
  headerNavMode: HeaderNavMode;
  // 菜单列表
  headerNavList: NavItem[];
  // 屏幕宽度发生变化触发的定时器
  reSizeTimeOut: any;
}

// 当前组件类
export default withRouter(
  class HeaderNav extends React.Component<Props, State> {
    public state: State = {
      headerNavMode: HeaderNavMode.HORIZONTAL,
      headerNavList: [
        { key: '1', name: '首页', path: '/home' },
        { key: '2', name: '收藏品查询', path: '/collection' },
        {
          key: '3', name: '咨询中心',
          children: [
            { key: '3-1', name: '新创公告', path: '/notice' }
          ]
        }
      ],
      reSizeTimeOut: null
    };

    public componentDidMount = (): void => {
      window.addEventListener('resize', this.listenerReSize);

      // 页面加载触发一次
      this.handlerReSize();
    };

    public componentWillUnmount = (): void => {
      window.removeEventListener('resize', this.listenerReSize);
    };

    /**
     * 处理屏幕宽度变换事件
     *
     */
    public listenerReSize = () => {
      clearInterval(this.state.reSizeTimeOut);
      // 添加定时器防抖动
      this.state.reSizeTimeOut = setTimeout(this.handlerReSize, 500);
    };

    /**
     * 根据屏幕宽度重新渲染菜单(自适应)
     *
     */
    public handlerReSize = (): void => {
      // 获取客户端的可视区域
      const clientWidth = window.innerWidth;
      if (clientWidth >= 768) {
        // 客户端的可视区域大于 768 电脑端
        this.setState({
          headerNavMode: HeaderNavMode.HORIZONTAL
        });
      } else {
        // 客户端的可视区域小于 768 手机端
        this.setState({
          headerNavMode: HeaderNavMode.INLINE
        });
      }
    };

    /**
     * 获取当前的 url 对应的菜单 key
     *
     */
    public getHeaderNavSelectKey = (): string => {
      const { state, props } = this;

      // 更新菜单激活样式 =====
      // 当前 url 的路径
      const currentPathName = props.router && props.router.pathname.split('/')[1];

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

      return currentRouteNav !== null ? currentRouteNav.key : '1';
    };

    /**
     * 菜单点击事件
     *
     */
    public handleHeaderNavClick = (): void => {
      const { props, state } = this;
      // 如果是手机端点击菜单 收起菜单
      if (state.headerNavMode === 'inline') {
        props.toggleMobileHeaderNavContainer(false);
      }
    };

    public render = (): JSX.Element => {
      const { props, state } = this;
      return (
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
                          <Link href={itemChild.path ? itemChild.path : ''}>
                            <a href={itemChild.path ? itemChild.path : ''}>{itemChild.name}</a>
                          </Link>
                        </Menu.Item>
                      ))}
                    </Menu.SubMenu>
                  )
                  // 无二级菜单
                  : (
                    <Menu.Item key={item.key}>
                      <Link href={item.path}>
                        <a>{item.name}</a>
                      </Link>
                    </Menu.Item>
                  )
              ))}
            </Menu>
          </section>
          {/* 手机端菜单画布容器 */}
          <section
            className="mobile-header-nav-container-mask"
            onClick={() => props.toggleMobileHeaderNavContainer(false)}
          />
        </section>
      );
    };
  }
);
