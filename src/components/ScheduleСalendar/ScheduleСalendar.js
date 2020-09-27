import {Badge, Calendar, Drawer, Tooltip} from 'antd';
import moment from 'moment-timezone';
import React, {useState} from 'react';
import {connect} from 'react-redux';
import {setTagStyle} from '../../utils';
import './schedule-calendar.css';
import ScheduleСalendarDrawer from './ScheduleCalendarDrawer';

const connector = connect(state => ({
  style: state.styles,
  timezone: state.app.timezone,
}));

const ScheduleСalendar = ({events, style, timezone}) => {
  const [drawer, setDrawer] = useState({visible: false});
  const [dayEvents, setDayEvents] = useState(0);

  const drawerDate = dayEvents ? moment(dayEvents[0].dateTime).tz(timezone).format('MMMM Do') : 0;

  const showDrawer = value => {
    setDrawer({visible: true});
    setDayEvents(value);
  };
  const hiderDrawer = () => {
    setDrawer({visible: false});
  };
  const getListData = value => {
    const listDatabyYear = events.filter(
      el => moment(el.dateTime).tz(timezone).format('Y') === value.format('Y')
    );
    const listDatabyMonth = listDatabyYear.filter(
      el => moment(el.dateTime).tz(timezone).format('D') === value.format('D')
    );
    const listDatabyDay = listDatabyMonth.filter(
      el => moment(el.dateTime).tz(timezone).format('M') === value.format('M')
    );
    return listDatabyDay;
  };
  const setStyle = item => {
    return {
      background: setTagStyle(item.type, style).background,
      color: setTagStyle(item.type, style).color,
    };
  };
  const dateCellRender = value => {
    const listData = getListData(value);
    return (
      <div
        className="events-calendar"
        onClick={() => {
          showDrawer(listData);
        }}
      >
        <div>
          <Badge
            size="small"
            style={{backgroundColor: '#108ee9'}}
            className="event-counter"
            count={listData.length}
          />
          {listData.map(item => (
            <div
              className={`event-box ${
                moment().format('x') > moment(item.dateTime).format('x') ? 'expired' : ''
              }`}
              key={item.id}
              style={setStyle(item)}
            >
              <Tooltip placement="topLeft" title={item.topic}>
                <span className="event-box-time">{item.time}</span>
                <span>{item.topic}</span>
              </Tooltip>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="calendar-container">
      <Calendar dateCellRender={dateCellRender} />
      <Drawer
        className="calendar-drawer-overview"
        zIndex={999}
        title={drawerDate}
        placement="bottom"
        closable={false}
        onClose={hiderDrawer}
        visible={drawer.visible}
      >
        <ScheduleСalendarDrawer dayEvents={dayEvents} />
      </Drawer>
    </div>
  );
};

export default connector(ScheduleСalendar);
