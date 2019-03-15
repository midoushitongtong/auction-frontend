import React from 'react';
import Head from 'next/head';
import Header from '../../component/_layout/header';
import Footer from '../../component/_layout/footer';
import NoticeSearchResult from '../../component/notice/search-result';
import api from '../../api';
import './index.scss'

// 当前组件的类型声明
interface Props {
  // 当前收藏品搜索的条件(分类, 分类, 关键字等)
  currentSearchCondition: any;
  // 搜索到的公告列表
  searchResult: any;
}

interface State {

}

// 当前组件类
export default class Notice extends React.Component<Props, State> {
  public static getInitialProps = async ({ query }: any) => {
    // 获取当前公告搜索条件
    const currentSearchCondition = {
      current: query.current || 1,
      pageSize: query.pageSize || 10
    };
    // 获取公告列表
    let searchResult: any = [];
    const result: any = await api.notice.selectList(currentSearchCondition);
    if (result.code === '0') {
      searchResult = result.data;
    }
    return {
      currentSearchCondition,
      searchResult
    };
  };

  public render = (): JSX.Element => {
    const { props } = this;
    return (
      <section className="app-container">
        <Head>
          <title>公告 - 新创文化艺术品</title>
        </Head>
        <Header/>
        <section className="notice-container">
          <section className="notice-wrapper-container">
            <section className="notice-wrapper-inner-container">
              <section className="notice-title">
                <h3>公告</h3>
              </section>
              <NoticeSearchResult
                currentSearchCondition={props.currentSearchCondition}
                searchResult={props.searchResult}
              />
            </section>
          </section>
        </section>
        <Footer/>
      </section>
    );
  };
}
