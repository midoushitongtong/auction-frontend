import React from 'react';
import Head from 'next/head';
import LayoutHeader from '../../../component/layout/header';
import LayoutFooter from '../../../component/layout/footer';
import CollectionSearchDetail from '../../../component/collection/search-detail';
import api from '../../../api';
import './index.scss'

// 当前组件的类型声明
interface Props {
  // 搜索到的收藏品详情
  collection: any;
}

interface State {
}

// 当前组件类
export default class CollectionDetail extends React.Component<Props, State> {
  public static getInitialProps = async ({ query }: any) => {
    // 获取当前收藏品的搜索条件
    const id: string = query.id;
    // 获取收藏品详情
    const result: any = await api.collection.selectCollectionDetail(id);
    console.log(result);
    let collection: any = {};
    if (parseInt(result.code) === 0) {
      collection = result.data;
    }
    return {
      collection
    };
  };

  public render = (): JSX.Element => {
    const { props } = this;
    return (
      <section className="app-container">
        <Head>
          <title>拍品详情 - 新创文化艺术品</title>
        </Head>
        <LayoutHeader/>
        <section className="collection-detail-container">
          <section className="collection-detail-wrapper-container">
            <section className="collection-detail-wrapper-inner-container">
              <CollectionSearchDetail collection={props.collection}/>
            </section>
          </section>
        </section>
        <LayoutFooter/>
      </section>
    );
  };
}
