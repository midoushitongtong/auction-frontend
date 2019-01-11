import React from 'react';
import { connect } from 'react-redux';
import HomeCarousel from '../../component/home/carousel';
import HomeProduct from '../../component/home/product';
import './index.scss';

// 当前组件的类型声明
interface Props {
}

interface State {
}

// 当前组件类
export default class Home extends React.Component<Props, State> {
  public render = (): React.ReactElement<Props> => {
    return (
      <section className="home-container">
        <section className="home-wrapper-container">
          <section className="home-wrapper-inner-container">
            {/* 轮播图 */}
            <HomeCarousel/>
            {/* 精选收藏品组件 */}
            <HomeProduct/>
          </section>
        </section>
      </section>
    );
  };
}
