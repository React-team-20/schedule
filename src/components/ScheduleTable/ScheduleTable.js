import {Space, Table, Tag} from 'antd';
import React from 'react';
import {useSelector} from 'react-redux';
import './schedule-table.css';

const columns = [
  {
    title: 'Date',
    dataIndex: 'date',
    key: 'date',
  },
  {
    title: 'Time',
    dataIndex: 'time',
    key: 'time',
  },
  {
    title: 'Type',
    key: 'type',
    dataIndex: 'type',
    render: type => <Tag color="geekblue">{type.toUpperCase()}</Tag>,
  },
  {
    title: 'Name',
    key: 'name',
    render: (text, record) => (
      <Space size="middle">
        <span>{record.name}</span>
      </Space>
    ),
  },
];

const ScheduleTable = () => {
  const data = useSelector(state => state.events);
  return <Table columns={columns} dataSource={data} rowKey={record => record.id} />;
};

export default ScheduleTable;
