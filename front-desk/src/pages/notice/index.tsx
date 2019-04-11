import React from 'react';
import Head from 'next/head';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { AppState } from '../../store';
import {
  updateCurrentNoticeSearchCondition,
  updateNoticeSearchResult
} from '../../store/notice';
import LayoutHeader from '../../component/layout/header';
import LayoutFooter from '../../component/layout/footer';
import NoticeSearchResult from '../../component/notice/search-result';
import api from '../../api';
import './index.less'

// 当前组件的类型声明
interface ConnectState {
  siteInfo: any;
  // 公告分类
  noticeCategory: any;
}

interface ConnectDispatch {
  // 修改当前公告的搜索条件
  updateCurrentNoticeSearchCondition: (currentNoticeSearchCondition: any) => object;
  // 修改当前公告的搜索结果集
  updateNoticeSearchResult: (noticeSearchResult: any) => object;
}

interface Props extends ConnectState, ConnectDispatch {
  // 当前的公告分类
  category: any;
}

interface State {

}

// 当前组件类
export default compose<React.ComponentClass>(
  connect<ConnectState, ConnectDispatch, Props>(
    (state: any | AppState) => ({
      siteInfo: state.site.siteInfo,
      noticeCategory: state.notice.noticeCategory
    }),
    {
      updateCurrentNoticeSearchCondition,
      updateNoticeSearchResult
    }
  )
)(
  class Notice extends React.Component<Props, State> {
    public static getInitialProps = async ({ query, store }: any) => {
      // 获取当前公告的搜索条件
      const currentNoticeSearchCondition = {
        category: query.id,
        current: query.current || '1'
      };
      store.dispatch(updateCurrentNoticeSearchCondition(currentNoticeSearchCondition));

      // 获取公告的搜索结果集
      const searchCondition: any = {};
      if (currentNoticeSearchCondition.current != '1') {
        searchCondition.page = currentNoticeSearchCondition.current;
      }
      // 默认搜索的分类根据路由决定
      searchCondition.cate = currentNoticeSearchCondition.category;
      let noticeSearchResult: any = [];
      const result: any = await api.notice.selectNoticeList(searchCondition);
      if (parseInt(result.code) === 0) {
        noticeSearchResult = {
          itemList: result.data.map((item: any) => ({
            id: item.id,
            title: item.title,
            createdAt: item.time,
            description: item.description,
            previewImage: item.thumb
          })),
          current: result.page.current_page,
          pageSize: result.page.per_page,
          total: result.page.total
        };
        store.dispatch(updateNoticeSearchResult(noticeSearchResult));
      }

      return {
        category: currentNoticeSearchCondition.category
      };
    };

    /**
     * 根据路由获取标题
     *
     */
    public getTitle = (): string => {
      const { props } = this;
      let title = '';
      props.noticeCategory.itemList.find((item: any) => {
        const currentCategory = item.children.find((itemChildren: any) => itemChildren.id === parseInt(props.category));
        if (currentCategory) {
          title = currentCategory.name;
          return true;
        }
      });
      return title;
    };

    public render = (): JSX.Element => {
      const { props } = this;
      return (
        <section className="app-container">
          <LayoutHeader/>
          <Head>
            <title>{this.getTitle()} - {props.siteInfo.title}</title>
          </Head>
          <section className="notice-container">
            <section className="notice-wrapper-container">
              <section className="notice-wrapper-inner-container">
                <section className="notice-title">
                  {/* 根据路由获取标题 */}
                  <h3>{this.getTitle()}</h3>
                </section>
                <NoticeSearchResult/>
              </section>
            </section>
          </section>
          <LayoutFooter/>
        </section>
      );
    };
  }
)

