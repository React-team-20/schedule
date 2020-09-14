import {Modal} from 'antd';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {hideTaskOverview} from '../../actions';
import './task-overview.css';

const TaskOverview = () => {
  const dispatch = useDispatch();
  const events = useSelector(state => state.events);
  const {isShowTaskOverview, currentEvent} = useSelector(state => state.app);
  const [event, setEvent] = useState(null);

  useEffect(() => {
    if (isShowTaskOverview && currentEvent) {
      setEvent(events.find(i => i.id === currentEvent));
    }
    // eslint-disable-next-line
  }, [isShowTaskOverview]);

  const handleOk = () => {
    dispatch(hideTaskOverview());
    setEvent(null);
  };

  const handleCancel = () => {
    dispatch(hideTaskOverview());
    setEvent(null);
  };
  return (
    <Modal
      title="Task information"
      visible={isShowTaskOverview}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <p>{JSON.stringify(event)}</p>
    </Modal>
  );
};

export default TaskOverview;
