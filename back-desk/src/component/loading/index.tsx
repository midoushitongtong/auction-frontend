import React from 'react';

// 当前组件的类型声明
interface Props {
}

interface State {
}

// 当前组件类
export default class Loading extends React.Component<Props, State> {
  public render = (): JSX.Element => {
    return (
      <section className="loading-container">
        loading...
      </section>
    );
  };
}
