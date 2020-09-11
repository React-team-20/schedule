import {Space, Table, Tag} from 'antd';
import React from 'react';
import {useSelector} from 'react-redux';
import {setTagColor} from '../../utils';
import EditEventButton from './EditEventButton';
import DeleteEventButton from './RemoveEventButton';
import './schedule-table.css';

const ScheduleTable = () => {
  const columns = [
    {
      title: 'Date',
      dataIndex: 'date',
      render: text => <span>{text}</span>,
    },
    {
      title: 'Time',
      dataIndex: 'time',
    },
    {
      title: 'Type',
      dataIndex: 'type',
      render: (text, record) => (
        <Tag className="list-item-tag" color={setTagColor(record.type.toUpperCase())}>
          {text}
        </Tag>
      ),
    },
    {
      title: 'Topic',
      dataIndex: 'topic',
      render: text => (
        <Space size="middle">
          <span>{text}</span>
        </Space>
      ),
    },
    {
      title: 'BroadcastUrl',
      dataIndex: 'descriptionUrl',
    },
    {
      title: 'Place',
      dataIndex: 'place',
    },
    {
      title: 'Comment',
      dataIndex: 'comment',
    },
    {
      title: 'Action',
      dataIndex: '',
      key: 'x',
      render: (text, record) => (
        <>
          <EditEventButton id={record.id} />
          <DeleteEventButton id={record.id} />
        </>
      ),
    },
  ];
  const data = useSelector(state => state.events);
  return (
    <Table
      size="small"
      columns={columns}
      dataSource={data}
      rowKey={record => record.id}
      scroll={{
        x: '100vw',
      }}
    />
  );
};

export default ScheduleTable;
