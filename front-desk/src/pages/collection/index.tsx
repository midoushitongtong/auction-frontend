import React from 'react';
import Head from 'next/head';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { updateCurrentSearchCondition} from '../../store/collection';
import Header from '../../component/_layout/header';
import Footer from '../../component/_layout/footer';
import CollectionSearchCondition from '../../component/collection/search/condition';
import CollectionSearchList from '../../component/collection/search/list';
import './index.scss'

// 当前组件的类型声明
interface ConnectState {
}

interface ConnectDispatch {
  updateCurrentSearchCondition: any
}

interface Props extends ConnectState, ConnectDispatch {

}

interface State {
}

// 当前组件类
export default compose<React.ComponentClass>(
  connect<ConnectState, ConnectDispatch, Props>(
    () => ({}),
    {
      updateCurrentSearchCondition
    }
  )
)(
  class Collection extends React.Component<Props, State> {
    public static getInitialProps = async ({ store, query }: any) => {
      // 初始化当前的搜索条件
      const currentSearchCondition = {
        category: query.category || '0',
        transaction: query.transaction || '0',
        area: query.area || '',
        keyword: query.keyword || ''
      };
      store.dispatch(updateCurrentSearchCondition(currentSearchCondition));
      return {};
    };

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
                {/* 收藏品搜索条件组件 */}
                <CollectionSearchCondition/>
                {/* 收藏品搜索结果列表 */}
                <CollectionSearchList/>
              </section>
            </section>
          </section>
          <Footer/>
        </section>
      );
    };
  }
);
