import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { AppState } from '../../../store';
import './index.scss'

// 当前组件的类型声明
interface ConnectState {
  // 公告的搜索详情
  noticeSearchDetail: any;
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
    (state: any | AppState) => ({
      noticeSearchDetail: state.notice.noticeSearchDetail
    }),
    {}
  )
)(
  class NoticeSearchDetail extends React.Component<Props, State> {
    public render = (): JSX.Element => {
      const { props } = this;
      return (
        <section className="notice-search-detail-container">
          <section className="notice-description">
            <h3 className="title">{props.noticeSearchDetail.title}</h3>
            <p className="created-at">{props.noticeSearchDetail.createdAt}</p>
          </section>
          <section
            className="notice-content"
            dangerouslySetInnerHTML={{ __html: props.noticeSearchDetail.content }}
          />
        </section>
      );
    };
  }
);
