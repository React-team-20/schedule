import { PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import React from 'react';
import { useDispatch } from 'react-redux';
import { showFormCreationEvent } from '../../actions';
import './new-event-button.css';

const NewEventButton = () => {
  const dispatch = useDispatch();
  const showDrawer = () => {
    dispatch(showFormCreationEvent());
  };
  return (
    <Button type="primary" shape="round" onClick={showDrawer} >
      <PlusOutlined style={{ display: 'inline-flex' }} /> New event
    </Button>
  );
};

export default NewEventButton;
