import React from 'react';
import { Row, Spin, notification, Col, Pagination, Alert } from 'antd';
import Router from 'next/router';
import { withRouter, WithRouterProps } from 'next/router';
import { compose } from 'redux';
import BrowserUtil from '../../../../util/browser';
import CommonCollectionItem from '../../../common/collection-item';
import api from '../../../../api';
import './index.less';

// 当前组件的类型声明
interface Props extends WithRouterProps {
}

interface State {
  // 当前我的收藏品的搜索条件
  currentCollectionFavoriteSearchCondition: any;
  // 我的收藏品搜索的结果集
  collectionFavoriteSearchResult: any;
  // 搜索加载状态
  searchLoading: boolean;
}

// 当前组件类
export default compose<React.ComponentClass>(
  withRouter
)(
  class AccountPersonCollectionFavoriteSearchResult extends React.Component<Props, State> {
    constructor(props: any) {
      super(props);
      this.state = {
        currentCollectionFavoriteSearchCondition: {},
        collectionFavoriteSearchResult: {
          itemList: []
        },
        searchLoading: true
      };
    }

    public shouldComponentUpdate = (nextProps: Props): boolean => {
      const { props } = this;
      // 路由发送改变, 查询获取数据
      if ((props.router && props.router.query) !== (nextProps.router && nextProps.router.query)) {
        this.refreshData(nextProps);
      }
      return true;
    };

    public componentDidMount = () => {
      const { props } = this;
      // 查询获取数据
      this.refreshData(props);
    };

    public refreshData = async (props: Props) => {
      this.setState({
        searchLoading: true
      });
      // 获取当前我的收藏品的搜索条件
      const currentCollectionFavoriteSearchCondition: any = {
        current: props.router && props.router.query && props.router.query.current || '1'
      };

      // 获取我的收藏品的搜索结果集
      let collectionFavoriteSearchResult: any = {
        itemList: []
      };
      // 构建搜索条件
      const searchCondition: any = {};
      if (currentCollectionFavoriteSearchCondition.current != '1') {
        searchCondition.page = currentCollectionFavoriteSearchCondition.current;
      }
      const result1: any = await api.accountPerson.selectCollectionFavoriteList(searchCondition);
      if (parseInt(result1.code) === 0) {
        collectionFavoriteSearchResult = {
          itemList: result1.data.map((item: any) => ({
            id: item.id,
            imagePath: item.goods_logo,
            lot: item.id,
            author: item.goods_spec,
            name: item.goods_title,
            isFavorite: false,
            expectPrice: item.market_price + '-' + item.selling_price
          })),
          current: result1.page.current_page,
          pageSize: result1.page.per_page,
          total: result1.page.total
        };
      } else {
        console.error(result1);
        notification.open({
          placement: 'bottomLeft',
          message: `获取数据失败, 请刷新页面重试`,
          duration: 5
        });
      }

      // 更新数据
      this.setState({
        currentCollectionFavoriteSearchCondition,
        collectionFavoriteSearchResult,
        searchLoading: false
      });
    };

    /**
     * 分页数据改变
     *
     * @param current
     */
    public paginationChange = (current: any): void => {
      setTimeout(() => BrowserUtil.scrollToTop(233), 100);
      Router.push({
        pathname: '/account/person/collection-favorite',
        query: {
          current
        }
      });
    };

    public render = (): JSX.Element => {
      const { state } = this;
      return (
        <section className="account-person-collection-favorite-search-result-container">
          {!state.searchLoading
            ? state.collectionFavoriteSearchResult.itemList.length >= 1
              ? (
                <section>
                  <Row className="collection-list-container" type="flex">
                    {state.collectionFavoriteSearchResult.itemList.map((collectionListItem: any) => (
                      <Col
                        className="col"
                        key={collectionListItem.id}
                        span={12}
                        lg={6}
                        md={8}
                        sm={12}
                      >
                        <CommonCollectionItem collection={collectionListItem}/>
                      </Col>
                    ))}
                  </Row>
                  <section className="collection-pagination-container">
                    <Pagination
                      current={parseInt(state.collectionFavoriteSearchResult.current)}
                      pageSize={parseInt(state.collectionFavoriteSearchResult.pageSize)}
                      total={parseInt(state.collectionFavoriteSearchResult.total)}
                      onChange={this.paginationChange}
                    />
                  </section>
                </section>
              )
              : (
                <Alert
                  message="暂无已收藏的收藏品"
                  type="warning"
                />
              )
            : (
              <section className="loading-container">
                <Spin/>
              </section>
            )}
        </section>
      );
    };
  }
);
