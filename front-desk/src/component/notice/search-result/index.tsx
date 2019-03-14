import React from 'react';
import Link from 'next/link';
import { Pagination } from 'antd';
import './index.scss'

// 当前组件的类型声明
interface Props {
  // 搜索到的公告列表
  searchResult: any;
}

interface State {
}

// 当前组件类
export default class NoticeSearchResult extends React.Component<Props, State> {
  /**
   * 分页数据改变
   *
   * @param page
   * @param pageSize
   */
  public paginationChange = (page: any, pageSize: any): void => {
    console.log(page, pageSize);
  };

  /**
   * 分页显示条目改变
   *
   */
  public paginationShowSizeChange = (current: any, pageSize: any): void => {
    console.log(current, pageSize);
  };

  public render = (): JSX.Element => {
    const { props } = this;
    return (
      <section className="notice-search-result-container">
        <section className="notice-list-container">
          {props.searchResult.itemList.map((item: any, index: number) => (
            <section className="notice-list-item" key={index}>
              <p className="description-top">
                <Link href={`/notice/detail?id=${item.id}`} as={`/notice/detail/${item.id}`}>
                  <a href={`/notice/detail/${item.id}`} className="title">{item.title}</a>
                </Link>
                <span className="created-at">{item.createdAt}</span>
              </p>
              <p className="description-bottom">
                <span className="description">{item.description}</span>
              </p>
            </section>
          ))}
        </section>
        <section className="notice-pagination-container">
          <Pagination
            showSizeChanger
            onChange={this.paginationChange}
            onShowSizeChange={this.paginationShowSizeChange}
            defaultCurrent={3}
            total={500}
          />
        </section>
      </section>
    );
  };
}
