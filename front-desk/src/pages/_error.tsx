import React from 'react'

// 当前组件的类型声明
interface Props {
  statusCode: number
}

interface State {
}

// 当前组件类
export default class _error extends React.Component<Props, State> {
  public static getInitialProps({ res, err }: any) {
    const statusCode = res ? res.statusCode : err ? err.statusCode : null;
    return { statusCode }
  }

  public render = (): JSX.Element => {
    return (
      <p>
        {this.props.statusCode
          ? `An error ${this.props.statusCode} occurred on server`
          : 'An error occurred on client'}
      </p>
    );
  };
}
