import React from 'react';
import moment from 'moment';
import {connect} from 'react-redux';
import {Calendar, Tag, Badge} from 'antd';
import './schedule-calendar.css';

const connector = connect(state => ({
  info: state.events,
}));

const ScheduleСalendar = ({info}) => {
  function getListData(value) {
    const listDatabyMonth = info.filter(
      el => moment(el.dateTime).format('D') === value.format('D')
    );
    const listDatabyDay = listDatabyMonth.filter(
      el => moment(el.dateTime).format('M') === value.format('M')
    );
    return listDatabyDay;
  }

  function dateCellRender(value) {
    const listData = getListData(value);
    return (
      <div className="events">
        <div>
          <Badge
            size="small"
            style={{backgroundColor: '#108ee9'}}
            className="event-counter"
            count={listData.length}
          />
          {listData.map(item => (
            <div className="event-box" key={item.id}>
              <Tag>{item.type}</Tag>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="calendar-container">
      <Calendar
        dateCellRender={dateCellRender}
      />
    </div>
  );
};

export default connector(ScheduleСalendar);
