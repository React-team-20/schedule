import React from 'react';
import ScheduleList from '../ScheduleList';
import ScheduleTable from '../ScheduleTable';
import ScheduleСalendar from '../ScheduleСalendar';

const MainPage = () => {
  return (
    <>
      <ScheduleTable />
      <ScheduleList />
      <ScheduleСalendar />
    </>
  );
};

export default MainPage;
