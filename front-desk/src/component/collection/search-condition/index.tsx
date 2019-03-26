import React from 'react';
import { Input, Radio, Button, Icon } from 'antd';
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
  // 当前父级分类Id
  parentCategoryId: any;
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
    // 屏幕宽度发生变化触发的定时器
    public reSizeTimeOut: any = null;

    constructor(props: any) {
      super(props);
      this.state = {
        parentCategoryId: this.getParentCategoryId(props)
      };
    }

    public shouldComponentUpdate = (nextProps: Props): boolean => {
      const { props } = this;
      if (props.currentCollectionSearchCondition != nextProps.currentCollectionSearchCondition) {
        this.setState({
          parentCategoryId: this.getParentCategoryId(nextProps)
        });
      }
      return true;
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
      clearInterval(this.reSizeTimeOut);
      // 添加定时器防抖动
      this.reSizeTimeOut = setTimeout(this.handlerReSize, 500);
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
     * 获取当前父级分类 id
     *
     */
    public getParentCategoryId = (props: Props): void => {
      return props.currentCollectionSearchCondition.parentCategoryId;
    };

    /**
     * 搜索条件发生改变
     *
     */
    public changeSearchCondition = (type: any, value: any): void => {
      const { props } = this;
      // 隐藏条件容器
      this.toggleMobileCollectionSearchConditionContainer(false);
      // 构建搜索条件
      const searchCondition = {
        ...props.currentCollectionSearchCondition,
        current: 1
      };
      switch (type) {
        case 'childrenCategoryId':
          searchCondition.parentCategoryId = value.parentCategoryId;
          searchCondition.childrenCategoryId = value.childrenCategoryId;
          break;
        default:
          searchCondition[type] = value;
      }
      Router.push({
        pathname: '/collection',
        query: searchCondition
      });
    };

    /**
     * 显示 / 隐藏(移动端样式) - 收藏品选择条件
     *
     * @param isShow
     */
    public toggleMobileCollectionSearchConditionContainer = (isShow: boolean): void => {
      const collectionSearchConditionContainer = document.querySelector('.collection-search-condition-container');
      const htmlElem = document.querySelector('html');
      if (htmlElem && collectionSearchConditionContainer) {
        if (isShow) {
          htmlElem.classList.add('mobile-active');
          collectionSearchConditionContainer.classList.add('mobile-active');
        } else {
          htmlElem.classList.remove('mobile-active');
          collectionSearchConditionContainer.classList.remove('mobile-active');
        }
      }
    };

    public render = (): JSX.Element => {
      const { props, state } = this;
      return (
        <section className="collection-search-condition-container">
          <section className="mobile-collection-search-condition-action-container">
            <Button type="primary" onClick={() => this.toggleMobileCollectionSearchConditionContainer(true)}>筛选</Button>
          </section>
          <section className="collection-select-search-condition-container">
            <section className="collection-search-condition-item collection-category">
              <div className="condition-name">分类</div>
              <div
                className="condition-select"
                onMouseLeave={() => {
                  this.setState({
                    parentCategoryId: this.getParentCategoryId(props)
                  });
                }}
              >
                {/* 一级分类 */}
                {props.currentCollectionSearchCondition.childrenCategoryId === 0
                  ? (
                    <Radio.Group
                      value={state.parentCategoryId} buttonStyle="solid"
                    >
                      {props.collectionSearchCondition.categoryList.map((item: any, index: number) => (
                        <div className="radio-item parent-category" key={index}>
                          <Radio.Button
                            value={item.id}
                            onMouseEnter={() => {
                              this.setState({
                                parentCategoryId: item.id
                              })
                            }}
                          >{item.cate_title}</Radio.Button>
                        </div>
                      ))}
                    </Radio.Group>
                  )
                  : null}
                {/* 二级分类 */}
                {props.collectionSearchCondition.categoryList.map((item: any, index: number) => (
                  <section
                    key={index}
                    className="collection-children-category-container"
                    style={{ display: state.parentCategoryId === item.id ? 'block' : 'none' }}
                  >
                    <Radio.Group
                      value={props.currentCollectionSearchCondition.childrenCategoryId} buttonStyle="solid"
                    >
                      {props.currentCollectionSearchCondition.childrenCategoryId === 0
                        ? (
                          item.children.map((childrenItem: any, childrenIndex: number) => (
                            <div className="radio-item children-category" key={childrenIndex}>
                              <Radio.Button
                                value={childrenItem.id}
                                onClick={() => {
                                  this.changeSearchCondition('childrenCategoryId', {
                                    parentCategoryId: item.id,
                                    childrenCategoryId: childrenItem.id
                                  })
                                }}
                              >{childrenItem.cate_title}</Radio.Button>
                            </div>
                          ))
                        )
                        : (
                          // 已选择的分类
                          item.children.map((childrenItem: any, childrenIndex: number) => {
                            if (childrenItem.id === props.currentCollectionSearchCondition.childrenCategoryId) {
                              return (
                                <div className="radio-item children-category" key={childrenIndex}>
                                  <Radio.Button
                                    value={childrenItem.id}
                                    onClick={() => {
                                      this.changeSearchCondition('childrenCategoryId', {
                                        parentCategoryId: 0,
                                        childrenCategoryId: 0
                                      })
                                    }}
                                  >
                                    {childrenItem.cate_title}
                                    <Icon
                                      type="close"
                                      className="close-icon"
                                    />
                                  </Radio.Button>
                                </div>
                              );
                            } else {
                              return null;
                            }
                          })
                        )}
                    </Radio.Group>
                  </section>
                ))}
              </div>
            </section>
            <section className="collection-search-condition-item collection-keyword">
              <div className="condition-name">关键字</div>
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
