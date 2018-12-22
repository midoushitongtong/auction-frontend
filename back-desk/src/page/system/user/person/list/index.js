import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Divider, Table, Modal, Button, Col, Form, Row, Input, Tag } from 'antd';
// import api from "../../../../../api/index";

export default connect(
  // mapStateToProps
  state => {
    return {};
  },
  // mapDispatchToProps
  {}
)(
  Form.create()(
    class SystemUserPersonList extends React.Component {
      state = {
        columns: [
          { title: '用户名', dataIndex: 'username' },
          {
            title: '性别', dataIndex: 'gender', render: (text, record) => (
              <span>{text === 1 ? '男' : '女'}</span>
            )
          },
          { title: '创建日期', dataIndex: 'createdAt' },
          { title: '最后修改日期', dataIndex: 'updatedAt' },
          {
            title: '操作', dataIndex: 'action', render: (text, record) => (
              <div className="data-source-operation-container">
                <Link to={`/system/user/person/operator/${record.id}`}>编辑</Link>
                <Divider type="vertical"/>
                <span onClick={() => this.deleteData(record)}>删除</span>
              </div>
            )
          }
        ],
        dataSource: [],
        pagination: {
          current: 1,
          pageSize: 2,
          showSizeChanger: true,
          pageSizeOptions: ['10', '20', '100']
        },
        searchCondition: {},
        loading: false
      };

      componentDidMount = async () => {
        this.refreshData();
      };

      /**
       * 刷新表格数据
       *
       */
      refreshData = async () => {
        const { state } = this;

        this.setState({
          loading: true
        });

        // 获取表格数据
        // await api.person.selectPersonList({
        //   current: state.pagination.current,
        //   size: state.pagination.pageSize,
        //   ...state.searchCondition
        // });
        const result = {
          code: "0",
          data: {
            records: [
              {
                id: 1,
                gender: 1,
                username: "小杨",
                createdAt: "2018-12-02 15:37:00",
                updatedAt: "2018-12-11 18:49:11"
              },
              {
                id: 2,
                gender: 2,
                username: "小陈",
                createdAt: "2018-12-02 15:37:09",
                updatedAt: "2018-12-02 15:37:09"
              },
              {
                id: 3,
                gender: 2,
                username: "小陈",
                createdAt: "2018-12-02 15:37:09",
                updatedAt: "2018-12-02 15:37:09"
              }
            ],
            total: 3,
            size: 2000,
            current: 1,
            searchCount: true,
            pages: 1
          }
        };

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
      deleteData = (record) => {
        Modal.confirm({
          okText: '确认',
          cancelText: '取消',
          title: '确认删除此条记录？',
          content: <Tag color="#f50">{record.username}</Tag>,
          onOk: async () => {
            // loading
            this.setState({ loading: true });
            // await api.person.deletePersonById(record.id);
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
      handleSearch = (e) => {
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
      handleReset = () => {
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
      handleTableChange = (currentPagination, filters, sorter) => {
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
      getOperationContainer = () => {
        const { props } = this;
        return (
          <section className="operation-container">
            <section className="search-container">
              <Form onSubmit={this.handleSearch}>
                <Row gutter={24} className="search-field-container">
                  <Col md={8}>
                    <Form.Item label="用户名称">
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
              <Link to="/system/user/person/operator">
                <Button icon="plus" type="primary">添加</Button>
              </Link>
            </section>
          </section>
        );
      };

      render() {
        const { state } = this;
        return (
          <section className="person-list-container">
            {this.getOperationContainer()}
            <section className="data-container">
              <Table
                columns={state.columns}
                rowKey={record => record.id}
                dataSource={state.dataSource}
                pagination={state.pagination}
                loading={state.loading}
                onChange={this.handleTableChange}/>
            </section>
          </section>
        );
      }
    }
  )
);
