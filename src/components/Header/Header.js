import {PageHeader} from 'antd';
import React from 'react';
import ScheduleViewSelect from '../ScheduleViewSelect';
import TimeZoneSelect from '../TimeZoneSelect';
import NewEventButton from '../NewEventButton';
import './header.css';

const Header = () => {
  return (
    <PageHeader className="site-page-header" title="Schedule">
      <ScheduleViewSelect />
      <TimeZoneSelect />
      <NewEventButton />
    </PageHeader>
  );
};

export default Header;
