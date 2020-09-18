import {Modal, Checkbox, Avatar} from 'antd';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {hideTaskOverview} from '../../actions';
import './task-overview.css';

const TaskOverview = () => {
  const dispatch = useDispatch();
  const events = useSelector(state => state.events.events);
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
    {event &&
      <>
      <h2 className = 'topic'>
        {event.topic}
      </h2>
      <p className = 'organizer'>
        <span>Organizer:</span>
        <a href = {event.organizer.htmlUrl} target = '_blank'>
          <Avatar size = 'small' src = {event.organizer.avatar} />
          {event.organizer.name}
        </a>
      </p>
      <p><span>Description:</span> {event.description}</p>
      {event.taskObj.demoUrl && <p><span>Demo:</span> {event.taskObj.demoUrl}</p>}
      <p><span>Materials:</span>{event.taskObj.materials}</p>
      {event.place && <p><span>Materials:</span>{event.taskObj.materials}</p>}
      <p>
        Allow feedback <Checkbox />
      </p>
      </>
    }
    </Modal>
  );
};

export default TaskOverview;
