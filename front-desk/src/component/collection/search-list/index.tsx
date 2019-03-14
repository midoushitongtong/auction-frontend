import React from 'react';
import { Row, Col, Pagination } from 'antd';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { AppState } from '../../../store';
import CommonCollectionItem from '../../common/collection-item/index';
import api from '../../../api/index';
import './index.scss';

// 当前组件的类型声明
interface ConnectState {
  // 当前搜索条件
  currentSearchCondition: any
}

interface ConnectDispatch {

}

interface Props extends ConnectState, ConnectDispatch {
}

interface State {
  searchList: any[]
}

// 当前组件类
export default compose<React.ComponentClass>(
  connect<ConnectState, ConnectDispatch, Props>(
    (state: any | AppState) => ({
      currentSearchCondition: state.collection.currentSearchCondition
    }),
    {}
  )
)(
  class CollectionSearchList extends React.Component<Props, State> {
    public state: State = {
      searchList: []
    };

    public componentDidMount = async () => {
      const { props } = this;
      this.searchData(props.currentSearchCondition);
    };

    public shouldComponentUpdate = (nextProps: any): boolean => {
      // url 改变会触发当前搜索条件的改变(因为父组件会调用 redux 改变当前搜索条件)
      if (nextProps.currentSearchCondition !== this.props.currentSearchCondition) {
        this.searchData(nextProps.currentSearchCondition);
      }
      return true;
    };

    /**
     * 分页数据改变
     *
     * @param page
     * @param pageSize
     */
    public paginationChange = (page: any, pageSize: any): void => {
      console.log(page, pageSize);
    };

    /**
     * 分页显示条目改变
     *
     */
    public paginationShowSizeChange = (current: any, pageSize: any): void => {
      console.log(current, pageSize);
    };

    /**
     * 搜索收藏品列表
     *
     */
    public searchData = async (currentSearchCondition: any) => {
      const result: any = await api.collection.getSearchResult(currentSearchCondition);
      if (result.code === '0') {
        this.setState({
          searchList: result.data
        });
      }
    };

    public render = (): JSX.Element => {
      const { state } = this;
      return (
        <section className="collection-search-list-container">
          <Row className="collection-list-container" type="flex">
            {state.searchList.map((collectionListItem, index) => (
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
              onChange={this.paginationChange}
              onShowSizeChange={this.paginationShowSizeChange}
              defaultCurrent={3}
              total={500}
            />
          </section>
        </section>
      );
    }
  }
);
