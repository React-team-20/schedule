import {DeleteOutlined} from '@ant-design/icons';
import {Button, message, Popconfirm, Tooltip} from 'antd';
import React, {useContext} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {hideLoader, removeEvent, showLoader, removeHiddenEvent} from '../../../actions';
import {ScheduleServiceContext} from '../../ScheduleServiceContext';
import './remove-event-button.css';

const RemoveEventButton = ({id}) => {
  const dispatch = useDispatch();
  const {userRole} = useSelector(state => state.app);
  const {deleteEvent} = useContext(ScheduleServiceContext);
  const onRemoveEvent = () => {
    dispatch(showLoader());
    deleteEvent(id)
      .then(() => {
        message.success('Event deleted successfully');
        dispatch(removeEvent(id));
        dispatch(removeHiddenEvent(id));
      })
      .catch(() => message.error('Something went wrong'))
      .finally(() => dispatch(hideLoader()));
  };
  return userRole === 'mentor' ? (
    <Popconfirm title="Sure to delete?" onConfirm={onRemoveEvent}>
      <Tooltip title="Delete event" placement="bottom">
        <Button type="dashed" icon={<DeleteOutlined />} />
      </Tooltip>
    </Popconfirm>
  ) : (
    ''
  );
};

export default RemoveEventButton;
