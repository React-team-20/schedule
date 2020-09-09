import {PageHeader} from 'antd';
import React from 'react';
import ScheduleViewSelect from '../ScheduleViewSelect';
import './header.css';

const Header = () => {
  return (
    <PageHeader className="site-page-header" title="Schedule">
      <ScheduleViewSelect />
    </PageHeader>
  );
};

export default Header;
