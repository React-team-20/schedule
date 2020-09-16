import React from 'react';
import moment from 'moment';
import {Tag} from 'antd';
import {setTagColor} from '../../../utils';
import './ScheduleCalendarDrawer.css';
const ScheduleCalendarDrawer = ({dayEvents}) => {
    return (<div className='drawer-calendar-container'>
        {dayEvents.map(item => (
            <div className="event-box-drawer" key={item.id}>
              <div><Tag color={setTagColor(item.type)}>{item.type}</Tag>
                <span>{moment(item.dateTime).format("h:mm")}</span>
                </div>              
                <span>{item.topic}</span>
                <span>{item.description}</span>
            </div>
          ))}
    </div>)
}

export default ScheduleCalendarDrawer;