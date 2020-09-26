import {Form, Input} from 'antd';
import React from 'react';
import './comment-field.css';

const CommentField = () => {
  return (
    <Form.Item
      name="comment"
      label="Comment"
      rules={[
        {
          type: 'string',
          max: 80,
          transform(value) {
            return value;
          },
          message: 'Max length of string 80 characters.',
        },
      ]}
    >
      <Input.TextArea name="comment" rows={2} placeholder="Please add comment" />
    </Form.Item>
  );
};

export default CommentField;
