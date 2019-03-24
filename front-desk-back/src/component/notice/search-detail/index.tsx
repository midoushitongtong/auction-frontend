import React from 'react';
import './index.scss'
import Head from 'next/head';

// 当前组件的类型声明
interface Props {
  // 搜索到的公告详情
  notice: any;
}

interface State {
}

// 当前组件类
export default class NoticeSearchDetail extends React.Component<Props, State> {
  public render = (): JSX.Element => {
    const { props } = this;
    return (
      <section className="notice-search-detail-container">
        <Head>
          <title>{props.notice.title} - 新创文化艺术品</title>
        </Head>
        <section className="notice-description">
          <h3 className="title">{props.notice.title}</h3>
          <p className="created-at">{props.notice.createdAt}</p>
        </section>
        <section
          className="notice-content"
          dangerouslySetInnerHTML={{ __html: props.notice.content[Object.keys(props.notice.content)[0]] }}
        />
      </section>
    );
  };
}
