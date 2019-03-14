import React from 'react';
import Link from 'next/link';
import { Pagination } from 'antd';
import './index.scss'

// 当前组件的类型声明
interface Props {

}

interface State {
  searchResultList: any[]
}

// 当前组件类
export default class NoticeSearchList extends React.Component<Props, State> {
  public state: State = {
    searchResultList: []
  };

  public componentDidMount = (): void => {
    this.setState({
      searchResultList: [
        {
          id: '1',
          title: 'Apex Legends——巅峰挑战 致敬英雄',
          description: '单局游戏中，伤害排名靠前的主播可以获得活动奖励。主播需要在直播间露出比赛总结的战绩信息并截图提交，以',
          createdAt: '2019-01-01'
        },
        {
          id: '2',
          title: 'Apex Legends——巅峰x Legends——巅峰挑战 x Legends——巅峰挑战 x Legends——巅峰挑战 x Legends——巅峰挑战 x Legends——巅峰挑战 x Legends——巅峰挑战 x Legends——巅峰挑战 x Legends——巅峰挑战 x Legends——巅峰挑战 x Legends——巅峰挑战 x Legends——巅峰挑战 x Legends——巅峰挑战 x Legends——巅峰挑战 x Legends——巅峰挑战 x Legends——巅峰挑战 x Legends——巅峰挑战 x Legends——巅峰挑战 x Legends——巅峰挑战 x Legends——巅峰挑战 x Legends——巅峰挑战 x Legends——巅峰挑战 x Legends——巅峰挑战 x Legends——巅峰挑战 x Legends——巅峰挑战 x Legends——巅峰挑战 x Legends——巅峰挑战 挑战 致敬英雄',
          description: '单局游戏中，伤害排名靠前的主播可以中，伤害排名靠前的主播可以中，伤害排名靠前的主播可以中，伤害排名靠前的主播可以中，伤害排名靠前的主播可以中，伤害排名靠前的主播可以中，伤害排名靠前的主播可以中，伤害排名靠前的主播可以中，伤害排名靠前的主播可以获得活动奖励。主播需要在直播间露出比赛总结的战绩信息并截图提交，以',
          createdAt: '2019-01-01'
        },
        {
          id: '3',
          title: 'Apex Legends——巅峰挑战 致敬英雄',
          description: '单局游戏中，伤害排名靠前的主播要在直播间露出比赛总结的战绩信息并截图提交，以',
          createdAt: '2019-01-01'
        },
        {
          id: '4',
          title: 'Apex Legends——巅峰挑战 致敬英雄',
          description: '单局游戏中，伤害排名靠前的主播可以获露出比赛总结的战绩信息并截图提交，以',
          createdAt: '2019-01-01'
        },
        {
          id: '5',
          title: 'Apex Legends——巅峰挑战 致敬英雄',
          description: '单局游戏中，伤害排名直播间露出比赛总结的战绩信息并截图提交，以',
          createdAt: '2019-01-01'
        },
        {
          id: '1',
          title: 'Apex Legends——巅峰挑战 致敬英雄',
          description: '单局游戏中，伤害排名靠前的主播可以获得活动奖励伤害排名靠前的主播可以获得活动奖励伤害排名靠前的主播可以获得活动奖励伤害排名靠前的主播可以获得活动奖励伤害排名靠前的主播可以获得活动奖励伤害排名靠前的主播可以获得活动奖励伤害排名靠前的主播可以获得活动奖励伤害排名靠前的主播可以获得活动奖励伤害排名靠前的主播可以获得活动奖励伤害排名靠前的主播可以获得活动奖励伤害排名靠前的主播可以获得活动奖励伤害排名靠前的主播可以获得活动奖励伤害排名靠前的主播可以获得活动奖励伤害排名靠前的主播可以获得活动奖励伤害排名靠前的主播可以获得活动奖励伤害排名靠前的主播可以获得活动奖励伤害排名靠前的主播可以获得活动奖励伤害排名靠前的主播可以获得活动奖励伤害排名靠前的主播可以获得活动奖励。主播需要在直播间露出比赛总结的战绩信息并截图提交，以',
          createdAt: '2019-01-01'
        },
        {
          id: '2',
          title: 'Apex Legends——巅峰挑战 致敬英雄',
          description: '单局游戏中，伤害排名靠前的主播可以中，伤害排名靠前的主播可以中，伤害排名靠前的主播可以中，伤害排名靠前的主播可以中，伤害排名靠前的主播可以中，伤害排名靠前的主播可以中，伤害排名靠前的主播可以中，伤害排名靠前的主播可以中，伤害排名靠前的主播可以获得活动奖励。主播需要在直播间露出比赛总结的战绩信息并截图提交，以',
          createdAt: '2019-01-01'
        },
        {
          id: '3',
          title: 'Apex Legends——巅峰挑战 致敬英雄',
          description: '单局游戏中，伤害排名靠前的主播要在直播间露出比赛总结的战绩信息并截图提交，以',
          createdAt: '2019-01-01'
        },
        {
          id: '4',
          title: 'Apex Legends——巅峰挑战 致敬英雄',
          description: '单局游戏中，伤害排名靠前的主播可以获露出比赛总结的战绩信息并截图提交，以',
          createdAt: '2019-01-01'
        },
        {
          id: '5',
          title: 'Apex Legends——巅峰挑战 致敬英雄',
          description: '单局游戏中，伤害排名直播间露出比赛总结的战绩信息并截图提交，以',
          createdAt: '2019-01-01'
        }
      ]
    });
  };

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
    const { state } = this;
    return (
      <section className="notice-search-list-container">
        <section className="notice-list-container">
          {state.searchResultList.map((item, index) => (
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
