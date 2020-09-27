import React from 'react';
import {Space} from 'antd';
import RoleSelect from '../RoleSelect';

import './headerTitle.css';


const HeaderTitle = () => {
   return (
    <div className="header-title">
      <a href="/" className="logo">
        {' '}
      </a>
      <div className="container-title">
        <h2 className="title">Schedule</h2>
        <span className="subtitle"> RSS React 2020 Q3 </span>
      </div>

      <Space>
        <RoleSelect />
      </Space>
    </div>
  );
};

export default HeaderTitle;
