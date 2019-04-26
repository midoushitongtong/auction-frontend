import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import './index.less';

// 当前组件的类型声明
interface ConnectState {
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
      siteInfo: state.site.siteInfo
    }),
    {}
  ),
)(
  class LayoutFooter extends React.Component<Props, State> {
    public render = (): JSX.Element => {
      const { props } = this;
      return (
        <section className="layout-footer-container">
          <section className="footer-top-container">
            <section className="footer-top-inner-container">
              <section className="action-left-container">
                <section className="action-left-item-group contact">
                  <p>联系我们</p>
                  <ul>
                    <li>
                      <span>地址</span>
                      <span>{props.siteInfo.contactAddress}</span>
                    </li>
                    <li>
                      <span>电话</span>
                      <span>{props.siteInfo.contactPhone}</span>
                    </li>
                    <li>
                      <span>邮箱</span>
                      <span>{props.siteInfo.contactEmail}</span>
                    </li>
                  </ul>
                </section>
                <section className="action-left-item-group friend-link">
                  <p>友情链接</p>
                  <ul>
                    {props.siteInfo.friendLink.map((friendLink: any, index: number) => (
                      <li key={index}>
                        <a href={friendLink.url} target="_blank">{friendLink.name}</a>
                      </li>
                    ))}
                  </ul>
                </section>
              </section>
              <section className="action-right-container">
                <p>微信公众号</p>
                <img
                  src={props.siteInfo.qrCode}
                  alt="微信公众号"
                />
              </section>
            </section>
          </section>
          <section className="footer-bottom-container">
            <section className="footer-bottom-inner-container">
              <p>{props.siteInfo.companyName}</p>
              <p>{props.siteInfo.copyright}</p>
              <p>{props.siteInfo.miitbeian}</p>
            </section>
          </section>
        </section>
      );
    };
  }
);
