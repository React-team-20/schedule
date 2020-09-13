import React, {useContext, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {hideLoader, scheduleLoaded, showLoader} from '../../actions';
import CreateEvent from '../CreateEvent';
import ScheduleList from '../ScheduleList';
import {ScheduleServiceContext} from '../ScheduleServiceContext';
import ScheduleTable from '../ScheduleTable';
import ScheduleСalendar from '../ScheduleСalendar';

const Main = () => {
  const dispatch = useDispatch();
  const events = useSelector(state => state.events);
  const currentView = useSelector(state => state.app.viewSelect);
  const tz = useSelector(state => state.app.timezone);
  const {getEvents, transformEventData} = useContext(ScheduleServiceContext);

  const fetchEvents = () => {
    dispatch(showLoader());
    getEvents(tz)
      .then(evts => {
        dispatch(scheduleLoaded(evts));
      })
      .finally(() => dispatch(hideLoader()));
  };

  useEffect(() => {
    fetchEvents();
    // eslint-disable-next-line
  }, []);

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
