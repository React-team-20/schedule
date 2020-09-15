import {message} from 'antd';
import React, {useContext, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  hideAlert,
  hideLoader,
  organizersLoaded,
  scheduleLoaded,
  setAlertMessage,
  showAlert,
  showLoader,
} from '../../actions';
import {getFilteredEvents} from '../../selectors';
import CreateEvent from '../CreateEvent';
import EditEvent from '../EditEvent/EditEvent';
import EventTypeFilter from '../EventTypeFilter';
import ScheduleList from '../ScheduleList';
import {ScheduleServiceContext} from '../ScheduleServiceContext';
import ScheduleTable from '../ScheduleTable';
import ScheduleСalendar from '../ScheduleСalendar';
import TaskOverview from '../TaskOverview';

const Main = () => {
  const dispatch = useDispatch();
  const {getEvents, transformEventData, getOrganizers} = useContext(ScheduleServiceContext);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const {alert: isAlert, alertMessage, timezone: tz, scheduleView} = useSelector(
    state => state.app
  );
  const data = useSelector(state => state.events);
  const {events} = data;

  const fetchEvents = () => {
    dispatch(showLoader());
    getEvents(tz)
      .then(evts => {
        getOrganizers().then(organizers => dispatch(organizersLoaded(organizers)));
        dispatch(scheduleLoaded(evts));
        dispatch(showAlert());
      })
      .catch(() => message.error('Something went wrong'))
      .finally(() => dispatch(hideLoader()));
  };

  useEffect(() => {
    dispatch(setAlertMessage('Schedule uploaded successfully!'));
    fetchEvents();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (alertMessage && isAlert) {
      message.success(alertMessage);
      dispatch(setAlertMessage(null));
      dispatch(hideAlert());
    }
    // eslint-disable-next-line
  }, [isAlert]);

  useEffect(() => {
    const newEvents = transformEventData(events, tz);
    dispatch(scheduleLoaded(newEvents));
    // eslint-disable-next-line
  }, [tz]);

  useEffect(() => {
    const {eventTypeFilter} = data;
    setFilteredEvents(eventTypeFilter.length ? getFilteredEvents(data) : events);
  }, [data, events]);

  return (
    <>
      <EventTypeFilter />
      {
        {
          table: (
            <>
              <ScheduleTable events={filteredEvents} />
              <EditEvent fetchEvents={fetchEvents} />
            </>
          ),
          list: <ScheduleList events={filteredEvents} />,
          calendar: <ScheduleСalendar events={filteredEvents} />,
        }[scheduleView]
      }
      <CreateEvent fetchEvents={fetchEvents} />
      <TaskOverview />
    </>
  );
};

export default Main;
