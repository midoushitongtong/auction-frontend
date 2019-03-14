import React from 'react';
import Head from 'next/head';
import Header from '../../../component/_layout/header';
import Footer from '../../../component/_layout/footer';
import './index.scss'

// 当前组件的类型声明
interface Props {
  currentSearchCondition: any
}

interface State {
}

// 当前组件类
export default class NoticeDetail extends React.Component<Props, State> {
  public static getInitialProps = async ({query}: any) => {
    // 初始化当前的搜索条件
    const currentSearchCondition = {
      id: query.id
    };
    return {
      currentSearchCondition
    };
  };

  public render = (): JSX.Element => {
    console.log(this.props.currentSearchCondition);
    return (
      <section className="app-container">
        <Head>
          <title>公告详情 - 新创文化艺术品</title>
        </Head>
        <Header/>
        <section className="notice-container">
          <section className="notice-wrapper-container">
            <section className="notice-wrapper-inner-container">
              公告详情
            </section>
          </section>
        </section>
        <Footer/>
      </section>
    );
  };
}
