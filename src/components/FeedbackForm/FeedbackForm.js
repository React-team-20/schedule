import React, {useEffect, useState} from 'react';
import {MessageOutlined} from '@ant-design/icons';
import {Button, Form, Input, List, message} from 'antd';
import './feedback-form.css';

const FeedbackModal = ({ id }) => {
  const [form] = Form.useForm();
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    if(localStorage.getItem('feedbacks')) {
      const storedFeedback = JSON.parse(localStorage.getItem('feedbacks'));
      const currentField = storedFeedback.find(item => item.id === id);
      if(currentField) {
        setFeedback(currentField.feedback);
      }
    }
  }, [id]);

  const handleType = e => {
    setFeedback(e.target.value);
  };

  const handleSubmit = () => {
    let feedbacksArray = [];
    message.success('Feedback has been sent!');
    if(localStorage.getItem('feedbacks')) {
      feedbacksArray = JSON.parse(localStorage.getItem('feedbacks'));
    }
    let currentField = feedbacksArray.find(item => item.id === id);
    if(currentField) {
      currentField.feedback = feedback;
    } else {
      const newFeedback = {id, feedback};
      feedbacksArray.push(newFeedback);
    }
    localStorage.setItem('feedbacks', JSON.stringify(feedbacksArray));
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
