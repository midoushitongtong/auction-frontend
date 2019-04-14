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
import './index.less';

// 当前组件的类型声明
interface ConnectState {
  siteInfo: any;
  // 收藏品的搜索条件
  collectionSearchCondition: any;
}

interface ConnectDispatch {
  // 修改当前收藏品的搜索条件
  updateCurrentCollectionSearchCondition: (currentCollectionSearchCondition: any) => object;
  // 修改收藏品的搜索条件
  updateCollectionSearchCondition: (collectionSearchCondition: any) => object;
  // 修改当前收藏品的搜索结果集
  updateCollectionSearchResult: (collectionSearchResult: any) => object;
}

interface Props extends ConnectState, ConnectDispatch {
}

interface State {
}

// 当前组件类
export default compose<React.ComponentClass>(
  connect<ConnectState, ConnectDispatch, Props>(
    (state: any | AppState) => ({
      siteInfo: state.site.siteInfo,
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

      // 请求 api =======================
      // 获取收藏品的搜索条件 (全局只需获取一次, 从 redux 中获取, 如果获取了就无需再次获取)
      let result1: any = null;
      if (store.getState().collection.collectionSearchCondition.isGet === undefined) {
        result1 = api.collection.selectCollectionSearchCondition();
      }

      // 获取收藏品的搜索结果集
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
      let result2: any = api.collection.selectCollectionList(searchCondition);

      // 等待 api 响应完成 =======================
      if (store.getState().collection.collectionSearchCondition.isGet === undefined) {
        result1 = await result1;
      }
      result2 = await result2;

      // 处理 api 响应数据 =======================
      // 获取收藏品的搜索条件 (全局只需获取一次, 从 redux 中获取, 如果获取了就无需再次获取)
      if (store.getState().collection.collectionSearchCondition.isGet === undefined) {
        let collectionSearchCondition: any = {};
        if (parseInt(result1.code) === 0) {
          collectionSearchCondition = {
            categoryList: result1.data
          };
          collectionSearchCondition.isGet = true;
        }
        store.dispatch(updateCollectionSearchCondition(collectionSearchCondition));
      }

      // 获取收藏品的搜索结果集
      if (result2.code == '0') {
        const collectionSearchResult = {
          itemList: result2.data.map((item: any) => ({
            id: item.id,
            imagePath: item.goods_logo,
            lot: item.id,
            author: item.goods_spec,
            name: item.goods_title,
            isFavorite: false,
            expectPrice: item.market_price + '-' + item.selling_price
          })),
          current: result2.page.current_page,
          pageSize: result2.page.per_page,
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
      const { props } = this;
      return (
        <section className="app-container">
          <LayoutHeader/>
          <Head>
            <title>收藏品查询 - {props.siteInfo.title}</title>
          </Head>
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
