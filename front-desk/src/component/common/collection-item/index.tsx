import React from 'react';
import { Icon, Tooltip } from 'antd';
import LazyLoad from 'react-lazyload';
import { CSSTransition } from 'react-transition-group';
import Link from 'next/link';
import './index.scss';

// 当前组件的类型声明
interface Props {
  // 收藏品详情
  collection: any;
}

interface State {
  // 收藏品详情(用于修改, props 中的不能修改)
  collection: any;
}

// 当前组件类
export default class CommonCollectionItem extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      collection: props.collection
    };
  }

  /**
   * 添加 / 取消收藏
   */
  public toggleFavorite = (flag: boolean): void => {
    this.setState((state) => ({
      collection: {
        ...state.collection,
        isFavorite: flag
      }
    }))
  };

  public render = (): JSX.Element => {
    const { state } = this;
    return (
      <section className="collection-item-container">
        {/* 商品的图片 */}
        <section className="collection-image">
          {/* 图片懒加载 */}
          <Link href="/collection">
            <a href="/collection">
              <LazyLoad offset={55} height={200}>
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
        </section>
        {/* 产品的描述 */}
        <section className="collection-description">
          <Link href="/collection">
            <a href="/collection" className="collection-lot-and-author-and-name">
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
            <Tooltip placement="bottom" title={state.collection.isFavorite ? '取消收藏' : '添加收藏'}>
              {state.collection.isFavorite
                ? (
                  <Icon
                    type="heart"
                    theme="filled"
                    onClick={() => this.toggleFavorite(false)}
                    className="ok"
                  />
                )
                : (
                  <Icon
                    type="heart"
                    onClick={() => this.toggleFavorite(true)}
                  />
                )}
            </Tooltip>
          </p>
        </section>
      </section>
    );
  }
}
