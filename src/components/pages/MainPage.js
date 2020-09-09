import React, {useContext} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {scheduleLoaded, hideLoader} from '../../actions';
import ScheduleList from '../ScheduleList';
import {ScheduleServiceContext} from '../ScheduleServiceContext';
import ScheduleTable from '../ScheduleTable';
import ScheduleСalendar from '../ScheduleСalendar';
import Spinner from '../Spinner';

const MainPage = () => {
  const dispatch = useDispatch();
  const currentView = useSelector(state => state.app.viewSelect);
  const loading = useSelector(state => state.app.loading);
  useContext(ScheduleServiceContext)
    .getEvents()
    .then(events => {
      dispatch(scheduleLoaded(events));
      dispatch(hideLoader());
    });

  if (loading) {
    return <Spinner />;
  }

  return {
    table: <ScheduleTable />,
    list: <ScheduleList />,
    calendar: <ScheduleСalendar />,
  }[currentView];
};

export default MainPage;
