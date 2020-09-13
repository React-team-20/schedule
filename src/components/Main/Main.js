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

const Main = () => {
  const dispatch = useDispatch();
  const events = useSelector(state => state.events);
  const currentView = useSelector(state => state.app.scheduleView);
  const tz = useSelector(state => state.app.timezone);
  const isAlert = useSelector(state => state.app.alert);
  const alertMessage = useSelector(state => state.app.alertMessage);
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
      {
        {
          table: <ScheduleTable />,
          list: <ScheduleList />,
          calendar: <ScheduleСalendar />,
        }[currentView]
      }
      <CreateEvent fetchEvents={fetchEvents} />
    </>
  );
};

export default Main;
