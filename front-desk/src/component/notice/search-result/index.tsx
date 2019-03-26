import React from 'react';
import Link from 'next/link';
import { Pagination, Alert } from 'antd';
import Router from 'next/router';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { AppState } from '../../../store';
import BrowserUtil from '../../../util/browser';
import './index.scss'

// 当前组件的类型声明
interface ConnectState {
  // 当前公告的搜索条件
  currentNoticeSearchCondition: any;
  // 当前公告的搜索结果集
  noticeSearchResult: any;
}

interface ConnectDispatch {

}

interface Props extends ConnectState, ConnectDispatch {
}

interface State {
}

// 当前组件类
export default compose<React.ComponentClass>(
  connect<ConnectState, ConnectDispatch, Props>(
    (state: any | AppState) => ({
      currentNoticeSearchCondition: state.notice.currentNoticeSearchCondition,
      noticeSearchResult: state.notice.noticeSearchResult
    }),
    {}
  )
)(
  class NoticeSearchResult extends React.Component<Props, State> {
    public shouldComponentUpdate = (nextProps: any): boolean => {
      const { props } = this;
      if (props.noticeSearchResult === nextProps.noticeSearchResult) {
        // 如果当前公告搜索的结果集相同, 不更新 dom
        return false;
      }
      return true;
    };

    /**
     * 分页数据改变
     *
     * @param current
     */
    public paginationChange = (current: any): void => {
      const { props } = this;
      setTimeout(() => BrowserUtil.scrollToTop(233), 100);
      Router.push(
        `/notice?id=${props.currentNoticeSearchCondition.category}&current=${current}`,
        `/notice/${props.currentNoticeSearchCondition.category}?current=${current}`,
      );
    };

    public render = (): JSX.Element => {
      const { props } = this;
       return props.noticeSearchResult.itemList.length > 0
        ? (
           <section className="notice-search-result-container">
             <section>
               <section className="notice-list-container">
                 {props.noticeSearchResult.itemList.map((item: any, index: number) => (
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
                   current={parseInt(props.noticeSearchResult.current)}
                   pageSize={parseInt(props.noticeSearchResult.pageSize)}
                   total={parseInt(props.noticeSearchResult.total)}
                   onChange={this.paginationChange}
                 />
               </section>
             </section>
           </section>
          )
        : (
           <Alert
             message="暂无数据！"
             type="warning"
           />
        );
    };
  }
);
