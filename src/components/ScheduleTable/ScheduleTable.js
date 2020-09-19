import {EyeOutlined, RightOutlined} from '@ant-design/icons';
import {Button, Table, Tag, Tooltip} from 'antd';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {setHiddenEvents, removeHiddenEvent, showTaskOverview} from '../../actions';
import {isLinkRegExp, setTagColor} from '../../utils';
import EventHideButton from './EventHideButton';
import GithubUserLink from '../GithubUserLink';
import EditEventButton from './EditEventButton';
import RemoveEventButton from './RemoveEventButton';
import './schedule-table.css';

const ScheduleTable = ({events}) => {
  const dispatch = useDispatch();
  const {userRole} = useSelector(state => state.app);
  const {hiddenEvents} = useSelector(state => state.events);
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

  const handlerEventHide = () => {
    dispatch(setHiddenEvents(selectedRows));
    setSelectedRows([]);
  };

  const handlerEventShow = id => {
    dispatch(removeHiddenEvent(id));
  };

  const showTaskInfo = id => {
    dispatch(showTaskOverview(id));
  };

  const columns = [
    {
      title: 'Date',
      dataIndex: 'date',
      width: 90,
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
      render: (_, record) => (
        <Tag className="list-item-tag" color={setTagColor(record.type)}>
          {record.type
            .toUpperCase()
            .split('')
            .map(i => (i === '-' ? ' ' : i))
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
          <Button
            type="link"
            className="info-event-button"
            onClick={() => showTaskInfo(record.id)}
            style={{padding: '0'}}
          >
            {text}
          </Button>
        );
      },
    },
    {
      title: 'Link',
      width: 200,
      dataIndex: 'descriptionUrl',
      ellipsis: true,
      render: text => {
        return isLinkRegExp.test(text) ? (
          <a className="events-link" target="_blank" rel="noopener noreferrer" href={text}>
            Go to <RightOutlined />
          </a>
        ) : (
          <span>{text}</span>
        );
      },
    },
    {
      title: 'Organizer',
      dataIndex: 'organizer',
      width: 200,
      render: (_, record) => {
        return record.organizer ? (
          <div className="item-organizer">{GithubUserLink(record.organizer)}</div>
        ) : (
          ''
        );
      },
    },
    {
      title: 'Comment',
      dataIndex: 'comment',
      width: 200,
    },
  ];

  const actions = {
    title: 'Action',
    key: 'operation',
    fixed: 'right',
    width: 80,
    render: (_, record) => (
      <div className="table-action-buttons">
        <Tooltip title="edit event">
          <EditEventButton id={record.id} />
        </Tooltip>
        <Tooltip title="delete event">
          <RemoveEventButton id={record.id} />
        </Tooltip>
      </div>
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
      rowClassName={record => {
        if (hiddenEvents.includes(record.id)) {
          return 'hidden-event';
        }
        if (record.dateTime < Date.now()) {
          return 'past-event';
        }
      }}
      sticky
      rowSelection={{
        fixed: true,
        columnTitle: selectedRows.length ? (
          <EventHideButton handlerEventHide={handlerEventHide} />
        ) : (
          ''
        ),
        hideSelectAll: true,
        selectedRowKeys: selectedRows,
        renderCell: (_, record) => {
          if (hiddenEvents.includes(record.id)) {
            return (
              <Button
                type="text"
                className="show-event-button"
                onClick={() => handlerEventShow(record.id)}
              >
                <EyeOutlined />
              </Button>
            );
          }
        },
      }}
      onRow={record => {
        return {
          onClick: event => {
            if (
              event.target.closest('.info-event-button') ||
              event.target.closest('.show-event-button') ||
              event.target.closest('.events-link') ||
              event.target.closest('.item-organizer a') ||
              event.target.closest('.table-action-buttons') ||
              event.target.closest('.ant-popover-inner-content')
            )
              return false;
            if (event.shiftKey) {
              onSelectRow(record.id, true);
            } else {
              onSelectRow(record.id);
            }
          },
          onDoubleClick: () => {
            showTaskInfo(record.id);
          },
        };
      }}
      scroll={{
        x: '100vw',
      }}
    />
  );
};

export default ScheduleTable;
