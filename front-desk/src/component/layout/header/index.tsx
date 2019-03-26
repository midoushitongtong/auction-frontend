import React from 'react';
import HeaderAction from './action/index';
import HeaderTop from './top/index';
import HeaderNav from './nav/index';
import { compose } from 'redux';
import { connect } from 'react-redux';
import Head from 'next/head';
import './index.scss';

// 当前组件的类型声明
interface ConnectState {
  siteInfo: any;
}

interface ConnectDispatch {

}

interface Props extends ConnectState, ConnectDispatch {
  // 隐藏顶部操作栏
  hiddenHeaderAction: boolean;
  // 隐藏顶部内容
  hiddenHeaderTop: boolean;
  // 隐藏顶部菜单
  hiddenHeaderNav: boolean;
}

interface State {

}

// 当前组件类
export default compose<React.ComponentClass>(
  connect<ConnectState, ConnectDispatch, Props>(
    (state: any) => ({
      siteInfo: state.site.siteInfo
    }),
    {}
  )
)(
  class LayoutHeader extends React.Component<Props, State> {
    static defaultProps = {
      hiddenHeaderAction: false,
      hiddenHeaderTop: false,
      hiddenHeaderNav: false
    };
    // 屏幕宽度发生变化触发的定时器
    public reSizeTimeOut: any = null;

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
        // 移除移动端样式
        this.toggleMobileSearchContainer(false);
        this.toggleMobileHeaderNavContainer(false);
      }
    };

    /**
     * 隐藏 / 显示(移动端样式) - 搜索框
     *
     */
    public toggleMobileSearchContainer = (isShow: boolean): void => {
      const htmlElem = document.querySelector('html');
      const operationContainerElem = document.querySelector('.operation-container');
      if (htmlElem && operationContainerElem) {
        if (isShow) {
          htmlElem.classList.add('mobile-active');
          operationContainerElem.classList.add('mobile-active');
        } else {
          htmlElem.classList.remove('mobile-active');
          operationContainerElem.classList.remove('mobile-active');
        }
      }
    };

    /**
     * 隐藏 / 显示(移动端样式) - 菜单
     *
     */
    public toggleMobileHeaderNavContainer = (isShow: boolean): void => {
      const htmlElem = document.querySelector('html');
      const rootElem = document.querySelector('#__next');
      const headerNavContainer = document.querySelector('.header-nav-container');
      if (htmlElem && rootElem && headerNavContainer) {
        if (isShow) {
          htmlElem.classList.add('mobile-active');
          rootElem.classList.add('mobile-active');
          headerNavContainer.classList.add('mobile-active');
        } else {
          htmlElem.classList.remove('mobile-active');
          rootElem.classList.remove('mobile-active');
          headerNavContainer.classList.remove('mobile-active');
        }
      }
    };

    public render = (): JSX.Element => {
      const { props } = this;
      return (
        <section className="layout-header-container">
          <Head>
            <title>{props.siteInfo.title}</title>
            <meta name="keywords" content={props.siteInfo.seoKeyword}/>
          </Head>
          {props.hiddenHeaderAction
            ? null
            : (
              <HeaderAction/>
            )}
          {props.hiddenHeaderTop
            ? null
            : (
              <HeaderTop
                toggleMobileHeaderNavContainer={this.toggleMobileHeaderNavContainer}
                toggleMobileSearchContainer={this.toggleMobileSearchContainer}
              />
            )}
          {props.hiddenHeaderNav
            ? null
            : (
              <HeaderNav
                toggleMobileHeaderNavContainer={this.toggleMobileHeaderNavContainer}
              />
            )}
        </section>
      );
    };
  }
) as any;
