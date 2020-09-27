import {ClockCircleOutlined, EyeOutlined} from '@ant-design/icons';
import {Button, Divider, List} from 'antd';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {removeHiddenEvent, setHiddenEvents, showTaskOverview} from '../../../actions';
import {
  dateByMonthAndDayParse,
  dateByMonthAndYearParse,
  shortDateByDayOfWeekParse,
  shortDateByDayParse,
} from '../../../utils';
import GithubUserLink from '../../GithubUserLink';
import EventHideButton from '../../ScheduleTable/EventHideButton';
import TypeField from '../../ScheduleTable/TypeField';

const ScheduleListItem = data => {
  const dispatch = useDispatch();
  const {hiddenEvents} = useSelector(state => state.events);
  const [selectedRows, setSelectedRows] = useState([]);
  const {timezone, isShowPreview} = useSelector(state => state.app);

  let listData = data.slice();

  const setTimezone = (events, tz) => {
    return events.map(item => {
      item.timeZone = tz;
      return item;
    });
  };

  listData = setTimezone(listData, timezone);

  const handlerEventShow = id => {
    dispatch(removeHiddenEvent(id));
  };

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

  const handleClickCapture = (event, id) => {
    if (event.target.id) return false;

    if (event.shiftKey) {
      onSelectRow(id, true);
    } else {
      onSelectRow(id);
    }
  };

  const showTaskInfo = id => {
    dispatch(showTaskOverview(id));
  };

  const setItemClassName = item => {
    if (selectedRows.includes(item.id)) {
      return 'list-item selected-list-item';
    }
    if (hiddenEvents.includes(item.id)) {
      return 'list-item hidden-event';
    }
    if (hiddenEvents.includes(item.id) && selectedRows.includes(item.id)) {
      return 'list-item selected-list-item';
    }
    if (item.dateTime < Date.now()) {
      return 'list-item past-event';
    }
    if (item.dateTime < Date.now() && selectedRows.includes(item.id)) {
      return 'list-item selected-list-item';
    }
    return 'list-item';
  };

  const handlerEventHide = () => {
    dispatch(setHiddenEvents(selectedRows));
    setSelectedRows([]);
  };

  const getDivider = val => {
    return (
      <Divider className="list-item-divider" orientation="left">
        {val}
      </Divider>
    );
  };

  const getTime = item => {
    return (
      <>
        <span className="event-date">{dateByMonthAndDayParse(item.dateTime, item.timeZone)}, </span>
        <span className="event-time">
          <ClockCircleOutlined className="event-time-icon" />
          <span className="time-data">{item.time}</span>
        </span>
      </>
    );
  };

  let monthAndYear = null;

  const getMonthAndYearDivider = (item, index) => {
    const currentDate = dateByMonthAndYearParse(item.dateTime, item.timeZone);

    if (!monthAndYear) {
      monthAndYear = currentDate;
      return getDivider(currentDate);
    }

    if (index === 0 && currentDate === monthAndYear) {
      return getDivider(monthAndYear);
    }

    if (monthAndYear !== currentDate) {
      monthAndYear = currentDate;
      return getDivider(currentDate);
    }  
  };

  return (
    <div className="list-item-wrapper">
      <div className="hide-button-wrapper">
        {selectedRows.length && !isShowPreview ? (
          <EventHideButton handlerEventHide={handlerEventHide} />
        ) : (
          ''
        )}
      </div>
      <List
        pagination={{defaultCurrent: 1, defaultPageSize: 7,}}
        itemLayout="horizontal"
        dataSource={listData}
        renderItem={(item, index) => (
          <>
            {getMonthAndYearDivider(item, index)}
            <List.Item
              className={setItemClassName(item)}
              onClickCapture={event => handleClickCapture(event, item.id)}
              onDoubleClick={() => showTaskInfo(item.id)}
            >
              <div className="button-wrapper">
                {hiddenEvents.includes(item.id) ? (
                  <Button
                    type="text"
                    className="show-event-button list-item-button"
                    onClick={() => handlerEventShow(item.id)}
                  >
                    <EyeOutlined />
                  </Button>
                ) : (
                  ''
                )}
              </div>
              <div className="item-list-content">
                <div className="tag-wrapper">
                  <TypeField type={item.type} />
                </div>
                <List.Item.Meta
                  title={
                    <>
                      <p className="short-date-wrapper">
                        <span className="date-week">
                          {shortDateByDayParse(item.dateTime, item.timeZone)}
                        </span>
                        <span className="date-day">
                          {shortDateByDayOfWeekParse(item.dateTime, item.timeZone)}
                        </span>
                      </p>
                      <Button
                        type="link"
                        className="info-event-button"
                        onClick={() => showTaskInfo(item.id)}
                        style={{padding: '0'}}
                      >
                        <span className="event-topic">{item.topic}</span>
                      </Button>
                    </>
                  }
                  description={getTime(item)}
                />
                {item.organizer ? (
                  <div className="item-organizer">
                    <span className="item-organizer-label">organizer:</span>
                    {GithubUserLink(item.organizer)}
                  </div>
                ) : (
                  ''
                )}
              </div>
            </List.Item>
          </>
        )}
      />
    </div>
  );
};

export default ScheduleListItem;
