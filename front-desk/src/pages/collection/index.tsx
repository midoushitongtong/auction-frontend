import React from 'react';
import Head from 'next/head';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { AppState } from '../../store';
import {
  updateCollectionSearchCondition,
  updateCurrentCollectionSearchCondition,
  updateCollectionSearchResult
} from '../../store/collection';
import LayoutHeader from '../../component/layout/header';
import LayoutFooter from '../../component/layout/footer';
import CollectionSearchCondition from '../../component/collection/search-condition';
import CollectionSearchResult from '../../component/collection/search-result';
import api from '../../api';
import './index.scss'

// 当前组件的类型声明
interface ConnectState {
  // 收藏品的搜索条件
  collectionSearchCondition: any;
}

interface ConnectDispatch {
  // 修改收藏品的搜索条件
  updateCollectionSearchCondition: any;
  // 修改当前收藏品的搜索条件
  updateCurrentCollectionSearchCondition: any;
  // 修改当前收藏品的搜索结果集
  updateCollectionSearchResult: any;
}

interface Props extends ConnectState, ConnectDispatch {

}

interface State {

}

// 当前组件类
export default compose<React.ComponentClass>(
  connect<ConnectState, ConnectDispatch, Props>(
    (state: any | AppState) => ({
      collectionSearchCondition: state.collection.collectionSearchCondition
    }),
    {
      updateCurrentCollectionSearchCondition,
      updateCollectionSearchCondition,
      updateCollectionSearchResult
    }
  )
)(
  class Collection extends React.Component<Props, State> {
    public static getInitialProps = async ({ query, store }: any) => {
      // 获取当前收藏品的搜索条件
      const currentCollectionSearchCondition = {
        parentCategoryId: parseInt(query.parentCategoryId) || 1,
        childrenCategoryId: parseInt(query.childrenCategoryId) || 0,
        keyword: query.keyword || '',
        current: query.current || '1'
      };
      store.dispatch(updateCurrentCollectionSearchCondition(currentCollectionSearchCondition));

      // 获取收藏品的搜索条件(一个页面只需获取一次, 从 redux 中获取, 如果获取了就无需再次获取)
      if (store.getState().collection.collectionSearchCondition.isGet === undefined) {
        let collectionSearchCondition: any = {};
        const result: any = await api.collection.selectCollectionSearchCondition();
        if (result.code === '0') {
          collectionSearchCondition = {
            categoryList: result.data
          };
          collectionSearchCondition.isGet = true;
        }
        store.dispatch(updateCollectionSearchCondition(collectionSearchCondition));
      }

      // 获取收藏品的搜索结果集
      let collectionSearchResult: any = {};
      const searchCondition: any = {};
      if (currentCollectionSearchCondition.childrenCategoryId != 0) {
        searchCondition.cate = currentCollectionSearchCondition.childrenCategoryId;
      }
      if (currentCollectionSearchCondition.keyword != '') {
        searchCondition.goods_spec = currentCollectionSearchCondition.keyword;
      }
      if (currentCollectionSearchCondition.current != '1') {
        searchCondition.page = currentCollectionSearchCondition.current;
      }
      const result2: any = await api.collection.selectCollectionList(searchCondition);
      if (result2.code == '0') {
        collectionSearchResult = {
          itemList: result2.data,
          per_page: result2.page.per_page,
          total: result2.page.total
        };
        store.dispatch(updateCollectionSearchResult(collectionSearchResult));
      }

      return {};
    };

    public componentDidMount = (): void => {
      setTimeout(() => {
        if (window.scrollY === 0) {
          window.scrollTo(0, 1);
          window.scrollTo(0, 0);
        }
      }, 500);
    };

    public render = (): JSX.Element => {
      return (
        <section className="app-container">
          <Head>
            <title>收藏品查询 - 新创文化艺术品</title>
          </Head>
          <LayoutHeader/>
          <section className="collection-container">
            <section className="collection-wrapper-container">
              <section className="collection-wrapper-inner-container">
                {/* 收藏品搜索条件组件 */}
                <CollectionSearchCondition/>
                {/* 收藏品搜索结果列表 */}
                <CollectionSearchResult/>
              </section>
            </section>
          </section>
          <LayoutFooter/>
        </section>
      );
    };
  }
);
