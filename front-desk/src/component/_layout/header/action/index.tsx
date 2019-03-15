import React from 'react';
import { compose } from 'redux';
import Link from 'next/link';
import './index.scss';
import { connect } from 'react-redux';

// 当前组件的类型声明
interface ConnectState {
  // redux 存储的用户信息
  userInfo: any
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
      userInfo: state.account.userInfo
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
              欢迎来到 新创文化艺术品
            </section>
            <section className="action-tooltip">
              {props.userInfo.id
                ? (
                  <section>
                    <Link href="/account/person">
                      <a href="/account/person">
                        <span>个人中心</span>
                      </a>
                    </Link>
                  </section>
                )
                : (
                  <section>
                    <Link href="/account/sign-in">
                      <a href="/account/sign-in" className="separation">
                        <span>登陆</span>
                      </a>
                    </Link>
                    <Link href="/account/sign-up">
                      <a href="/account/sign-up">
                        <span>注册</span>
                      </a>
                    </Link>
                  </section>
                )}
            </section>
          </section>
        </section>
      );
    };
  }
);
