import React from 'react';
import { Menu, Icon } from 'antd';
import Link from 'next/link';
import { withRouter, WithRouterProps } from 'next/router';
import './index.scss';

// 当前组件的类型声明
// antd 菜单
interface NavItem {
  // 菜单 key
  key: string;
  // 菜单名称
  name: string;
  // 菜单跳转路径
  path: string;
  // 菜单的图标
  icon?: string;
}

interface Props extends WithRouterProps{

}

interface State {
  // 菜单列表
  personNavList: NavItem[];
}

// 当前组件类
export default  withRouter(
  class AccountPersonNav extends React.Component<Props, State> {
  public state: State = {
    personNavList: [
      { key: '1', icon: 'user', name: '我的信息', path: '/account/person/info' },
      { key: '2', icon: 'heart', name: '我的收藏', path: '/account/person/collection' }
    ]
  };

  /**
   * 获取当前的 url 对应的菜单 key
   *
   */
  public getPersonNavSelectKey = (): string => {
    const { state, props } = this;

    // 更新菜单激活样式 =====
    // 当前 url 的路径
    const currentPathName = props.router && props.router.pathname.split('/')[3];

    // 当前 url 的路径匹配的菜单
    let currentRouteNav: any | NavItem = null;
    // 遍历所有菜单, 获取与当前 url 的路径匹配的菜单
    state.personNavList.forEach(navItem => {
      if (currentRouteNav) return false;
      // 无二级菜单, 匹配一级菜单
      if (navItem.path) {
        const navItemPathName = navItem.path.split('/')[3];
        if (navItemPathName === currentPathName) {
          currentRouteNav = navItem;
        }
      }
    });

    return currentRouteNav !== null ? currentRouteNav.key : '1';
  };

  public render = (): JSX.Element => {
    const { state } = this;
    return (
      <section className="account-person-nav-container">
        <Menu
          defaultSelectedKeys={['1']}
          selectedKeys={[this.getPersonNavSelectKey()]}
          mode="inline"
        >
          {state.personNavList.map(item => (
            <Menu.Item key={item.key}>
              <Link href={item.path}>
                <a href={item.path}>
                  <Icon type={item.icon}/>
                  <span>{item.name}</span>
                </a>
              </Link>
            </Menu.Item>
          ))}
        </Menu>
      </section>
    );
  }
}
);
