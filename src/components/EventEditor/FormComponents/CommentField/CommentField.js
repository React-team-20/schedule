import {Form, Input} from 'antd';
import React from 'react';
import './comment-field.css';

const CommentField = ({onChangeInputs}) => {
  return (
    <Form.Item onChange={onChangeInputs} name="comment" label="Comment">
      <Input.TextArea name="comment" rows={2} placeholder="Please add comment" />
    </Form.Item>
  );
};

export default CommentField;
