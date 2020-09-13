import {Button, message} from 'antd';
import React, {useContext} from 'react';
import {useDispatch} from 'react-redux';
import {hideLoader, removeEvent, showLoader} from '../../../actions';
import {ScheduleServiceContext} from '../../ScheduleServiceContext';
import './remove-event-button.css';

const RemoveEventButton = ({id}) => {
  const dispatch = useDispatch();
  const {deleteEvent} = useContext(ScheduleServiceContext);
  const onRemoveEvent = () => {
    dispatch(showLoader());
    deleteEvent(id)
      .then(() => {
        message.success('Event deleted successfully');
        dispatch(removeEvent(id));
      })
      .catch(() => message.error('Something went wrong'))
      .finally(() => dispatch(hideLoader()));
  };
  return (
    <Button type="link" onClick={onRemoveEvent}>
      Delete
    </Button>
  );
};

export default RemoveEventButton;
