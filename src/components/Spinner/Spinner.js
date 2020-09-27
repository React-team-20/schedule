import {Spin} from 'antd';
import React from 'react';
import './spinner.css';

const Spinner = () => {
  return (
    <div className="spin-container">
      <Spin tip="Loading..." size="large" />
    </div>
  );
};

export default Spinner;
