import React from 'react';
import HeaderAction from './action';
import HeaderTop from './top';
import HeaderNav from './nav';
import './index.scss';

// 当前组件的类型声明
interface Props {
}

interface State {
  // 屏幕宽度发生变化触发的定时器
  reSizeTimeOut: any;
}

// 当前组件类
export default class LayoutHeader extends React.Component<Props, State> {
  public state: State = {
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
    const operationContainerElem = document.querySelector('.operation-container');
    if (operationContainerElem) {
      if (isShow) {
        operationContainerElem.classList.add('mobile-active');
      } else {
        operationContainerElem.classList.remove('mobile-active');
      }
    }
  };

  /**
   * 隐藏 / 显示(移动端样式) - 菜单
   *
   */
  public toggleMobileHeaderNavContainer = (isShow: boolean): void => {
    const bodyElem = document.querySelector('body');
    const rootElem = document.querySelector('#__next');
    const headerNavContainer = document.querySelector('.header-nav-container');
    if (bodyElem && rootElem && headerNavContainer) {
      if (isShow) {
        bodyElem.classList.add('mobile-active');
        rootElem.classList.add('mobile-active');
        headerNavContainer.classList.add('mobile-active');
      } else {
        bodyElem.classList.remove('mobile-active');
        rootElem.classList.remove('mobile-active');
        headerNavContainer.classList.remove('mobile-active');
      }
    }
  };

  public render = (): JSX.Element => {
    return (
      <section className="layout-header-container">
        <HeaderAction/>
        <HeaderTop
          toggleMobileHeaderNavContainer={this.toggleMobileHeaderNavContainer}
          toggleMobileSearchContainer={this.toggleMobileSearchContainer}
        />
        <HeaderNav
          toggleMobileHeaderNavContainer={this.toggleMobileHeaderNavContainer}
        />
      </section>
    );
  };
}
