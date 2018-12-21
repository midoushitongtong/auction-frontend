import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Row, Col } from 'antd';
import './index.scss';

export default connect(
  // mapStateToProps
  state => {
    return {};
  },
  // mapDispatchToProps
  {}
)(
  class HomeCarousel extends React.Component {
    state = {
      productList: [
        {
          imagePath: 'http://www.cguardian.com.hk/upload/image/127/s/0001.jpg',
          name: '赵春翔赵春翔赵春翔赵春翔赵春翔赵春翔赵春翔赵春翔',
          expectPrice: 'RMB: 2000 - 3000'
        },
        {
          imagePath: 'https://assets.catawiki.nl/assets/2016/2/27/b/f/1/bf1e09a6-dd99-11e5-8ff1-3c3bc58eadde.jpg',
          name: '赵春翔 ',
          expectPrice: 'RMB: 2000 - 3000'
        },
        {
          imagePath: 'https://ebth-com-production.imgix.net/2016/09/22/11/15/30/ece6715b-b2ee-493d-bba0-9ffc5f51a541/CKS_2166.JPG?ixlib=rb-1.1.0&w=880&h=880&fit=crop&crop=&auto=format',
          name: '赵春翔',
          expectPrice: 'RMB: 2000 - 3000'
        },
        {
          imagePath: 'http://www.cguardian.com.hk/upload/image/127/s/0011.jpg',
          name: '赵春翔',
          expectPrice: 'RMB: 2000 - 3000'
        },
        {
          imagePath: 'http://www.cguardian.com.hk/upload/image/127/s/0010.jpg',
          name: '赵春翔',
          expectPrice: 'RMB: 2000 - 3000'
        },
        {
          imagePath: require('../../../assets/images/product01.jpg'),
          name: '赵春翔',
          expectPrice: 'RMB: 2000 - 3000'
        },
        {
          imagePath: require('../../../assets/images/product02.jpg'),
          name: '赵春翔',
          expectPrice: 'RMB: 2000 - 3000'
        }
      ]
    };

    render() {
      const { state } = this;
      return (
        <section className="home-product-container">
          <h5 className="title">
            <span>热门收藏品</span>
          </h5>
          <Row className="product-list-container">
            {state.productList.map((productListItem, index) => (
              <Col className="col" key={index} span={12} lg={6} md={8} sm={12}>
                <Link to="/qqq" className="product-list-item">
                  <section className="product-image">
                    <img
                      src={productListItem.imagePath}
                      alt={productListItem.name}
                    />
                  </section>
                  <section className="product-detail">
                    <p className="product-name">{productListItem.name}</p>
                    <p className="product-expect-price">
                      <span>估价: </span>
                      {productListItem.expectPrice}
                    </p>
                  </section>
                </Link>
              </Col>
            ))}
          </Row>
        </section>
      );
    };

  }
);
