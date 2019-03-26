import React from 'react';
import Link from 'next/link';
import { compose } from 'redux';
import { connect } from 'react-redux';
import './index.scss';

// 当前组件的类型声明
interface ConnectState {
  // redux 存储的用户信息
  userInfo: any,
  siteInfo: any;
}

interface ConnectDispatch {
}

interface Props extends ConnectState, ConnectDispatch {
}

interface State {
}

// 当前组件类
export default compose<React.ComponentClass>(
  connect<ConnectState, ConnectDispatch, Props>(
    (state: any) => ({
      userInfo: state.account.userInfo,
      siteInfo: state.site.siteInfo
    }),
    {}
  )
)(
  class HeaderAction extends React.Component<Props, State> {
    public render = (): JSX.Element => {
      const { props } = this;
      return (
        <section className="header-action-container">
          <section className="header-action-inner-container">
            <section className="hello">
              <Link href="/home">
                <a href="/home" style={{color: 'rgba(0, 0, 0, 0.65)'}}>
                  <span>欢迎来到 {props.siteInfo.companyName}</span>
                </a>
              </Link>
            </section>
            <section className="action-tooltip">
              {/*{props.userInfo.id*/}
                {/*? (*/}
                  {/*<section>*/}
                    {/*<Link href="/account/person/info">*/}
                      {/*<a href="/account/person/info" style={{color: 'rgba(0, 0, 0, 0.65)'}}>*/}
                        {/*<span>个人中心</span>*/}
                      {/*</a>*/}
                    {/*</Link>*/}
                  {/*</section>*/}
                {/*)*/}
                {/*: (*/}
                  {/*<section>*/}
                    {/*<Link href="/account/sign-in">*/}
                      {/*<a href="/account/sign-in" className="separation" style={{color: 'rgba(0, 0, 0, 0.65)'}}>*/}
                        {/*<span>登陆</span>*/}
                      {/*</a>*/}
                    {/*</Link>*/}
                    {/*<Link href="/account/sign-up">*/}
                      {/*<a href="/account/sign-up" style={{color: 'rgba(0, 0, 0, 0.65)'}}>*/}
                        {/*<span>注册</span>*/}
                      {/*</a>*/}
                    {/*</Link>*/}
                  {/*</section>*/}
                {/*)}*/}
              <section>
                <Link href="/account/person/collection-favorite">
                  <a href="/account/person/collection-favorite" className="separation" style={{color: 'rgba(0, 0, 0, 0.65)'}}>
                    <span>个人中心</span>
                  </a>
                </Link>
                <Link href="/account/sign-in">
                  <a href="/account/sign-in" className="separation" style={{color: 'rgba(0, 0, 0, 0.65)'}}>
                    <span>登陆</span>
                  </a>
                </Link>
                <Link href="/account/sign-up">
                  <a href="/account/sign-up" style={{color: 'rgba(0, 0, 0, 0.65)'}}>
                    <span>注册</span>
                  </a>
                </Link>
              </section>
            </section>
          </section>
        </section>
      );
    };
  }
);
