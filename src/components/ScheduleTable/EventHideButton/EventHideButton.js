import {Button} from 'antd';
import React from 'react';
import './event-hide-button.css';

const EventHideButton = ({handlerEventHide}) => {
  return (
    <Button type="primary" ghost onClick={handlerEventHide} className="event-hide-button">
      <span>Hide</span>
    </Button>
  );
};

export default EventHideButton;
