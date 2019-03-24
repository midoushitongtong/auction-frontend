import React from 'react';
import AccountPersonNav from './nav';
import './index.scss';

// 当前组件的类型声明
interface Props {

}

interface State {

}

// 当前组件类
export default class AccountPersonInfo extends React.Component<Props, State> {
  public render = (): JSX.Element => {
    const { props } = this;
    return (
      <section className="account-person-container">
        <section className="title">
          <h3>个人中心</h3>
        </section>
        <section className="content-container">
          <AccountPersonNav/>
          {props.children}
        </section>
      </section>
    );
  }
}
