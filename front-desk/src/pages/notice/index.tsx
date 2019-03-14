import React from 'react';
import Head from 'next/head';
import Header from '../../component/_layout/header';
import Footer from '../../component/_layout/footer';
import NoticeSearchList from '../../component/notice/search-list';
import './index.scss'

// 当前组件的类型声明
interface Props {

}

interface State {
  searchResultList: any[]
}

// 当前组件类
export default class Notice extends React.Component<Props, State> {
  // public static getInitialProps = async ({ query }: any) => {
  //   // 初始化当前的搜索条件
  //   const currentSearchCondition = {
  //
  //   };
  //   return {};
  // };

  public render = (): JSX.Element => {
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
              <NoticeSearchList/>
            </section>
          </section>
        </section>
        <Footer/>
      </section>
    );
  };
}
