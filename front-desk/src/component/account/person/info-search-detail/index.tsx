import React from 'react';
import './index.scss';

// 当前组件的类型声明
interface Props {
}

interface State {
}

// 当前组件类
export default class AccountPersonInfoDetail extends React.Component<Props, State> {
  public render = (): JSX.Element => {
    return (
      <section className="account-person-info-search-detail-container">
        person info
      </section>
    );
  }
}
