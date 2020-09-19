import React, {useState} from 'react';
import moment from 'moment-timezone';
import {Calendar, Tag, Badge, Drawer} from 'antd';
import {setTagColor} from '../../utils';
import ScheduleСalendarDrawer from './ScheduleCalendarDrawer';
import './schedule-calendar.css';

const ScheduleСalendar = ({events}) => {
  const [drawer, setDrawer] = useState({visible: false});
  const [dayEvents, setDayEvents] = useState(0);

  const showDrawer = value => {
    setDrawer({visible: true});
    setDayEvents(value);
  };

  const hiderDrawer = () => {
    setDrawer({visible: false});
  };

  function getListData(value) {
    const listDatabyYear = events.filter(
      el => moment(el.dateTime).format('Y') === value.format('Y')
    );
    const listDatabyMonth = listDatabyYear.filter(
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
      <div
        className="events"
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
            <div className="event-box" key={item.id}>
              <Tag className="tag-type-calendar" color={setTagColor(item.type)}>
                {item.type}
              </Tag>
            </div>
          ))}
        </div>
      </div>
    );
  }
  const drawerDate = dayEvents ? moment(dayEvents[0].dateTime).format('MMMM Do') : 0;
  return (
    <div className="calendar-container">
      <Calendar dateCellRender={dateCellRender} />
      <Drawer
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

export default ScheduleСalendar;
