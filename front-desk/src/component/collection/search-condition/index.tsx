import React from 'react';
import { Input, Radio, Cascader, Button } from 'antd';
import Router from 'next/router';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { AppState } from '../../../store';
import { updateCurrentCollectionSearchCondition } from "../../../store/collection";
import './index.scss';

// 当前组件的类型声明
interface ConnectState {
  // 收藏品的搜索条件
  collectionSearchCondition: any;
  // 当前收藏品的搜索条件
  currentCollectionSearchCondition: any;
}

interface ConnectDispatch {
  // 修改当前收藏品的搜索条件
  updateCurrentCollectionSearchCondition: any;
}

interface Props extends ConnectState, ConnectDispatch {
}

interface State {
  // 屏幕宽度发生变化触发的定时器
  reSizeTimeOut: any;
}

// 当前组件类
export default compose<React.ComponentClass>(
  connect<ConnectState, ConnectDispatch, Props>(
    (state: any | AppState) => ({
      collectionSearchCondition: state.collection.collectionSearchCondition,
      currentCollectionSearchCondition: state.collection.currentCollectionSearchCondition
    }),
    {
      updateCurrentCollectionSearchCondition
    }
  )
)(
  class CollectionSearchCondition extends React.Component<Props, State> {
    public state: State = {
      reSizeTimeOut: null
    };

    public componentDidMount = (): void => {
      window.addEventListener('resize', this.listenerReSize);

      // 页面加载触发一次
      this.handlerReSize();
    };

    public componentWillUnmount = (): void => {
      window.removeEventListener('resize', this.listenerReSize);
    };

    /**
     * 处理屏幕宽度变换事件
     *
     */
    public listenerReSize = () => {
      clearInterval(this.state.reSizeTimeOut);
      // 添加定时器防抖动
      this.state.reSizeTimeOut = setTimeout(this.handlerReSize, 500);
    };

    /**
     * 根据屏幕宽度重新渲染菜单(自适应)
     *
     */
    public handlerReSize = (): void => {
      // 获取客户端的可视区域
      const clientWidth = window.innerWidth;
      if (clientWidth >= 768) {
        // 客户端的可视区域大于 768 电脑端
        this.toggleMobileCollectionSearchConditionContainer(false);
      }
    };

    /**
     * 搜索条件发生改变
     *
     */
    public changeSearchCondition = (type: any, value: any): void => {
      const { props } = this;
      // 隐藏搜索条件容器
      this.toggleMobileCollectionSearchConditionContainer(false);
      Router.push({
        pathname: '/collection',
        query: {
          ...props.currentCollectionSearchCondition,
          [type]: value
        }
      });
    };

    /**
     * 显示 / 隐藏(移动端样式) - 收藏品选择条件
     *
     * @param isShow
     */
    public toggleMobileCollectionSearchConditionContainer = (isShow: boolean): void => {
      const collectionSearchConditionContainer = document.querySelector('.collection-search-condition-container');
      if (collectionSearchConditionContainer) {
        if (isShow) {
          collectionSearchConditionContainer.classList.add('mobile-active');
        } else {
          collectionSearchConditionContainer.classList.remove('mobile-active');
        }
      }
    };

    public render = (): JSX.Element => {
      const { props } = this;
      return (
        <section className="collection-search-condition-container">
          <section className="mobile-collection-search-condition-action-container">
            <Button onClick={() => this.toggleMobileCollectionSearchConditionContainer(true)}>筛选</Button>
          </section>
          <section className="collection-select-search-condition-container">
            <section className="collection-search-condition-item collection-category">
              <div className="condition-name">分类</div>
              <div className="condition-select">
                <Radio.Group value={props.currentCollectionSearchCondition.category} buttonStyle="solid">
                  {props.collectionSearchCondition.categoryList.map((item: any, index: number) => (
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
                <Radio.Group value={props.currentCollectionSearchCondition.transaction} buttonStyle="solid">
                  {props.collectionSearchCondition.transactionList.map((item: any, index: number) => (
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
                  value={props.currentCollectionSearchCondition.area}
                  options={props.collectionSearchCondition.areaList}
                  onChange={(value) => this.changeSearchCondition('area', value)}
                />
              </div>
            </section>
            <section className="collection-search-condition-item collection-keyword">
              <div className="condition-name">拍品</div>
              <div className="condition-select">
                <Input.Search
                  value={props.currentCollectionSearchCondition.keyword}
                  placeholder="请输入"
                  enterButton
                  onChange={(e) => {
                    const value = e.target.value;
                    props.updateCurrentCollectionSearchCondition({
                      ...props.currentCollectionSearchCondition,
                      'keyword': value
                    });
                  }}
                  onSearch={value => this.changeSearchCondition('keyword', value)}
                />
              </div>
            </section>
          </section>
          <section
            className="mobile-collection-select-search-condition-container-mask"
            onClick={() => this.toggleMobileCollectionSearchConditionContainer(false)}
          />
        </section>
      );
    };
  }
);
