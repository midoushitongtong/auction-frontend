import React from 'react';
import HTMLParseReact from 'html-react-parser';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { AppState } from '../../../store';
import './index.scss';
import ImageZoom from 'react-medium-image-zoom';

// 当前组件的类型声明
interface ConnectState {
  // 公告的搜索详情
  noticeSearchDetail: any;
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
      noticeSearchDetail: state.notice.noticeSearchDetail
    }),
    {}
  )
)(
  class NoticeSearchDetail extends React.Component<Props, State> {
    public render = (): JSX.Element => {
      const { props } = this;
      return (
        <section className="notice-search-detail-container">
          <section className="notice-description">
            <h3 className="title">{props.noticeSearchDetail.title}</h3>
            <p className="created-at">{props.noticeSearchDetail.createdAt}</p>
          </section>
          <section
            className="notice-content"
          >
            {HTMLParseReact(props.noticeSearchDetail.content, {
              replace: (domNode: any) => {
                if (domNode.type === 'tag' && domNode.name == 'img') {
                  // 如果是图片元素, 替换为 react 节点, 可放大图片
                  return (
                    <ImageZoom
                      image={{
                        src: domNode.attribs.src,
                        alt: domNode.attribs.src,
                        className: 'swiper-lazy',
                      }}
                      zoomImage={{
                        src: domNode.attribs.src,
                        alt: domNode.attribs.src
                      }}
                    />
                  );
                }
              }
            })}
          </section>
        </section>
      );
    };
  }
);
