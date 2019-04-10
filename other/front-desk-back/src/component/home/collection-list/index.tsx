import React from 'react';
import { Row, Col } from 'antd';
import CommonCollectionItem from '../../../component/common/collection-item';
import './index.scss';

// 当前组件的类型声明
interface Props {
}

interface State {
  collectionHotList: any[];
}

// 当前组件类
export default class HomeProduct extends React.Component<Props, State> {
  public state: State = {
    collectionHotList: [
      {
        id: 123,
        lot: 1,
        imagePath: 'https://assets.catawiki.nl/assets/2018/12/13/5/0/3/thumb5_503b1e53-5adb-4185-91de-793628be934b.jpg',
        author: '赵春翔赵春翔赵春翔赵春翔赵春翔赵春翔赵春翔赵春翔',
        name: '绽放的智慧',
        expectPrice: 'RMB: 2000 - 3000'
      },
      {
        id: 123,
        lot: 12,
        imagePath: 'https://assets.catawiki.nl/assets/2016/2/27/b/f/1/bf1e09a6-dd99-11e5-8ff1-3c3bc58eadde.jpg',
        author: '赵春翔',
        name: '绽放的智慧',
        expectPrice: 'RMB: 2000 - 3000'
      },
      {
        id: 123,
        lot: 13,
        imagePath: 'https://ebth-com-production.imgix.net/2016/09/22/11/15/30/ece6715b-b2ee-493d-bba0-9ffc5f51a541/CKS_2166.JPG?ixlib=rb-1.1.0&w=880&h=880&fit=crop&crop=&auto=format',
        author: '赵春翔',
        name: '绽放的智慧',
        expectPrice: 'RMB: 2000 - 3000'
      },
      {
        id: 123,
        lot: 222,
        imagePath: 'https://assets.catawiki.nl/assets/2018/12/17/a/8/5/thumb5_a8549d84-ae86-4ad8-ae59-251faf94c763.jpg',
        author: '赵春翔',
        name: '绽放的智慧',
        expectPrice: 'RMB: 2000 - 3000'
      },
      {
        id: 123,
        lot: 155,
        imagePath: 'https://assets.catawiki.nl/assets/2017/9/5/a/e/2/thumb5_ae219cf8-451b-44d2-aa1f-b8c6919aca4c.jpg',
        author: '赵春翔',
        name: '绽放的智慧',
        expectPrice: 'RMB: 2000 - 3000'
      },
      {
        id: 123,
        lot: 888,
        imagePath: 'https://assets.catawiki.nl/assets/2018/12/20/0/a/3/thumb5_0a3ab062-adca-436e-bb51-3aba93e45f0a.jpg',
        author: '赵春翔',
        name: '绽放的智慧',
        expectPrice: 'RMB: 2000 - 3000'
      },
      {
        id: 123,
        lot: 999,
        imagePath: 'https://assets.catawiki.nl/assets/2018/12/12/e/3/9/thumb2_e39d7772-b828-4e13-b4b6-f9928386ca8b.jpg',
        author: '赵春翔',
        name: '绽放的智慧',
        expectPrice: 'RMB: 2000 - 3000'
      },
      {
        id: 123,
        lot: 232323232323,
        imagePath: 'https://assets.catawiki.nl/assets/2018/12/7/6/a/9/thumb5_6a9c1a1a-e1a9-45a5-829b-955a0206008c.jpg',
        author: '赵春翔',
        name: '绽放的智慧',
        expectPrice: 'RMB: 2000 - 3000'
      },
      {
        id: 123,
        lot: 1000000000,
        imagePath: 'https://assets.catawiki.nl/assets/2017/5/5/f/f/b/thumb2_ffb08d12-3186-11e7-97bc-30f90be54905.jpg',
        author: '赵春翔',
        name: '绽放的智慧',
        expectPrice: 'RMB: 2000 - 3000'
      }
    ]
  };

  public render = (): JSX.Element => {
    const { state } = this;
    return (
      <section className="home-collection-list-container">
        <h5 className="title">
          <span>热门收藏品</span>
        </h5>
        <Row className="collection-list-container" type="flex">
          {state.collectionHotList.map((collectionHotListItem, index) => (
            <Col
              className="col"
              key={index}
              span={12}
              lg={6}
              md={8}
              sm={12}
            >
              <CommonCollectionItem collection={collectionHotListItem}/>
            </Col>
          ))}
        </Row>
      </section>
    );
  };
}
