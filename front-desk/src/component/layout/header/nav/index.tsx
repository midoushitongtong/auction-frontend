import React from 'react';
import { Menu, Icon } from 'antd';
import { withRouter, WithRouterProps } from 'next/router';
import { compose } from 'redux';
import { connect } from 'react-redux';
import Link from 'next/link';
import './index.scss';

// 当前组件的类型声明
// antd 菜单 model
enum HeaderNavMode {
  HORIZONTAL = 'horizontal',
  INLINE = 'inline'
}

interface ConnectState {
  // 公告分类
  noticeCategory: any;
  // 公告搜索条件(公告分类改变, 触发更新props, 更新当前选中菜单的 key)
  currentNoticeSearchCondition: any;
  // 公告的搜索详情
  noticeSearchDetail: any;
}

interface ConnectDispatch {

}

interface Props extends WithRouterProps, ConnectState, ConnectDispatch {
  toggleMobileHeaderNavContainer: any;
}

interface State {
  // 菜单模式[垂直, 水平]
  headerNavMode: HeaderNavMode;
  // 菜单列表
  headerNavList: any[];
  // 菜单选中的 key
  headerNavSelectKey: string;
}

// 当前组件类
export default compose<React.ComponentClass>(
  connect<ConnectState, ConnectDispatch, Props>(
    (state: any) => ({
      noticeCategory: state.notice.noticeCategory,
      currentNoticeSearchCondition: state.notice.currentNoticeSearchCondition,
      noticeSearchDetail: state.notice.noticeSearchDetail
    }),
    {}
  ),
  withRouter
)(
  class HeaderNav extends React.Component<Props, State> {
    // 屏幕宽度发生变化触发的定时器
    public reSizeTimeOut: any = null;

    constructor(props: any) {
      super(props);

      // 把公告分类构建成导航
      const noticeCategory = props.noticeCategory.itemList.map((item: any) => {
        return {
          key: item.id + '',
          name: item.name,
          children: item.children
            ? item.children.map((itemChild: any) => {
              return {
                key: itemChild.id + '',
                name: itemChild.name,
                path: `/notice/${itemChild.id}`
              };
            })
            : []
        };
      });
      const headerNavList = [
        { key: '100', name: '首页', path: '/home' },
        { key: '200', name: '收藏品查询', path: '/collection' },
        ...noticeCategory
      ];

      this.state = {
        headerNavMode: HeaderNavMode.HORIZONTAL,
        headerNavList,
        headerNavSelectKey: this.getHeaderNavSelectKey(headerNavList, props.router && props.router.asPath)
      };
    }

    public shouldComponentUpdate = (nextProps: Props): boolean => {
      const { props } = this;
      if (props.currentNoticeSearchCondition != nextProps.currentNoticeSearchCondition) {
        // 因为动态路由不会触发更新条件
        // 需要根据当前的公告分类, 更新选中菜单的 key
        this.setState({
          headerNavSelectKey: nextProps.currentNoticeSearchCondition.category
        });
      }
      if (props.noticeSearchDetail != nextProps.noticeSearchDetail) {
        // 因为动态路由不会触发更新条件
        // 需要根据当前的公告的搜索详情, 更新选中菜单的 key
        this.setState({
          headerNavSelectKey: nextProps.noticeSearchDetail.category
        });
      }
      return true;
    };

    public componentDidMount = (): void => {
      // 监听页面宽度发生变化移除手机端样式
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
      clearInterval(this.reSizeTimeOut);
      // 添加定时器防抖动
      this.reSizeTimeOut = setTimeout(this.handlerReSize, 500);
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
    public getHeaderNavSelectKey = (headerNavList: any[], currentPathName: any): string => {
      const { props } = this;
      // 根路由解析为 home
      if (currentPathName === '/') {
        currentPathName = '/home';
      }
      const currentPathNameArr = currentPathName.split('/');

      // 当前 url 的路径匹配的菜单
      let currentRouteNav: any = null;
      // 遍历所有菜单, 获取与当前 url 的路径匹配的菜单
      headerNavList.forEach(navItem => {
        if (currentRouteNav) return false;
        // 无二级菜单, 匹配一级菜单
        if (!navItem.children && navItem.path) {
          const navItemPathNameArr = navItem.path.split('/');
          // 比如 home === home
          if (navItemPathNameArr[1] === currentPathNameArr[1]) {
            currentRouteNav = navItem;
          }
        }
        // 有二级菜单, 匹配二级菜单
        if (navItem.children) {
          navItem.children.forEach((childrenNavItem: any) => {
            if (currentRouteNav) return false;
            if (childrenNavItem.path) {
              const childrenNavItemPathNameArr = childrenNavItem.path.split('/');
              // 比如 notice === notice
              if (childrenNavItemPathNameArr[1] === currentPathNameArr[1]) {
                switch (currentPathNameArr[1]) {
                  // 如果是 公告 单独处理(/notice/1)
                  case 'notice':
                    // 如果是 公告 详情单独处理(/notice/detail/52)
                    if (currentPathNameArr[2] === 'detail') {
                      if (childrenNavItem.key === props.noticeSearchDetail.category) {
                        currentRouteNav = childrenNavItem;
                      }
                    } else {
                      if (childrenNavItem.key === props.currentNoticeSearchCondition.category) {
                        currentRouteNav = childrenNavItem;
                      }
                    }
                    break;
                  default:
                    currentRouteNav = childrenNavItem;
                }
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
              selectedKeys={[state.headerNavSelectKey]}
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
                      {item.children.map((itemChild: any) => (
                        <Menu.Item key={itemChild.key}>
                          {/* 公告连接单独处理 */}
                          {itemChild.path.split('/')[1] === 'notice'
                            ? (
                              <Link href={`/notice?id=${itemChild.key}`} as={`/notice/${itemChild.key}`}>
                                <a href={`/notice/${itemChild.key}`}>{itemChild.name}</a>
                              </Link>
                            )
                            : (
                              <Link href={itemChild.path ? itemChild.path : ''}>
                                <a href={itemChild.path ? itemChild.path : ''}>{itemChild.name}</a>
                              </Link>
                            )}
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
) as any;
