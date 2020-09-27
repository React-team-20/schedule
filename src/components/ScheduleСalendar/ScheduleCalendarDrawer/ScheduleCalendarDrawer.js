import {Tag} from 'antd';
import React from 'react';
import {connect} from 'react-redux';
import {showTaskOverview} from '../../../actions';
import {setTagStyle} from '../../../utils';
import './ScheduleCalendarDrawer.css';

const connector = connect(
  state => ({
    timezone: state.app.timezone,
    style: state.styles,
  }),
  dispatch => ({
    showModal: value => dispatch(showTaskOverview(value)),
  })
);

const ScheduleCalendarDrawer = ({dayEvents, style, showModal}) => {
  return (
    <div className="drawer-calendar-container">
      {dayEvents.map(item => (
        <div
          className="event-box-drawer"
          key={item.id}
          onClick={() => {
            showModal(item.id);
          }}
        >
          <div className="tag-time">
            <Tag className="calendar-tag-drawer" color={setTagStyle(item.type, style).background}>
              {item.type
                .toUpperCase()
                .split('')
                .map(i => (i === '-' ? ' ' : i))
                .join('')}
            </Tag>
            <span className="calendar-time-drawer">
              <b>{item.time}</b>
            </span>
          </div>
          <div>
            <b>Topic: </b>
            {item.topic}
          </div>
          <span>
            <b>Comment: </b>
            {item.comment}
          </span>
        </div>
      ))}
    </div>
  );
};

export default connector(ScheduleCalendarDrawer);
