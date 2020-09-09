import {PageHeader} from 'antd';
import React from 'react';
import ScheduleViewSelect from '../ScheduleViewSelect';
import NewEventButton from '../NewEventButton';
import './header.css';

const Header = () => {
  return (
    <PageHeader className="site-page-header" title="Schedule">
      <ScheduleViewSelect />
      <NewEventButton />
    </PageHeader>
  );
};

export default Header;
