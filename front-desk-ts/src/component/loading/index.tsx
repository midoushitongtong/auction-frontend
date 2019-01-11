import React from 'react';
import './index.scss';

// 当前组件的类型声明
interface Props {
}

interface State {
}

// 当前组件类
export default class Loading extends React.Component<Props, State> {
  public render = (): React.ReactElement<any> => {
    return (
      <section className="loading-container">
        loading...
      </section>
    );
  };
}
