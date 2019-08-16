import React from 'react';
import { Link } from 'react-router-dom';
import { compose } from 'redux';
import { Divider, Table, Modal, Button, Col, Form, Row, Input, Tag } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import api from "../../../../../../../api"

// 当前组件的类型声明
interface Props extends FormComponentProps {
}

interface State {
  // 表格的适配信息
  columns: any;
  // 表格的数据
  dataSource: any;
  // 表格的分页
  pagination: any;
  // 获取表格数据的条件
  searchCondition: any;
  // 表格加载状态
  loading: boolean;
}

// 当前组件类
export default compose<React.ComponentClass>(
  Form.create()
)(
  class LayoutMasterSystemProductCollectionList extends React.Component<Props, State> {
    public state: State = {
      columns: [
        { title: '收藏品名称', dataIndex: 'name' },
        {
          title: '预览图', dataIndex: 'previewImageUrl', render: (text: any, record: any) => (
            <img src={text} style={{ maxWidth: '69px' }} alt={record.name}/>
          )
        },
        { title: '创建日期', dataIndex: 'createdAt' },
        { title: '最后修改日期', dataIndex: 'updatedAt' },
        {
          title: '操作', dataIndex: 'action', render: (text: any, record: any) => (
            <div className="table-data-action-container">
              <Link to={`/system/product/collection/operator/${record.id}`}>编辑</Link>
              <Divider type="vertical"/>
              <span onClick={() => this.deleteData(record)}>删除</span>
            </div>
          )
        }
      ],
      dataSource: [],
      pagination: {
        total: 0,
        current: 1,
        pageSize: 10,
        showSizeChanger: true,
        pageSizeOptions: ['10', '20', '100']
      },
      searchCondition: {},
      loading: false
    };

    public componentDidMount = (): void => {
      this.refreshData();
    };

    /**
     * 刷新表格数据
     *
     */
    public refreshData = async () => {
      const { state } = this;

      this.setState({
        loading: true
      });

      // 获取表格数据
      const result: any = await api.collection.selectCollectionList({
        current: state.pagination.current,
        size: state.pagination.pageSize,
        ...state.searchCondition
      });

      // 获取成功, 刷新数据
      const pagination = {
        ...state.pagination
      };
      pagination.total = result.data.total;
      this.setState({
        loading: false,
        dataSource: result.data.records,
        pagination
      });
    };

    /**
     * 删除表格数据
     *
     * @param record
     */
    public deleteData = (record: any): void => {
      Modal.confirm({
        okText: '确认',
        cancelText: '取消',
        title: '确认删除此条记录？',
        content: <Tag color="#f50">{record.name}</Tag>,
        onOk: async () => {
          // loading
          this.setState({ loading: true });
          await api.collection.deleteCollectionById(record.id);
          // 刷新表格数据
          this.refreshData();
        },
        onCancel() {
          console.log('Cancel');
        },
      });
    };

    /**
     * 搜索表格数据
     *
     */
    public handleSearch = (e: React.FormEvent): void => {
      e.preventDefault();
      const { state, props } = this;
      props.form.validateFields(async (error, valueList) => {
        if (!error) {
          // 保存搜索条件
          state.pagination.current = 1;
          state.searchCondition = valueList;
          // 刷新表格数据
          this.refreshData();
        }
      });
    };

    /**
     * 重置搜索参数
     *
     */
    public handleReset = (): void => {
      const { state, props } = this;
      // 保存搜索条件
      state.pagination.current = 1;
      state.searchCondition = {};
      props.form.resetFields();
      // 刷新表格数据
      this.refreshData();
    };

    /**
     * 表格的数据搜索条件发送变化
     *
     */
    public handleTableChange = (currentPagination: any): void => {
      const { state } = this;
      // 刷新分页数据
      state.pagination = currentPagination;

      // 获取表格数据
      this.refreshData();
    };

    /**
     * 顶部操作容器
     *
     */
    public getOperationContainer = (): JSX.Element => {
      const { props } = this;
      return (
        <section className="data-operation-container">
          <section className="search-container">
            <Form onSubmit={this.handleSearch}>
              <Row className="search-field-container">
                <Col md={8}>
                  <Form.Item label="收藏品名称">
                    {props.form.getFieldDecorator('username', {
                      rules: []
                    })(
                      <Input/>
                    )}
                  </Form.Item>
                </Col>
                <Col md={8} className="search-action-container">
                  <Button type="primary" htmlType="submit">搜索</Button>
                  <Button onClick={this.handleReset}>重置</Button>
                </Col>
              </Row>
            </Form>
          </section>
          <section className="data-action-container">
            <Link to="/system/product/collection/operator">
              <Button icon="plus" type="primary">添加</Button>
            </Link>
          </section>
        </section>
      );
    };

    public render = (): JSX.Element => {
      const { state } = this;
      return (
        <section className="collection-list-container">
          {this.getOperationContainer()}
          <section className="data-container">
            <Table
              columns={state.columns}
              rowKey={(record: any) => record.id}
              dataSource={state.dataSource}
              pagination={state.pagination}
              loading={state.loading}
              onChange={this.handleTableChange}/>
          </section>
        </section>
      );
    };
  }
);
