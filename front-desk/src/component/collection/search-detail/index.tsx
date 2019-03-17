import React from 'react';
import './index.scss'

// 当前组件的类型声明
interface Props {
  // 搜索到的公告详情
  collection: any;
}

interface State {
}

// 当前组件类
export default class CollectionSearchDetail extends React.Component<Props, State> {
  public render = (): JSX.Element => {
    const { props } = this;
    return (
      <section className="collection-search-detail-container">
        <section className="collection-content-container">
          <section className="collection-base-info-container">
            <section className="collection-base-info-item lot">
              <span className="title">lot</span>
              <span className="detail">{props.collection.lot}</span>
            </section>
            <section className="collection-base-info-item author">
              <span className="title">作者</span>
              <span className="detail">{props.collection.author}</span>
            </section>
            <section className="collection-base-info-item name">
              <span className="title">名称</span>
              <span className="detail">{props.collection.name}</span>
            </section>
            <section className="collection-base-info-item expect-price">
              <span className="title">参考价</span>
              <span className="detail">{props.collection.expectPrice}</span>
            </section>
            <section className="collection-base-info-item type">
              <span className="title">材质</span>
              <span className="detail">{props.collection.type}</span>
            </section>
            <section className="collection-base-info-item dimension">
              <span className="title">尺寸</span>
              <span className="detail">{props.collection.dimension}</span>
            </section>
            <section className="collection-base-info-item description">
              <span className="title">描述</span>
              <section
                className="detail"
                dangerouslySetInnerHTML={{ __html: props.collection.description[Object.keys(props.collection.description)[0]] }}
              />
            </section>
          </section>
          <section className="collection-image-container">
            <img
              src={props.collection.imagePath[Object.keys(props.collection.imagePath)[0]]}
            />
          </section>
        </section>
      </section>
    );
  };
}
