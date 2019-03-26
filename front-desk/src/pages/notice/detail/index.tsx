import React from 'react';
import Head from 'next/head';
import LayoutHeader from '../../../component/layout/header';
import LayoutFooter from '../../../component/layout/footer';
import NoticeSearchDetail from '../../../component/notice/search-detail';
import api from '../../../api';
import './index.scss'
import { AppState } from "../../../store";
import { compose } from 'redux';
import { connect } from 'react-redux';

// 当前组件的类型声明
interface ConnectState {
  siteInfo: any;
}

interface ConnectDispatch {

}

interface Props extends ConnectState, ConnectDispatch {
  // 搜索到的公告详情
  notice: any;
}

interface State {
}

// 当前组件类
export default compose<React.ComponentClass>(
  connect<ConnectState, ConnectDispatch, Props>(
    (state: any | AppState) => ({
      siteInfo: state.site.siteInfo
    }),
    {}
  )
)(
  class NoticeDetail extends React.Component<Props, State> {
    public static getInitialProps = async ({ query }: any) => {
      // 获取当前公告搜索条件
      const id: string = query.id;
      // 获取公告详情
      const result: any = await api.notice.selectNoticeDetail(id);
      let notice: any = {};
      console.log(notice);
      if (parseInt(result.code) === 0) {
        notice = {
          id: result.data[0].id,
          title: result.data[0].title,
          createdAt: result.data[0].time,
          content: result.data[0].content
        }
      }
      return {
        notice
      };
    };

    public render = (): JSX.Element => {
      const { props } = this;
      return (
        <section className="app-container">
          <LayoutHeader/>
          <Head>
            <title>{props.notice.title} - {props.siteInfo.companyName}</title>
          </Head>
          <section className="notice-container">
            <section className="notice-wrapper-container">
              <section className="notice-wrapper-inner-container">
                <NoticeSearchDetail notice={props.notice}/>
              </section>
            </section>
          </section>
          <LayoutFooter/>
        </section>
      );
    };
  }
);
