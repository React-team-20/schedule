import React from 'react';
import moment from 'moment-timezone';
import {Tag} from 'antd';
import {setTagStyle} from '../../../utils';
import './ScheduleCalendarDrawer.css';
import {connect} from 'react-redux';
import {showTaskOverview } from '../../../actions';

const connector = connect(
  state => ({
    timezone: state.app.timezone,
    style: state.styles,
  }),
  dispatch => ({
    showModal: value => dispatch(showTaskOverview(value))
  })
);

const ScheduleCalendarDrawer = ({dayEvents, timezone, style, showModal}) => {
  return (
    <div className="drawer-calendar-container">
      {dayEvents.map(item => (
        <div className="event-box-drawer" key={item.id} onClick={()=>{showModal(item.id)}}>
          <div className="tag-time">
            <Tag className="calendar-tag-drawer" color={setTagStyle(item.type, style).background}>
              {item.type
                .toUpperCase()
                .split('')
                .map(i => (i === '-' ? ' ' : i))
                .join('')}
            </Tag>
            <span className="calendar-time-drawer">
              <b>{moment(item.dateTime).tz(timezone).format('h:mm')}</b>
            </span>
          </div>
          <div><b>Topic: </b>{item.topic}</div>
          <span><b>Comment: </b>{item.comment}</span>
        </div>
      ))}
    </div>
  );
};

export default connector(ScheduleCalendarDrawer);
