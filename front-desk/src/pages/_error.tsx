import React from 'react'
import './_error.less';

// 当前组件类型声明
interface Props {
  statusCode: any;
}

interface State {
}

export default class Error extends React.Component<Props, State> {
  static getInitialProps({ res, err }: any) {
    const statusCode = res ? res.statusCode : err ? err.statusCode : null;
    return {
      statusCode
    };
  }

  public render = (): JSX.Element => {
    const { props } = this;
    const statusCode: any = props.statusCode;
    console.error(props);
    switch (statusCode) {
      case 404:
        return (
          <section className="error-container">
            <h1>404</h1>
            <h3>您访问的页面找不回来了！</h3>
          </section>
        );
      case 500:
        return (
          <section className="error-container">
            <h3>服务器内部错误, 请稍后重试！</h3>
          </section>
        );
      default:
        return (
          <section className="error-container">
            <h3>服务器正在开小差, 请稍后重试！</h3>
          </section>
        );
    }
  }
}
