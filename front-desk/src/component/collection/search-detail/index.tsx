import React from 'react';
import ImageGallery from 'react-image-gallery';
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
            <section className="collection-base-info-item name">
              <span className="title">名称</span>
              <span className="detail">{props.collection.name}</span>
            </section>
            <section className="collection-base-info-item">
              <span className="title">参考价</span>
              <span className="detail">{props.collection.price}</span>
            </section>
            {props.collection.descriptionList.map((description: any, index: number) => {
              const descriptionArr = description.split(':');
              return (
                <section className="collection-base-info-item" key={index}>
                  <span className="title">{descriptionArr[0]}</span>
                  <span className="detail">{descriptionArr[1]}</span>
                </section>
              );
            })}
            <section className="collection-base-info-item description">
              <span className="title">描述</span>
              <section
                className="detail"
                dangerouslySetInnerHTML={{ __html: props.collection.description }}
              />
            </section>
          </section>
          <section className="collection-image-container">
            <ImageGallery
              showFullscreenButton={false}
              showPlayButton={false}
              showNav={false}
              items={props.collection.carouselList.map((carouselListItem: any) => ({
                original: carouselListItem,
                thumbnail: carouselListItem
              }))}
            />
          </section>
        </section>
      </section>
    );
  };
}
