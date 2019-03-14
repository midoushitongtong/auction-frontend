import React from 'react';
import Head from 'next/head';
import Header from '../../../component/_layout/header';
import Footer from '../../../component/_layout/footer';
import NoticeSearchDetail from '../../../component/notice/search-detail';
import api from '../../../api';
import './index.scss'

// 当前组件的类型声明
interface Props {
  // 搜索到的公告详情
  searchDetail: any;
}

interface State {
}

// 当前组件类
export default class NoticeDetail extends React.Component<Props, State> {
  public static getInitialProps = async ({ query }: any) => {
    // 获取当前公告搜索条件
    const id: string = query.id;
    // 获取公告详情
    const result: any = await api.notice.getDetail(id);
    let searchDetail: any = {};
    if (result.code === '0') {
      searchDetail = result.data;
    }
    return {
      searchDetail
    };
  };

  public render = (): JSX.Element => {
    const { props } = this;
    return (
      <section className="app-container">
        <Head>
          <title>{props.searchDetail.title} - 新创文化艺术品</title>
        </Head>
        <Header/>
        <section className="notice-container">
          <section className="notice-wrapper-container">
            <section className="notice-wrapper-inner-container">
              <NoticeSearchDetail searchDetail={props.searchDetail}/>
            </section>
          </section>
        </section>
        <Footer/>
      </section>
    );
  };
}
