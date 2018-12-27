import React from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Menu, Icon } from 'antd';
import NProgress from 'nprogress';
import './index.scss';

export default withRouter(connect(
  state => {
    // mapStateToProps
    return {
      systemSidebarIsCollapse: state.systemStyle.systemSidebarIsCollapse
    };
  },
  // mapDispatchToProps
  {}
)(
  class LayoutSystemSidebar extends React.Component {
    static propTypes = {
      // 侧边栏是否折叠
      systemSidebarIsCollapse: PropTypes.bool.isRequired
    };

    state = {
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

    /**
     * 获取当前的 url 对应的菜单 key
     *
     */
    getSidebarMenuSelectKey = () => {
      NProgress.start();
      const { state, props } = this;
      let currentMenuPathName = '';
      const currentMenuPathNameArr = props.history.location.pathname.split('/');
      currentMenuPathName += currentMenuPathNameArr[2];
      currentMenuPathName += currentMenuPathNameArr[3];

      let currentRouteMenu = null;
      state.sideBarMenuList.forEach(menuItem => {
        if (currentRouteMenu) {
          // 已找到对应的菜单退出循环
          return false;
        }
        menuItem.children.forEach(menuItemChildItem => {
          let menuPathName = '';
          const menuPathNameArr = menuItemChildItem.path.split('/');
          menuPathName += menuPathNameArr[2];
          menuPathName += menuPathNameArr[3];
          if (currentMenuPathName === menuPathName) {
            currentRouteMenu = menuItemChildItem;
            // 已找到对应的菜单退出循环
            return false;
          }
        });
      });

      NProgress.done();
      return currentRouteMenu != null ? currentRouteMenu.key : '1';
    };

    render() {
      const { state, props } = this;
      return (
        <section
          className={`layout-system-sidebar-container ${props.systemSidebarIsCollapse ? 'collapse' : ''}`}>
          <section className="logo-container">
            <NavLink to="/">新创文化艺术品</NavLink>
          </section>
          <Menu
            // 折叠状态默认不展开菜单
            defaultOpenKeys={props.systemSidebarIsCollapse ? [] : ['1', '2', '3']}
            // 监听路由变化更新当前选中的菜单
            selectedKeys={[this.getSidebarMenuSelectKey()]}
            mode="inline"
            theme="dark"
            inlineCollapsed={props.systemSidebarIsCollapse}
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
                  {sideBarMenuListItem.children.map(sideBarMenuListItemChildrenItem => {
                    return (
                      // 二级路由
                      <Menu.Item
                        key={sideBarMenuListItemChildrenItem.key}
                        onClick={() => {
                          // 刷新路由 如果当前路由和菜单点击的路由相同则不触发
                          if (props.location.pathname !== sideBarMenuListItemChildrenItem.path) {
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
    }
  }
));
