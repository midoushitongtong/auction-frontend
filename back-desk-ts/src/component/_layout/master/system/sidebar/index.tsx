import React from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import { RouteConfigComponentProps } from 'react-router-config';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Menu, Icon } from 'antd';
import NProgress from 'nprogress';
import { AppState } from '../../../../../store';
import './index.scss';

// 当前组件的类型声明
interface ConnectState {
  systemSidebarIsCollapse: boolean
}

interface ConnectDispatch {
}

interface Props extends ConnectState, ConnectDispatch, RouteConfigComponentProps {
}

interface SidebarMenu {
  // 菜单 key
  key: string,
  // 菜单名称
  name: string,
  // 菜单图片
  icon?: string,
  // 菜单跳转的路径
  path?: string,
  // 菜单子菜单
  children?: SidebarMenu[]
}

interface State {
  // 侧边栏折叠状态
  systemSidebarIsCollapse: boolean,
  // 菜单
  sideBarMenuList: SidebarMenu[]
}

// 当前组件类
export default compose<React.ComponentClass>(
  withRouter,
  connect<ConnectState, ConnectDispatch, Props>(
    (state: any | AppState) => ({
      systemSidebarIsCollapse: state.systemStyle.systemSidebarIsCollapse
    }),
    {}
  )
)(
  class LayoutMasterSystemSidebar extends React.Component<Props, State> {
    public state: State = {
      systemSidebarIsCollapse: false,
      sideBarMenuList: [
        {
          key: '1',
          icon: 'pie-chart',
          name: '仪表盘',
          children: [
            {
              key: '1-1',
              name: '工作台',
              path: '/system/home/welcome'
            }
          ]
        },
        {
          key: '2',
          icon: 'user',
          name: '用户',
          children: [
            {
              key: '2-1',
              name: '个人用户',
              path: '/system/user/person/list'
            },
          ]
        },
        {
          key: '3',
          icon: 'desktop',
          name: '产品',
          children: [
            {
              key: '3-1',
              name: '收藏品',
              path: '/system/product/collection/list'
            }
          ]
        }
      ]
    };

    public componentDidMount = (): void => {
      const { props } = this;
      setTimeout(() => {
        this.setState({
          systemSidebarIsCollapse: props.systemSidebarIsCollapse
        });
      }, 1);
    };

    public shouldComponentUpdate = (nextProps: Props): boolean => {
      const { state } = this;
      // 侧边栏折叠状态菜单样式问题
      // 利用定时器从不折叠状态变为折叠状态, 防止一开始就为折叠状态的样式问题
      if (state.systemSidebarIsCollapse !== nextProps.systemSidebarIsCollapse) {
        setTimeout(() => {
          this.setState({
            systemSidebarIsCollapse: nextProps.systemSidebarIsCollapse
          });
        }, 1);
      }
      return true;
    };

    /**
     * 获取当前的 url 对应的菜单 key
     *
     */
    public getSidebarMenuSelectKey = (): string => {
      NProgress.start();
      const { state, props } = this;
      let currentMenuPathName = '';
      const currentMenuPathNameArr = props.history.location.pathname.split('/');
      currentMenuPathName += currentMenuPathNameArr[2];
      currentMenuPathName += currentMenuPathNameArr[3];

      let currentRouteMenu: any = null;
      state.sideBarMenuList.forEach(menuItem => {
        if (currentRouteMenu) {
          // 已找到对应的菜单退出循环
          return false;
        }
        menuItem.children && menuItem.children.forEach(menuItemChildItem => {
          let menuPathName = '';
          if (menuItemChildItem.path) {
            const menuPathNameArr = menuItemChildItem.path.split('/');
            menuPathName += menuPathNameArr[2];
            menuPathName += menuPathNameArr[3];
            if (currentMenuPathName === menuPathName) {
              currentRouteMenu = menuItemChildItem;
              // 已找到对应的菜单退出循环
              return false;
            }
          }
        });
      });

      NProgress.done();
      return currentRouteMenu != null ? currentRouteMenu.key : '1';
    };

    public render = (): JSX.Element => {
      const { state, props } = this;
      return (
        <section
          className={`layout-master-system-sidebar-container ${props.systemSidebarIsCollapse ? 'collapse' : ''}`}>
          <section className="logo-container">
            <NavLink to="/">新创文化艺术品</NavLink>
          </section>
          <Menu
            // 折叠状态默认不展开菜单
            defaultOpenKeys={props.systemSidebarIsCollapse ? ['1', '2', '3'] : ['1', '2', '3']}
            // 监听路由变化更新当前选中的菜单
            selectedKeys={[this.getSidebarMenuSelectKey()]}
            mode="inline"
            theme="dark"
            inlineCollapsed={state.systemSidebarIsCollapse}
          >
            {state.sideBarMenuList.map(sideBarMenuListItem => {
              return (
                // 一级路由
                <Menu.SubMenu
                  key={sideBarMenuListItem.key}
                  title={
                    <span>
                      <Icon type={sideBarMenuListItem.icon}/>
                      <span>{sideBarMenuListItem.name}</span>
                    </span>
                  }
                >
                  {sideBarMenuListItem.children && sideBarMenuListItem.children.map(sideBarMenuListItemChildrenItem => {
                    return (
                      // 二级路由
                      <Menu.Item
                        key={sideBarMenuListItemChildrenItem.key}
                        onClick={() => {
                          // 刷新路由 如果当前路由和菜单点击的路由相同则不触发
                          if (props.location.pathname !== sideBarMenuListItemChildrenItem.path && sideBarMenuListItemChildrenItem.path) {
                            props.history.push(sideBarMenuListItemChildrenItem.path);
                          }
                        }}>
                        {sideBarMenuListItemChildrenItem.name}
                      </Menu.Item>
                    );
                  })}
                </Menu.SubMenu>
              );
            })}
          </Menu>
        </section>
      );
    };
  }
);
