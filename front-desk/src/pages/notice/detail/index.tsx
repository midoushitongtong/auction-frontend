import React from 'react';
import Head from 'next/head';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { AppState } from '../../../store';
import {
  updateNoticeSearchDetail
} from '../../../store/notice';
import LayoutHeader from '../../../component/layout/header';
import LayoutFooter from '../../../component/layout/footer';
import NoticeSearchDetail from '../../../component/notice/search-detail';
import api from '../../../api';
import './index.less'

// 当前组件的类型声明
interface ConnectState {
  siteInfo: any;
}

interface ConnectDispatch {
  // 修改公告的搜索详情
  updateNoticeSearchDetail: (noticeSearchDetail: any) => object;
}

interface Props extends ConnectState, ConnectDispatch {
  // 公告的搜索详情
  noticeSearchDetail: any;
}

interface State {
}

// 当前组件类
export default compose<React.ComponentClass>(
  connect<ConnectState, ConnectDispatch, Props>(
    (state: any | AppState) => ({
      siteInfo: state.site.siteInfo
    }),
    {
      updateNoticeSearchDetail
    }
  )
)(
  class NoticeDetail extends React.Component<Props, State> {
    public static getInitialProps = async ({ store, query }: any) => {
      // 获取当前公告搜索条件
      const id: string = query.id;

      // 获取公告详情
      const result: any = await api.notice.selectNoticeDetail(id);
      let noticeSearchDetail: any = {};
      if (parseInt(result.code) === 0) {
        noticeSearchDetail = {
          id: result.data[0].id,
          title: result.data[0].title,
          createdAt: result.data[0].time,
          content: result.data[0].content,
          category: result.data[0].cate + ''
        };
        store.dispatch(updateNoticeSearchDetail(noticeSearchDetail));
      } else {
        // 返回数据错误, 显示 404 页面
        throw new Error('404');
      }

      return {
        noticeSearchDetail
      };
    };

    public render = (): JSX.Element => {
      const { props } = this;
      return (
        <section className="app-container">
          <LayoutHeader/>
          <Head>
            <title>{props.noticeSearchDetail.title} - {props.siteInfo.title}</title>
          </Head>
          <section className="notice-container">
            <section className="notice-wrapper-container">
              <section className="notice-wrapper-inner-container">
                <NoticeSearchDetail/>
              </section>
            </section>
          </section>
          <LayoutFooter/>
        </section>
      );
    };
  }
);
