import React from 'react';
import { renderRoutes, RouteConfigComponentProps } from 'react-router-config';

// 当前组件的类型声明
interface Props extends RouteConfigComponentProps {
}

interface State {
}

// 当前组件类
export default class LayoutMasterSystemProduct extends React.Component<Props, State> {
  public render = (): JSX.Element => {
    const { props } = this;
    if (props.route && props.route.routes) {
      return (
        <section className="system-product-container">
          {renderRoutes(props.route.routes)}
        </section>
      );
    } else {
      return (
        <section>加载失败, 检查路由配置...</section>
      );
    }
  };
}
