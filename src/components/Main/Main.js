import {message} from 'antd';
import React, {useContext, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  hideAlert,
  hideLoader,
  scheduleLoaded,
  setAlertMessage,
  showAlert,
  showLoader,
} from '../../actions';
import CreateEvent from '../CreateEvent';
import ScheduleList from '../ScheduleList';
import {ScheduleServiceContext} from '../ScheduleServiceContext';
import ScheduleTable from '../ScheduleTable';
import ScheduleСalendar from '../ScheduleСalendar';
import TaskOverview from '../TaskOverview';
import EventTypeFilter from '../EventTypeFilter';

const Main = () => {
  const dispatch = useDispatch();
  const events = useSelector(state => state.events.events);
  const {alert: isAlert, alertMessage, timezone: tz, scheduleView} = useSelector(
    state => state.app
  );
  const {getEvents, transformEventData} = useContext(ScheduleServiceContext);

  const fetchEvents = () => {
    dispatch(showLoader());
    getEvents(tz)
      .then(evts => {
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

  return (
    <>
      <EventTypeFilter />
      {
        {
          table: <ScheduleTable />,
          list: <ScheduleList />,
          calendar: <ScheduleСalendar />,
        }[scheduleView]
      }
      <CreateEvent fetchEvents={fetchEvents} />
      <TaskOverview />
    </>
  );
};

export default Main;
