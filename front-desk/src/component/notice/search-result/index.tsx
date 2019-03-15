import React from 'react';
import Link from 'next/link';
import { Pagination } from 'antd';
import Router from 'next/router';
import BrowserUtil from '../../../util/browser';
import './index.scss'

// 当前组件的类型声明
interface Props {
  // 当前文章搜索的条件(分页等)
  currentSearchCondition: any;
  // 搜索到的公告列表
  searchResult: any;
}

interface State {
}

// 当前组件类
export default class NoticeSearchResult extends React.Component<Props, State> {
  public shouldComponentUpdate = (nextProps: any): boolean => {
    // url 改变会触发当前搜索条件的改变
    if (nextProps.currentSearchCondition !== this.props.currentSearchCondition) {

    }
    return true;
  };

  /**
   * 分页数据改变
   *
   * @param current
   * @param pageSize
   */
  public paginationChange = (current: any, pageSize: any): void => {
    const { props } = this;
    setTimeout(() => BrowserUtil.scrollToTop(233), 100);
    Router.push({
      pathname: '/notice',
      query: {
        ...props.currentSearchCondition,
        current,
        pageSize
      }
    });
  };

  /**
   * 分页显示条目改变
   *
   * @param current
   * @param pageSize
   */
  public paginationShowSizeChange = (current: any, pageSize: any): void => {
    const { props } = this;
    setTimeout(() => BrowserUtil.scrollToTop(233), 100);
    Router.push({
      pathname: '/notice',
      query: {
        ...props.currentSearchCondition,
        current,
        pageSize
      }
    });
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
            current={parseInt(props.currentSearchCondition.current)}
            pageSize={parseInt(props.currentSearchCondition.pageSize)}
            total={parseInt(props.searchResult.total)}
            onChange={this.paginationChange}
            onShowSizeChange={this.paginationShowSizeChange}
          />
        </section>
      </section>
    );
  };
}
