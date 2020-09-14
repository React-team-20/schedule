import {Button, Table, Tag} from 'antd';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {showTaskOverview} from '../../actions';
import {setTagColor} from '../../utils';
import EditEventButton from './EditEventButton';
import RemoveEventButton from './RemoveEventButton';
import './schedule-table.css';

const ScheduleTable = () => {
  const dispatch = useDispatch();
  const showTaskInfo = id => {
    dispatch(showTaskOverview(id));
  };

  const columns = [
    {
      title: 'Date',
      dataIndex: 'date',
      width: 120,
      render: text => <span>{text}</span>,
    },
    {
      title: 'Time',
      dataIndex: 'time',
      width: 60,
    },
    {
      title: 'Type',
      dataIndex: 'type',
      width: 100,
      render: (text, record) => (
        <Tag className="list-item-tag" color={setTagColor(record.type)}>
          {record.type
            .toUpperCase()
            .split('')
            .map(item => (item === '-' ? ' ' : item))
            .join('')}
        </Tag>
      ),
    },
    {
      title: 'Topic',
      dataIndex: 'topic',
      render: (text, record) => {
        return (
          <Button type="link" onClick={() => showTaskInfo(record.id)}>
            {text}
          </Button>
        );
      },
    },
    {
      title: 'BroadcastUrl',
      width: 140,
      dataIndex: 'descriptionUrl',
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
          <RemoveEventButton id={record.id} />
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
