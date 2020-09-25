import React, {useEffect, useState} from 'react';
import {MessageOutlined} from '@ant-design/icons';
import {Button, Form, Input, List, message} from 'antd';
import './feedback-form.css';

const FeedbackModal = () => {
  const [form] = Form.useForm();
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    if(localStorage.getItem('feedback')) {
      let storedFeedback = localStorage.getItem('feedback');
      setFeedback(storedFeedback);
    }
  }, []);

  const handleType = e => {
    setFeedback(e.target.value);
  };

  const handleSubmit = () => {
    message.success('Feedback has been sent!');
    localStorage.setItem('feedback', feedback);
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
