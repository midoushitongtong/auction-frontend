import React from 'react';
import LazyLoad from 'react-lazyload';
import { Icon, Tooltip, notification } from 'antd';
import { CSSTransition } from 'react-transition-group';
import Link from 'next/link';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { AppState } from '../../../store';
import { updateCollectionFavoriteIdList } from '../../../store/account/person';
import api from '../../../api';
import './index.less';

// 当前组件的类型声明
interface ConnectState {
  // 当前登陆的用户信息
  userInfo: any;
  // 我收藏的收藏品id
  collectionFavoriteIdList: any;
}

interface ConnectDispatch {
  // 修改我收藏的收藏品id
  updateCollectionFavoriteIdList: (data: any) => object;
}

interface Props extends ConnectState, ConnectDispatch {
  // 收藏品详情
  collection: any;
}

interface State {
  // 收藏品详情(用于修改, props 中的不能修改)
  collection: any;
}

// 当前组件类
export default compose<React.ComponentClass>(
  connect<ConnectState, ConnectDispatch, Props>(
    (state: any | AppState) => ({
      userInfo: state.account.userInfo,
      collectionFavoriteIdList: state.accountPerson.collectionFavoriteIdList
    }),
    {
      updateCollectionFavoriteIdList
    }
  )
)(
  class CommonCollectionItem extends React.Component<Props, State> {
    constructor(props: Props) {
      super(props);
      this.state = {
        collection: props.collection
      };
    }

    /**
     * 修改收藏的收藏品状态
     *
     */
    public toggleCollectionFavorite = async (id: number, flag: boolean) => {
      const { props } = this;
      // 判断是否登陆
      if (props.userInfo.username) {
        // 请求 api
        const result1: any = await api.accountPerson.updateCollectionFavorite({
          id,
          state: flag ? 1 : 0
        });
        if (parseInt(result1.code) === 0) {
          let newCollectionFavoriteIdList = [];
          if (flag) {
            // 添加收藏
            newCollectionFavoriteIdList = props.collectionFavoriteIdList.map((idItem: any) => idItem);
            if (newCollectionFavoriteIdList.indexOf(id) === -1) {
              newCollectionFavoriteIdList.push(id);
            }
          } else {
            // 取消收藏
            newCollectionFavoriteIdList = props.collectionFavoriteIdList.filter((idItem: any) => id !== idItem);
          }
          props.updateCollectionFavoriteIdList(newCollectionFavoriteIdList);
        } else {
          notification.open({
            placement: 'bottomLeft',
            message: '操作失敗',
            duration: 5
          });
        }
      } else {
        notification.open({
          placement: 'bottomLeft',
          message: '请登陆后在进行此操作',
          duration: 5
        });
      }
    };

    public render = (): JSX.Element => {
      const { props, state } = this;
      return (
        <section className="collection-item-container">
          {/* 商品的图片 */}
          <Link href={`/collection/detail?id=${state.collection.id}`} as={`/collection/detail/${state.collection.id}`}>
            <a href={`/collection/detail/${state.collection.id}`} className="collection-image">

              {/* 图片懒加载 */}
              <LazyLoad offset={200} height={200}>
                <CSSTransition
                  in={true}
                  classNames="image-fade"
                  appear
                  timeout={3000}
                >
                  <img src={state.collection.imagePath} alt={state.collection.name}/>
                </CSSTransition>
              </LazyLoad>
            </a>
          </Link>
          {/* 产品的描述 */}
          <section className="collection-description">
            <Link
              href={`/collection/detail?id=${state.collection.id}`}
              as={`/collection/detail/${state.collection.id}`}
            >
              <a href={`/collection/detail/${state.collection.id}`} className="collection-lot-and-author-and-name">
                <p className="collection-lot">
                  <span>Lot</span>
                  <span className="collection-lot-number">{state.collection.lot}</span>
                </p>
                <p className="collection-author">{state.collection.author}</p>
                <p className="collection-name">{state.collection.name}</p>
              </a>
            </Link>
            <p className="collection-expect-price">
              <span>估价: </span>
              {state.collection.expectPrice}
            </p>
            <p className="collection-favorite">
              <Tooltip
                placement="bottom"
                title={props.collectionFavoriteIdList.indexOf(parseInt(state.collection.id)) > -1 ? '取消收藏' : '添加收藏'}
              >
                {props.collectionFavoriteIdList.indexOf(parseInt(state.collection.id)) > -1
                  ? (
                    <Icon
                      type="heart"
                      theme="filled"
                      onClick={() => this.toggleCollectionFavorite(parseInt(state.collection.id), false)}
                      className="ok"
                    />
                  )
                  : (
                    <Icon
                      type="heart"
                      onClick={() => this.toggleCollectionFavorite(parseInt(state.collection.id), true)}
                    />
                  )}
              </Tooltip>
            </p>
          </section>
        </section>
      );
    }
  }
) as any;
