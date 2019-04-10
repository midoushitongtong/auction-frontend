import React from 'react';
import { Row, Col, Pagination } from 'antd';
import Router from 'next/router';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { AppState } from '../../../store';
import CommonCollectionItem from '../../common/collection-item/index';
import BrowserUtil from '../../../util/browser';
import './index.scss';

// 当前组件的类型声明
interface ConnectState {
  // 当前收藏品的搜索条件
  currentCollectionSearchCondition: any;
  // 收藏品的搜索结果集
  collectionSearchResult: any;
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
      currentCollectionSearchCondition: state.collection.currentCollectionSearchCondition,
      collectionSearchResult: state.collection.collectionSearchResult
    }),
    {}
  )
)(
  class CollectionSearchResult extends React.Component<Props, State> {
    public shouldComponentUpdate = (nextProps: any): boolean => {
      const { props } = this;
      if (props.collectionSearchResult === nextProps.collectionSearchResult) {
        // 如果当前收藏品搜索的结果集相同, 不更新 dom
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
        pathname: '/collection',
        query: {
          ...props.currentCollectionSearchCondition,
          current,
          pageSize
        }
      });
    };

    public render = (): JSX.Element => {
      const { props } = this;
      return (
        <section className="collection-search-result-container">
          <Row className="collection-list-container" type="flex">
            {props.collectionSearchResult.itemList.map((collectionListItem: any) => (
              <Col
                className="col"
                key={collectionListItem.id}
                span={12}
                lg={6}
                md={8}
                sm={12}
              >
                <CommonCollectionItem collection={{
                  ...collectionListItem,
                  id: 11
                }}/>
              </Col>
            ))}
          </Row>
          <section className="collection-pagination-container">
            <Pagination
              showSizeChanger
              current={parseInt(props.currentCollectionSearchCondition.current)}
              pageSize={parseInt(props.currentCollectionSearchCondition.pageSize)}
              total={parseInt(props.collectionSearchResult.total)}
              onChange={this.paginationChange}
              onShowSizeChange={this.paginationChange}
            />
          </section>
        </section>
      );
    };
  }
);
