import React from 'react';
import { Row, Col } from 'antd';
import CommonCollectionItem from '../../../component/common/collection-item';
import './index.scss';

// 当前组件的类型声明
interface Props {
  collectionHotList: any[];
}

interface State {

}

// 当前组件类
export default class HomeProduct extends React.Component<Props, State> {
  public render = (): JSX.Element => {
    const { props } = this;
    return (
      <section className="home-collection-list-container">
        <h5 className="title">
          <span>热门收藏品</span>
        </h5>
        <Row className="collection-list-container" type="flex">
          {props.collectionHotList.map((collectionHotListItem, index) => (
            <Col
              className="col"
              key={index}
              span={12}
              lg={6}
              md={8}
              sm={12}
            >
              <CommonCollectionItem collection={{
                id: collectionHotListItem.id,
                imagePath: collectionHotListItem.goods_logo,
                lot: collectionHotListItem.id,
                author: collectionHotListItem.goods_spec,
                name: collectionHotListItem.goods_title,
                isFavorite: false,
                expectPrice: collectionHotListItem.market_price + '-' + collectionHotListItem.selling_price
              }}/>
            </Col>
          ))}
        </Row>
      </section>
    );
  };
}
