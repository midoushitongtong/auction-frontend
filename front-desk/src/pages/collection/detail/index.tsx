import React from 'react';
import Head from 'next/head';
import LayoutHeader from '../../../component/layout/header';
import LayoutFooter from '../../../component/layout/footer';
import { compose } from 'redux';
import { connect } from 'react-redux';
import CollectionSearchDetail from '../../../component/collection/search-detail';
import api from '../../../api';
import './index.scss'

// 当前组件的类型声明
interface ConnectState {
  siteInfo: any;
}

interface ConnectDispatch {
}

interface Props extends ConnectState, ConnectDispatch {
  // 搜索到的收藏品详情
  collection: any;
}

interface State {
}

// 当前组件类
export default compose<React.ComponentClass>(
  connect<ConnectState, ConnectDispatch, Props>(
    (state: any) => ({
      siteInfo: state.site.siteInfo
    }),
    {}
  )
)(
  class CollectionDetail extends React.Component<Props, State> {
    public static getInitialProps = async ({ query }: any) => {
      // 获取当前收藏品的搜索条件
      const id: string = query.id;
      // 获取收藏品详情
      const result: any = await api.collection.selectCollectionDetail(id);
      let collection: any = {};
      if (parseInt(result.code) === 0) {
        const data = result.data[0];
        collection = {
          lot: data.id,
          description: data.goods_content,
          imagePath: data.goods_logo,
          descriptionList: data.goods_spec,
          carouselList: data.goods_image,
          price: data.market_price + '-' + data.selling_price,
          name: data.goods_title
        };
      }
      return {
        collection
      };
    };

    public render = (): JSX.Element => {
      const { props } = this;
      return (
        <section className="app-container">
          <LayoutHeader/>
          <Head>
            <title>{props.collection.name} - {props.siteInfo.companyName}</title>
          </Head>
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
);
