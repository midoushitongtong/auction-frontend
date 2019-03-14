import React from 'react';
import { Input, Radio, Cascader } from 'antd';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { AppState } from '../../../store';
import Router from 'next/router';
import api from '../../../api/index';
import './index.scss';

// 当前组件的类型声明
interface ConnectState {
}

interface ConnectDispatch {

}

interface Props extends ConnectState, ConnectDispatch {
  // 当前搜索条件(用于初始化)
  currentSearchCondition: any
}

interface State {
  // 搜索条件
  searchCondition: any,
  // 当前搜索条件
  currentSearchCondition: any
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
  class CollectionSearchCondition extends React.Component<Props, State> {
    constructor(props: any) {
      super(props);
      this.state = {
        searchCondition: {
          categoryList: [],
          transactionList: [],
          areaList: [],
          keyword: ''
        },
        currentSearchCondition: props.currentSearchCondition
      };
    }

    public componentDidMount = async () => {
      // 从接口获取搜索条件
      const result: any = await api.collection.getSearchCondition();
      if (result.code === '0') {
        this.setState({
          searchCondition: result.data
        });
      }
    };

    public shouldComponentUpdate = (nextProps: any): boolean => {
      // url 改变会触发当前搜索条件的改变(因为父组件会调用 redux 改变当前搜索条件)
      if (nextProps.currentSearchCondition !== this.props.currentSearchCondition) {
        this.setState({
          currentSearchCondition: nextProps.currentSearchCondition
        });
      }
      return true;
    };

    /**
     * 搜索条件发生改变
     *
     */
    public changeSearchCondition = (type: any, value: any): void => {
      const { state } = this;
      Router.push({
        pathname: '/collection',
        query: {
          ...state.currentSearchCondition,
          [type]: value
        }
      });
    };

    public render = (): JSX.Element => {
      const { state } = this;
      return (
        <section className="collection-search-condition-container">
          <section className="collection-search-condition-item collection-category">
            <div className="condition-name">分类</div>
            <div className="condition-select">
              <Radio.Group value={state.currentSearchCondition.category} buttonStyle="solid">
                {state.searchCondition.categoryList.map((item: any, index: number) => (
                  <div className="radio-item" key={index}>
                    <Radio.Button
                      value={item.id}
                      onClick={() => this.changeSearchCondition('category', item.id)}
                    >{item.name}</Radio.Button>
                  </div>
                ))}
              </Radio.Group>
            </div>
          </section>
          <section className="collection-search-condition-item collection-transaction">
            <div className="condition-name">成交状况</div>
            <div className="condition-select">
              <Radio.Group value={state.currentSearchCondition.transaction} buttonStyle="solid">
                {state.searchCondition.transactionList.map((item: any, index: number) => (
                  <div className="radio-item" key={index}>
                    <Radio.Button
                      value={item.id}
                      onClick={() => this.changeSearchCondition('transaction', item.id)}
                    >{item.name}</Radio.Button>
                  </div>
                ))}
              </Radio.Group>
            </div>
          </section>
          <section className="collection-search-condition-item collection-area">
            <div className="condition-name">拍卖场次</div>
            <div className="condition-select">
              <Cascader
                allowClear={false}
                placeholder="请选择"
                options={state.searchCondition.areaList}
                value={state.currentSearchCondition.area}
                onChange={(value) => this.changeSearchCondition('area', value)}
              />
            </div>
          </section>
          <section className="collection-search-condition-item collection-keyword">
            <div className="condition-name">拍品</div>
            <div className="condition-select">
              <Input.Search
                value={state.currentSearchCondition.keyword}
                placeholder="请输入"
                enterButton
                onChange={(e) => {
                  const value = e.target.value;
                  this.setState((state: any) => ({
                    currentSearchCondition: {
                      ...state.currentSearchCondition,
                      keyword: value
                    }
                  }))
                }}
                onSearch={value => this.changeSearchCondition('keyword', value)}
              />
            </div>
          </section>
        </section>
      );
    }
  }
);
