import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import './index.scss';

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
                <section className="action-item-group">
                  <p>帮助中心</p>
                  <ul>
                    <li>
                      <a href="javascript:void(0)">买家指南</a>
                    </li>
                    <li>
                      <a href="javascript:void(0)">卖家指南</a>
                    </li>
                  </ul>
                </section>
                <section className="action-item-group contact-action-item-group">
                  <p>联系我们</p>
                  <ul>
                    <li><span>地址</span>{props.siteInfo.contactAddress}</li>
                    <li><span>电话</span>{props.siteInfo.contactPhone}</li>
                    <li><span>邮箱</span>{props.siteInfo.contactEmail}</li>
                    <li><span>传真</span>{props.siteInfo.fax}</li>
                  </ul>
                </section>
              </section>
              <section className="action-right-container">
                <p>微信公众号</p>
                <img
                  src={props.siteInfo.qrCode}
                  alt="微信公众号"/>
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
