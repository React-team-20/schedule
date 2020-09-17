import {Button, Table, Tag} from 'antd';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {showTaskOverview} from '../../actions';
import {setTagColor} from '../../utils';
import EditEventButton from './EditEventButton';
import RemoveEventButton from './RemoveEventButton';
import './schedule-table.css';

const ScheduleTable = ({events}) => {
  const dispatch = useDispatch();
  const {userRole} = useSelector(state => state.app);
  const [selectedRows, setSelectedRows] = useState([]);

  useEffect(() => {
    const enableSelection = evt => {
      if (evt.key === 'Shift') {
        document.onselectstart = '';
      }
    };
    const turnOffSelection = evt => {
      if (evt.key === 'Shift') {
        document.onselectstart = event => event.preventDefault();
      }
    };
    document.addEventListener('keydown', turnOffSelection);
    document.addEventListener('keyup', enableSelection);
    return () => {
      document.removeEventListener('keydown', turnOffSelection);
      document.removeEventListener('keyup', enableSelection);
    };
  }, []);

  const onSelectRow = (id, isShift = false) => {
    if (isShift) {
      if (selectedRows.includes(id)) {
        setSelectedRows(selectedRows.filter(i => i !== id));
      } else {
        setSelectedRows([...selectedRows, id]);
      }
    } else {
      setSelectedRows(selectedRows[0] === id ? [] : [id]);
    }
  };

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
      ellipsis: true,
      render: (text, record) => {
        return (
          <Button type="link" className="info-event-button" onClick={() => showTaskInfo(record.id)}>
            {text}
          </Button>
        );
      },
    },
    {
      title: 'BroadcastUrl',
      width: 300,
      dataIndex: 'descriptionUrl',
      ellipsis: true,
      render: text => {
        return (
          <a target="_blank" rel="noopener noreferrer" href={text}>
            {text}
          </a>
        );
      },
    },
    {
      title: 'Organizer',
      dataIndex: 'organizer',
      width: 200,
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
      sticky
      rowSelection={{
        selectedRowKeys: selectedRows,
      }}
      onRow={(record, rowIndex) => {
        return {
          onClick: event => {
            if (event.target.closest('.info-event-button')) return false;
            if (event.shiftKey) {
              onSelectRow(record.id, true);
            } else {
              onSelectRow(record.id);
            }
          }, // click row
          onDoubleClick: event => {}, // double click row
          onContextMenu: event => {}, // right button click row
          onMouseEnter: event => {}, // mouse enter row
          onMouseLeave: event => {}, // mouse leave row
          /* onselectstart: event => {
            event.preventDefault();
          } */
        };
      }}
      scroll={{
        x: '100vw',
      }}
    />
  );
};

export default ScheduleTable;
