import {Button} from 'antd';
import React from 'react';
import './event-hide-button.css';

const EventHideButton = ({handlerEventHide}) => {
  return (
    <Button
      type="primary"
      ghost
      onClick={handlerEventHide}
      style={{fontSize: '14px', lineHeight: 1, padding: '3px 5px', height: 'auto'}}
    >
      <span>Hide</span>
    </Button>
  );
};

export default EventHideButton;
