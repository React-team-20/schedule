import {EditOutlined} from '@ant-design/icons';
import {Button} from 'antd';
import React from 'react';
import {useDispatch} from 'react-redux';
import {showFormEditEvent} from '../../../actions';
import './edit-event-button.css';

const EditEventButton = ({id}) => {
  const dispatch = useDispatch();
  const showFormEdit = () => {
    dispatch(showFormEditEvent(id));
  };
  return <Button type="dashed" onClick={showFormEdit} icon={<EditOutlined />} />;
};

export default EditEventButton;
