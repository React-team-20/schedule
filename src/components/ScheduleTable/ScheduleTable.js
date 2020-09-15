import {Button, Table, Tag} from 'antd';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {showTaskOverview} from '../../actions';
import {setTagColor} from '../../utils';
import EditEventButton from './EditEventButton';
import RemoveEventButton from './RemoveEventButton';
import './schedule-table.css';

const ScheduleTable = ({events}) => {
  const dispatch = useDispatch();
  const {userRole} = useSelector(state => state.app);

  const showTaskInfo = id => {
    dispatch(showTaskOverview(id));
  };

  const columns = [
    {
      title: 'Date',
      dataIndex: 'date',
      width: 90,
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
      width: 120,
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
      width: 500,
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
      width: 400,
      dataIndex: 'descriptionUrl',
    },
    {
      title: 'Comment',
      dataIndex: 'comment',
      width: 250,
    },
  ];

  const actions = {
    title: 'Action',
    key: 'operation',
    fixed: 'right',
    width: 80,
    render: (text, record) => (
      <>
        <EditEventButton id={record.id} />
        <RemoveEventButton id={record.id} />
      </>
    ),
  };

  if (userRole === 'mentor') columns.push(actions);

  return (
    <Table
      size="small"
      columns={columns}
      pagination={false}
      dataSource={events}
      rowKey={record => record.id}
      scroll={{
        x: '100vw',
      }}
    />
  );
};

export default ScheduleTable;
