import React from 'react';
import Head from 'next/head';
import { compose } from 'redux';
import { connect } from 'react-redux';
import {
  updateCurrentNoticeSearchCondition,
  updateNoticeSearchResult
} from '../../store/notice';
import LayoutHeader from '../../component/layout/header';
import LayoutFooter from '../../component/layout/footer';
import NoticeSearchResult from '../../component/notice/search-result';
import api from '../../api';
import './index.scss'

// 当前组件的类型声明
interface ConnectState {
}

interface ConnectDispatch {
  // 修改当前公告的搜索条件
  updateCurrentNoticeSearchCondition: any;
  // 修改当前公告的搜索结果集
  updateNoticeSearchResult: any;
}

interface Props extends ConnectState, ConnectDispatch {
}

interface State {

}

// 当前组件类
export default compose<React.Component>(
  connect<ConnectState, ConnectDispatch, Props>(
    () => ({}),
    {
      updateCurrentNoticeSearchCondition,
      updateNoticeSearchResult
    }
  )
)(
  class Notice extends React.Component<Props, State> {
    public static getInitialProps = async ({ query, store }: any) => {
      // 获取当前公告的搜索条件
      const currentNoticeSearchCondition = {
        current: query.current || 1,
        pageSize: query.pageSize || 10
      };
      store.dispatch(updateCurrentNoticeSearchCondition(currentNoticeSearchCondition));

      // 获取公告的搜索结果集
      let noticeSearchResult: any = [];
      const result: any = await api.notice.selectNoticeList(currentNoticeSearchCondition);
      if (parseInt(result.code) === 0) {
        noticeSearchResult = result.data;
        store.dispatch(updateNoticeSearchResult(noticeSearchResult));
      }
      return {};
    };

    public render = (): JSX.Element => {
      return (
        <section className="app-container">
          <Head>
            <title>公告 - 新创文化艺术品</title>
          </Head>
          <LayoutHeader/>
          <section className="notice-container">
            <section className="notice-wrapper-container">
              <section className="notice-wrapper-inner-container">
                <section className="notice-title">
                  <h3>公告</h3>
                </section>
                <NoticeSearchResult/>
              </section>
            </section>
          </section>
          <LayoutFooter/>
        </section>
      );
    };
  }
)

