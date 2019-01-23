import React from 'react';
import Head from 'next/head';
import Header from '../../component/_layout/header';
import Footer from '../../component/_layout/footer';
import './index.scss'

// 当前组件的类型声明
interface Props {
}

interface State {
}

// 当前组件类
export default class Collection extends React.Component<Props, State> {
  public render = (): JSX.Element => {
    return (
      <section className="app-container">
        <Head>
          <title>新创文化艺术品 - 收藏品查询</title>
        </Head>
        <Header/>
        <section className="collection-container">
          <section className="collection-wrapper-container">
            <section className="collection-wrapper-inner-container">
              <h1>收藏品查询</h1>
            </section>
          </section>
        </section>
        <Footer/>
      </section>
    );
  };
}
