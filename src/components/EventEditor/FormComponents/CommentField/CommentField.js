import {Form, Input} from 'antd';
import React from 'react';
import reactComponentDebounce from 'react-component-debounce';
import './comment-field.css';

const InputDeb = reactComponentDebounce(150, 200)(Input);

const CommentField = () => {
  return (
    <Form.Item
      name="comment"
      label="Comment"
      rules={[
        {
          type: 'string',
          max: 80,
          message: 'Max length of string 80 characters.',
        },
      ]}
    >
      <InputDeb name="comment" rows={2} placeholder="Please add comment" maxLength={80} />
    </Form.Item>
  );
};

export default CommentField;
