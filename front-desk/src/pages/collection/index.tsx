import React from 'react';
import Head from 'next/head';
import LayoutHeader from '../../component/layout/header';
import LayoutFooter from '../../component/layout/footer';
import CollectionSearchCondition from '../../component/collection/search-condition';
import CollectionSearchResult from '../../component/collection/search-result';
import api from '../../api';
import './index.scss'

// 当前组件的类型声明

interface Props {
  // 当前收藏品搜索的条件
  currentSearchCondition: any;
  // 收藏品搜索条件
  searchCondition: any,
  // 搜索到的收藏品列表
  searchResult: any
}

interface State {
}

// 当前组件类
export default class Collection extends React.Component<Props, State> {
  public static getInitialProps = async ({ query }: any) => {
    // 获取当前收藏品搜索条件
    const currentSearchCondition = {
      category: query.category || '0',
      transaction: query.transaction || '0',
      area: query.area || '',
      keyword: query.keyword || '',
      current: query.current || '1',
      pageSize: query.pageSize || '10'
    };
    // 获取收藏品搜索条件
    let searchCondition: any = [];
    const result: any = await api.collection.selectSearchCondition();
    if (result.code === '0') {
      searchCondition = result.data;
    }
    // 获取收藏品列表
    let searchResult: any = [];
    const result2: any = await api.collection.selectList(currentSearchCondition);
    if (result2.code == '0') {
      searchResult = result2.data;
    }
    return {
      currentSearchCondition,
      searchCondition,
      searchResult
    };
  };

  public render = (): JSX.Element => {
    const { props } = this;
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
              <CollectionSearchCondition
                currentSearchCondition={props.currentSearchCondition}
                searchCondition={props.searchCondition}
              />
              {/* 收藏品搜索结果列表 */}
              <CollectionSearchResult
                currentSearchCondition={props.currentSearchCondition}
                searchResult={props.searchResult}
              />
            </section>
          </section>
        </section>
        <LayoutFooter/>
      </section>
    );
  };
}

