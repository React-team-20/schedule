import {Button} from 'antd';
import React from 'react';
import {useDispatch} from 'react-redux';
import {showTaskOverview} from '../../../actions';
import './topic-button.css';

const TopicButton = ({text, id}) => {
  const dispatch = useDispatch();
  const showTaskInfo = () => {
    dispatch(showTaskOverview(id));
  };

  return (
    <Button type="link" className="info-event-button" onClick={showTaskInfo} style={{padding: '0'}}>
      {text}
    </Button>
  );
};

export default TopicButton;
