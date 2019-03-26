import React from 'react';
import { Menu, Icon } from 'antd';
import Link from 'next/link';
import { withRouter, WithRouterProps } from 'next/router';
import './index.scss';

// 当前组件的类型声明
interface Props extends WithRouterProps {

}

interface State {
  // 菜单列表
  personNavList: any[];
}

// 当前组件类
export default withRouter(
  class AccountPersonNav extends React.Component<Props, State> {
    constructor(props: any) {
      super(props);
      this.state = {
        personNavList: [
          {
            key: '1',
            icon: 'heart',
            name: '我的收藏',
            path: '/account/person/collection-favorite'
          },
          {
            key: '2',
            icon: 'user',
            name: '我的信息',
            path: '/account/person/info'
          }
        ]
      };
    }


    /**
     * 获取当前的 url 对应的菜单 key
     *
     */
    public getPersonNavSelectKey = (personNavList: any[], currentPathName: any): string => {
      // 更新菜单激活样式 =====
      // 当前 url 的路径
      const currentPathNameArr = currentPathName.split('/');

      // 当前 url 的路径匹配的菜单
      let currentRouteNav: any = null;
      // 遍历所有菜单, 获取与当前 url 的路径匹配的菜单
      personNavList.forEach(navItem => {
        if (currentRouteNav) return false;
        // 无二级菜单, 匹配一级菜单
        if (navItem.path) {
          const navItemPathNameArr = navItem.path.split('/');
          if (navItemPathNameArr[3] === currentPathNameArr[3]) {
            currentRouteNav = navItem;
          }
        }
      });

      return currentRouteNav !== null ? currentRouteNav.key : '1';
    };

    public render = (): JSX.Element => {
      const { props, state } = this;
      return (
        <section className="account-person-nav-container">
          <Menu
            defaultSelectedKeys={['1']}
            selectedKeys={[this.getPersonNavSelectKey(state.personNavList, props.router && props.router.asPath)]}
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
          {/* 移动端菜单 */}
          <section className="mobile-account-person-nav-container">
            <section className="person-nav-list-container">
              {state.personNavList.map((item, index) => (
                <Link href={item.path} key={index}>
                  <a href={item.path} className={this.getPersonNavSelectKey(state.personNavList, props.router && props.router.asPath) === item.key ? 'active' : ''}>
                    <span>{item.name}</span>
                  </a>
                </Link>
              ))}
            </section>
            <section className="left-mask"/>
            <section className="right-mask"/>
          </section>
        </section>
      );
    }
  }
);
