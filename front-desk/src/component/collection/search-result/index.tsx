import React from 'react';
import { Row, Col, Pagination } from 'antd';
import Router from 'next/router';
import CommonCollectionItem from '../../common/collection-item/index';
import BrowserUtil from '../../../util/browser';
import './index.scss';

// 当前组件的类型声明

interface Props {
  // 当前文章搜索的条件(分页等)
  currentSearchCondition: any;
  // 搜索到的收藏品列表
  searchResult: any;
}

interface State {

}

// 当前组件类
export default class CollectionSearchResult extends React.Component<Props, State> {
  public shouldComponentUpdate = (nextProps: any): boolean => {
    // url 改变会触发当前搜索条件的改变
    if (nextProps.currentSearchCondition !== this.props.currentSearchCondition) {

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
        ...props.currentSearchCondition,
        current,
        pageSize
      }
    });
  };

  /**
   * 分页显示条目改变
   *
   * @param current
   * @param pageSize
   */
  public paginationShowSizeChange = (current: any, pageSize: any): void => {
    const { props } = this;
    setTimeout(() => BrowserUtil.scrollToTop(233), 100);
    Router.push({
      pathname: '/collection',
      query: {
        ...props.currentSearchCondition,
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
          {props.searchResult.itemList.map((collectionListItem: any, index: number) => (
            <Col
              className="col"
              key={index}
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
            current={parseInt(props.currentSearchCondition.current)}
            pageSize={parseInt(props.currentSearchCondition.pageSize)}
            total={parseInt(props.searchResult.total)}
            onChange={this.paginationChange}
            onShowSizeChange={this.paginationShowSizeChange}
          />
        </section>
      </section>
    );
  };
}
