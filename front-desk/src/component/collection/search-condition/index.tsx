import React from 'react';
import { Input, Radio, Cascader } from 'antd';
import Router from 'next/router';
import './index.scss';

// 当前组件的类型声明

interface Props {
  // 当前收藏品搜索的条件
  currentSearchCondition: any;
  // 收藏品搜索条件
  searchCondition: any;
}

interface State {
  // 当前收藏品搜索的条件(需要对搜索条件进行修改)
  currentSearchCondition: any;
}

// 当前组件类
export default class CollectionSearchCondition extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      currentSearchCondition: props.currentSearchCondition
    };
  }

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
    const { props, state } = this;
    return (
      <section className="collection-search-condition-container">
        <section className="collection-search-condition-item collection-category">
          <div className="condition-name">分类</div>
          <div className="condition-select">
            <Radio.Group value={state.currentSearchCondition.category} buttonStyle="solid">
              {props.searchCondition.categoryList.map((item: any, index: number) => (
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
              {props.searchCondition.transactionList.map((item: any, index: number) => (
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
              value={state.currentSearchCondition.area}
              options={props.searchCondition.areaList}
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
  };
}
