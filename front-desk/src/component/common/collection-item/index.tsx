import React from 'react';
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
}

// 当前组件类
export default class CommonCollectionItem extends React.Component<Props, State> {
  public render = (): JSX.Element => {
    const { props } = this;
    return (
      <Link href="/collection">
        <a className="collection-item-container" href="/collection">
          {/* 商品的图片 */}
          <section className="collection-image">
            {/* 图片懒加载 */}
            <LazyLoad offset={20} height={200}>
              <CSSTransition
                in={true}
                classNames="image-fade"
                appear
                timeout={1000}
              >
                <img src={props.collection.imagePath} alt={props.collection.name}/>
              </CSSTransition>
            </LazyLoad>
          </section>
          {/* 产品的描述 */}
          <section className="collection-description">
            <p className="collection-lot">
              <span>Lot</span>
              <span className="collection-lot-number">{props.collection.lot}</span>
            </p>
            <p className="collection-author">{props.collection.author}</p>
            <p className="collection-name">{props.collection.name}</p>
            <p className="collection-expect-price">
              <span>估价: </span>
              {props.collection.expectPrice}
            </p>
          </section>
        </a>
      </Link>
    );
  }
}
