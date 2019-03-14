import React from 'react';
import { Input, Radio, Cascader } from 'antd';
import Router from 'next/router';
import './index.scss';

// 当前组件的类型声明
interface Props {

}

interface State {
  // 搜索条件
  searchCondition: any,
  // 当前搜索条件(用于初始化)
  currentSearchCondition: any
}

// 当前组件类
export default (class CollectionSearchCondition extends React.Component<Props, State> {
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

  componentDidMount = () => {
    console.log(312);
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
        [type]: value,
        dwq: 'dq'
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
              defaultValue={state.currentSearchCondition.keyword}
              value={state.currentSearchCondition.keyword}
              placeholder="请输入"
              enterButton
              onSearch={value => this.changeSearchCondition('keyword', value)}
            />
          </div>
        </section>
      </section>
    );
  }
} as any);
