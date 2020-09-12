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
  return (
    <Button type="link" onClick={showFormEdit}>
      Edit
    </Button>
  );
};

export default EditEventButton;
