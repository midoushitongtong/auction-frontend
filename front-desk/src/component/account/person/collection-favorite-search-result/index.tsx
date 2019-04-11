import React from 'react';
import { Row, Col, Pagination } from 'antd';
import Router from 'next/router';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { AppState } from '../../../../store';
import BrowserUtil from '../../../../util/browser';
import CommonCollectionItem from '../../../common/collection-item';
import './index.less';

// 当前组件的类型声明
interface ConnectState {
  // 当前我的收藏品的搜索条件
  currentAccountPersonCollectionFavoriteSearchCondition: any;
  // 我的收藏品搜索的结果集
  accountPersonCollectionFavoriteSearchResult: any;
}

interface ConnectDispatch {
}

interface Props extends ConnectState, ConnectDispatch {
}

interface State {
}

// 当前组件类
export default compose<React.ComponentClass>(
  connect<ConnectState, ConnectDispatch, Props>(
    (state: any | AppState) => ({
      currentAccountPersonCollectionFavoriteSearchCondition: state.accountPerson.currentAccountPersonCollectionFavoriteSearchCondition,
      accountPersonCollectionFavoriteSearchResult: state.accountPerson.accountPersonCollectionFavoriteSearchResult
    })
  )
)(
  class AccountPersonCollectionDetail extends React.Component<Props, State> {
    public shouldComponentUpdate = (nextProps: any): boolean => {
      const { props } = this;
      if (props.accountPersonCollectionFavoriteSearchResult === nextProps.accountPersonCollectionFavoriteSearchResult) {
        // 如果当前我的收藏品搜索的结果集相同, 不更新 dom
        return false;
      }
      return true;
    };

    /**
     * 分页数据改变
     *
     * @param current
     * @param pageSize
     */
    public paginationChange = (current: any, pageSize: any): void => {
      const { props } = this;
      setTimeout(() => BrowserUtil.scrollToTop(233), 100);
      Router.push({
        pathname: '/account/person/collection-favorite',
        query: {
          ...props.currentAccountPersonCollectionFavoriteSearchCondition,
          current,
          pageSize
        }
      });
    };

    public render = (): JSX.Element => {
      const { props } = this;
      return (
        <section className="account-person-collection-favorite-search-result-container">
          <Row className="collection-list-container" type="flex">
            {props.accountPersonCollectionFavoriteSearchResult.itemList.map((collectionListItem: any) => (
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
              showSizeChanger
              current={parseInt(props.currentAccountPersonCollectionFavoriteSearchCondition.current)}
              pageSize={parseInt(props.currentAccountPersonCollectionFavoriteSearchCondition.pageSize)}
              total={parseInt(props.accountPersonCollectionFavoriteSearchResult.total)}
              onChange={this.paginationChange}
              onShowSizeChange={this.paginationChange}
            />
          </section>
        </section>
      );
    };
  }
);
