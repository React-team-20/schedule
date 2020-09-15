import {DeleteOutlined} from '@ant-design/icons';
import {Button, message, Popconfirm} from 'antd';
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
    <Popconfirm title="Sure to delete?" onConfirm={onRemoveEvent}>
      <Button type="dashed" icon={<DeleteOutlined />} />
    </Popconfirm>
  );
};

export default RemoveEventButton;
