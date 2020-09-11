import {Button} from 'antd';
import React from 'react';
import {useDispatch} from 'react-redux';
import {removeEvent} from '../../../actions';
import './remove-event-button.css';
import ScheduleService from '../../../services/schedule-service';

const {deleteEvent} = new ScheduleService();

const RemoveEventButton = ({id}) => {
  const dispatch = useDispatch();
  const onRemoveEvent = () => {
    dispatch(removeEvent(id));
    deleteEvent(id);
  };
  return (
    <Button type="link" onClick={onRemoveEvent}>
      Delete
    </Button>
  );
};

export default RemoveEventButton;
