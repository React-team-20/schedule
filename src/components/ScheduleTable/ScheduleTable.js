/* eslint-disable jsx-a11y/anchor-is-valid */
import {Space, Table, Tag} from 'antd';
import React from 'react';
import {useSelector} from 'react-redux';
import './schedule-table.css';

const columns = [
  {
    title: 'Date',
    dataIndex: 'date',
    key: 'date',
    render: text => <a>{text}</a>,
  },
  {
    title: 'Time',
    dataIndex: 'time',
    key: 'time',
  },
  {
    title: 'Tags',
    key: 'tags',
    dataIndex: 'tags',
    render: tags => (
      <>
        {tags.map(tag => {
          const color = tag.length > 5 ? 'geekblue' : 'green';
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: 'Topic',
    key: 'topic',
    render: (text, record) => (
      <Space size="middle">
        <a>{record.topic}</a>
      </Space>
    ),
  },
];

const ScheduleTable = () => {
  const data = useSelector(state => state.schedule);
  return <Table columns={columns} dataSource={data} />;
};

export default ScheduleTable;
