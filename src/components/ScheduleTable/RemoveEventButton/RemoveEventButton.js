import {Button} from 'antd';
import React, {useContext} from 'react';
import {useDispatch} from 'react-redux';
import {removeEvent} from '../../../actions';
import {ScheduleServiceContext} from '../../ScheduleServiceContext';
import './remove-event-button.css';

const RemoveEventButton = ({id}) => {
  const dispatch = useDispatch();
  const scheduleService = useContext(ScheduleServiceContext);
  const onRemoveEvent = () => {
    dispatch(removeEvent(id));
    scheduleService.deleteEvent(id);
  };
  return (
    <Button type="link" onClick={onRemoveEvent}>
      Delete
    </Button>
  );
};

export default RemoveEventButton;
