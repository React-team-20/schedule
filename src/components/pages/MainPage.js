import React, {useContext, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {hideLoader, scheduleLoaded} from '../../actions';
import ScheduleList from '../ScheduleList';
import {ScheduleServiceContext} from '../ScheduleServiceContext';
import ScheduleTable from '../ScheduleTable';
import ScheduleСalendar from '../ScheduleСalendar';
import Spinner from '../Spinner';
import CreateEvent from '../CreateEvent'

const MainPage = () => {
  const dispatch = useDispatch();
  const events = useSelector(state => state.events);
  const currentView = useSelector(state => state.app.viewSelect);
  const loading = useSelector(state => state.app.loading);
  const tz = useSelector(state => state.app.timezone);
  const scheduleService = useContext(ScheduleServiceContext);

  useEffect(() => {
    scheduleService
      .getEvents(tz)
      .then(evts => {
        dispatch(scheduleLoaded(evts));
      })
      .finally(() => dispatch(hideLoader()));
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const newEvents = scheduleService.transformEventData(events, tz);
    dispatch(scheduleLoaded(newEvents));
    // eslint-disable-next-line
  }, [tz]);

  if (loading) {
    return <Spinner />;
  }

  return {
    table: <><ScheduleTable /><CreateEvent/> </>,
    list: <><ScheduleList /><CreateEvent/></>,
    calendar: <><ScheduleСalendar /><CreateEvent/></>,
  }[currentView];
};

export default MainPage;
