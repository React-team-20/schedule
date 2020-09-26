import {EyeOutlined} from '@ant-design/icons';
import {Button, Table} from 'antd';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {removeHiddenEvent, setHiddenEvents} from '../../actions';
import {getFilteredColumns} from '../../selectors';
import EventHideButton from './EventHideButton';
import './schedule-table.css';
import TableColumns from './TableColumns';

const ScheduleTable = ({events}) => {
  const dispatch = useDispatch();
  const {tableColumns, isShowPreview} = useSelector(state => state.app);
  const {hiddenEvents} = useSelector(state => state.events);
  const [selectedRows, setSelectedRows] = useState([]);
  const [filteredСolumns, setFilteredColumns] = useState([]);

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

  useEffect(() => {
    const hiddenTableColumns = tableColumns.filter(i => !i.checked).map(i => i.title);
    setFilteredColumns(
      getFilteredColumns({hiddenColumns: hiddenTableColumns, columns: TableColumns()})
    );
  }, [tableColumns]);

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

  return (
    <Table
      size="small"
      columns={filteredСolumns}
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
        columnTitle:
          selectedRows.length && !isShowPreview ? (
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
        };
      }}
      scroll={{
        x: '100vw',
      }}
    />
  );
};

export default ScheduleTable;
