import React from 'react';
import './index.scss'

// 当前组件的类型声明
interface Props {
}

interface State {
}

// 当前组件类
export default class Collection extends React.Component<Props, State> {
  public render = (): JSX.Element => {
    return (
      <section className="collection-container">
        <section className="collection-wrapper-container">
          <section className="collection-wrapper-inner-container">
            <h1>收藏品列表页</h1>
          </section>
        </section>
      </section>
    );
  };
}
