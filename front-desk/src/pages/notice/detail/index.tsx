import React from 'react';
import Head from 'next/head';
import LayoutHeader from '../../../component/layout/header';
import LayoutFooter from '../../../component/layout/footer';
import NoticeSearchDetail from '../../../component/notice/search-detail';
import api from '../../../api';
import './index.scss'

// 当前组件的类型声明
interface Props {
  // 搜索到的公告详情
  notice: any;
}

interface State {
}

// 当前组件类
export default class NoticeDetail extends React.Component<Props, State> {
  public static getInitialProps = async ({ query }: any) => {
    // 获取当前公告搜索条件
    const id: string = query.id;
    // 获取公告详情
    const result: any = await api.notice.selectDetail(id);
    let notice: any = {};
    if (result.code === '0') {
      notice = result.data;
    }
    return {
      notice
    };
  };

  public render = (): JSX.Element => {
    const { props } = this;
    return (
      <section className="app-container">
        <Head>
          <title>{props.notice.title} - 新创文化艺术品</title>
        </Head>
        <LayoutHeader/>
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
