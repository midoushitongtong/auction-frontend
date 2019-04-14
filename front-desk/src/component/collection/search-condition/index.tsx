import React from 'react';
import { Input, Radio, Button, Icon } from 'antd';
import Router from 'next/router';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { AppState } from '../../../store';
import { updateCurrentCollectionSearchCondition } from '../../../store/collection';
import './index.less';

// 当前组件的类型声明
interface ConnectState {
  // 收藏品的搜索条件
  collectionSearchCondition: any;
  // 当前收藏品的搜索条件
  currentCollectionSearchCondition: any;
}

interface ConnectDispatch {
  // 修改当前收藏品的搜索条件
  updateCurrentCollectionSearchCondition: (currentCollectionSearchCondition: any) => object;
}

interface Props extends ConnectState, ConnectDispatch {
}

interface State {
  // 备份父级分类 Id
  parentCategoryIdBackUp: any;
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
        parentCategoryIdBackUp: props.currentCollectionSearchCondition.parentCategoryId
      };
    }

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

    /**
     * 改变子分类搜索条件
     *
     * @param item
     * @param childrenItem
     */
    public changeChildrenCategoryId = (item: any, childrenItem: any) => {
      const { props } = this;
      if (window.innerWidth >= 768) {
        // 如果是手机端直接执行搜索
        // 如果点击已选择的分类, 清空分类
        if (props.currentCollectionSearchCondition.parentCategoryId === item.id && props.currentCollectionSearchCondition.childrenCategoryId === childrenItem.id) {
          this.changeSearchCondition('childrenCategoryId', {
            parentCategoryId: 1,
            childrenCategoryId: 0
          });
          // 改变备份父级分类 Id
          this.setState({
            parentCategoryIdBackUp: 1
          });
        } else {
          this.changeSearchCondition('childrenCategoryId', {
            parentCategoryId: item.id,
            childrenCategoryId: childrenItem.id
          });
          // 改变备份父级分类 Id
          this.setState({
            parentCategoryIdBackUp: item.id
          });
        }
      } else {
        // 如果是移动端只修改搜索条件不执行搜索, 点击确定按钮才搜索
        // 如果点击已选择的分类, 清空分类
        if (props.currentCollectionSearchCondition.parentCategoryId === item.id && props.currentCollectionSearchCondition.childrenCategoryId === childrenItem.id) {
          props.updateCurrentCollectionSearchCondition({
            ...props.currentCollectionSearchCondition,
            parentCategoryId: 1,
            childrenCategoryId: 0
          });
          // 改变备份父级分类 Id
          this.setState({
            parentCategoryIdBackUp: 1
          });
        } else {
          props.updateCurrentCollectionSearchCondition({
            ...props.currentCollectionSearchCondition,
            parentCategoryId: item.id,
            childrenCategoryId: childrenItem.id
          });
          // 改变备份父级分类 Id
          this.setState({
            parentCategoryIdBackUp: item.id
          });
        }
      }
    };

    /**
     * 搜索条件发生改变
     *
     */
    public changeSearchCondition = (type: any, value: any): void => {
      const { props } = this;
      const searchCondition = {
        ...props.currentCollectionSearchCondition,
        current: 1
      };
      switch (type) {
        // 如果改变了子分类搜索条件, 也要改变父级分类的搜索条件
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

    public render = (): JSX.Element => {
      const { props, state } = this;
      return (
        <section className="collection-search-condition-container">
          <section className="mobile-collection-search-condition-action-container">
            <Button
              type="primary"
              onClick={() => this.toggleMobileCollectionSearchConditionContainer(true)}
            >筛选</Button>
          </section>
          <section className="collection-select-search-condition-container">
            <section className="collection-search-condition-list-group">
              <section className="collection-search-condition-list-group-item collection-category">
                <div className="condition-name">分类</div>
                <div
                  className="condition-select"
                  onMouseLeave={() => {
                    // 修改当前父类 id 为当前 url 的父类 id
                    props.updateCurrentCollectionSearchCondition({
                      ...props.currentCollectionSearchCondition,
                      'parentCategoryId': state.parentCategoryIdBackUp
                    });
                  }}
                >
                  {/* 一级分类 */}
                  <section className="collection-parent-category-container">
                    <Radio.Group value={props.currentCollectionSearchCondition.parentCategoryId} buttonStyle="solid">
                      {props.collectionSearchCondition.categoryList.map((item: any, index: number) => (
                        <div className="radio-item parent-category" key={index}>
                          <Radio.Button
                            value={item.id}
                            onMouseEnter={() => {
                              props.updateCurrentCollectionSearchCondition({
                                ...props.currentCollectionSearchCondition,
                                'parentCategoryId': item.id
                              });
                            }}
                          >{item.cate_title}</Radio.Button>
                        </div>
                      ))}
                    </Radio.Group>
                  </section>
                  {/* 二级分类 */}
                  {props.collectionSearchCondition.categoryList.map((item: any, index: number) => (
                    <section
                      key={index}
                      className="collection-children-category-container"
                      style={{ display: props.currentCollectionSearchCondition.parentCategoryId === item.id ? 'block' : 'none' }}
                    >
                      <Radio.Group
                        value={props.currentCollectionSearchCondition.childrenCategoryId}
                        buttonStyle="solid">
                        {item.children.map((childrenItem: any, childrenIndex: number) => (
                          <div className="radio-item children-category" key={childrenIndex}>
                            <Radio.Button
                              value={childrenItem.id}
                              onClick={() => this.changeChildrenCategoryId(item, childrenItem)}
                            >
                              {childrenItem.cate_title}
                              {props.currentCollectionSearchCondition.childrenCategoryId === childrenItem.id && (
                                <Icon
                                  type="close"
                                  className="close-icon"
                                />
                              )}
                            </Radio.Button>
                          </div>
                        ))}
                      </Radio.Group>
                    </section>
                  ))}
                </div>
              </section>
              <section className="collection-search-condition-list-group-item collection-keyword">
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
                    onSearch={(value) => this.changeSearchCondition('keyword', value)}
                  />
                </div>
              </section>
            </section>
            <section className="collection-search-condition-action-confirm-container">
              <Button
                type="default"
                onClick={() => {
                  Router.push({
                    pathname: '/collection'
                  });
                  this.toggleMobileCollectionSearchConditionContainer(false);
                }}
              >重置</Button>
              <Button
                type="primary"
                onClick={() => {
                  const searchCondition = {
                    ...props.currentCollectionSearchCondition,
                    current: 1
                  };
                  Router.push({
                    pathname: '/collection',
                    query: searchCondition
                  });
                  this.toggleMobileCollectionSearchConditionContainer(false);
                }}
              >确定</Button>
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
