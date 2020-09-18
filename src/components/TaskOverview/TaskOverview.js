import {Modal, Avatar, Input, Button, Form} from 'antd';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {hideTaskOverview} from '../../actions';
import './task-overview.css';

const TaskOverview = () => {
  const dispatch = useDispatch();
  const events = useSelector(state => state.events.events);
  const {isShowTaskOverview, currentEvent} = useSelector(state => state.app);
  const [event, setEvent] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [form] = Form.useForm();

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

  const handleType = (e) => {
    setFeedback(e.target.value);
  };

  const handleSubmit = () => {
    form.resetFields();
    let feedbacksArray;
    if(localStorage.getItem("feedbacks")) {
      feedbacksArray = JSON.parse(localStorage.getItem("feedbacks"));
    } else {
      feedbacksArray = [];
    }
    const feedbackId = new Date().getTime();
    const newFeedback = {feedbackId, feedback};
    feedbacksArray.push(newFeedback);
    localStorage.setItem('feedbacks', JSON.stringify(feedbacksArray));
  };

  return (
    <Modal
      title="Task information"
      visible={isShowTaskOverview}
      onOk={handleOk}
      onCancel={handleCancel}
    >
    {event &&
      <div className="overview">
        <h2 className="topic">
          {event.topic}
        </h2>
        {event.organizer && <div className="organizer">
          <span>Organizer:</span>
          <a href={event.organizer.htmlUrl} target="_blank">
            <Avatar
              size="small"
              src={event.organizer.avatar}
            />
            {event.organizer.name}
          </a>
        </div>}
        <div>
          <span>Description:</span> {event.description}
        </div>
        {event.taskObj.demoUrl && <div><span>Demo:</span> {event.taskObj.demoUrl}</div>}
        <div>
          <span>Materials:</span>{event.taskObj.materials}
        </div>
        {event.place && <div><span>Materials:</span>{event.taskObj.materials}</div>}
        <div>
          <Form layout="vertical" id="feedback-form" form={form} onFinish={handleSubmit}>
            <Form.Item
              name="feedback"
              label="Feedback:"
            >
              <Input.TextArea
                rows={5}
                placeholder="Please leave your feedback"
                onChange={handleType}
                value={feedback} 
              />
            </Form.Item>
            <Button type="primary" form="feedback-form" htmlType="submit">
              Send feedback
            </Button>
          </Form>
        </div>
      </div>
    }
    </Modal>
  );
};

export default TaskOverview;
