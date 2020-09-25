import React, {useState} from 'react';
import {MessageOutlined} from '@ant-design/icons';
import {Button, Form, Input, List, message} from 'antd';
import './feedback-form.css';

const FeedbackModal = () => {
  const [form] = Form.useForm();
  const [feedback, setFeedback] = useState('');

  const handleType = e => {
    setFeedback(e.target.value);
  };

  const handleSubmit = () => {
    let feedbacksArray;
    message.success('Feedback has been sent!');
    if (localStorage.getItem('feedbacks')) {
      feedbacksArray = JSON.parse(localStorage.getItem('feedbacks'));
    } else {
      feedbacksArray = [];
    }
    const feedbackId = new Date().getTime();
    const newFeedback = {feedbackId, feedback};
    feedbacksArray.push(newFeedback);
    localStorage.setItem('feedbacks', JSON.stringify(feedbacksArray));
    setFeedback('');
  };

  return(
    <Form layout="vertical" id="feedback-form" form={form} onFinish={handleSubmit}>
      <Form.Item>
        <List.Item>
          <List.Item.Meta avatar={<MessageOutlined />} title="Feedback:" />
        </List.Item>
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
  );
};

export default FeedbackModal;
