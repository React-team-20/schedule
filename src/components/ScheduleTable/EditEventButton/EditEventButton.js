import {EditOutlined} from '@ant-design/icons';
import {Button, Tooltip} from 'antd';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {showFormEditEvent} from '../../../actions';
import './edit-event-button.css';

const EditEventButton = ({id}) => {
  const dispatch = useDispatch();
  const {userRole, isShowPreview} = useSelector(state => state.app);
  const showFormEdit = () => {
    dispatch(showFormEditEvent(id));
  };
  return userRole === 'mentor' && !isShowPreview ? (
    <Tooltip title="Edit event" placement="bottom">
      <Button type="dashed" onClick={showFormEdit} icon={<EditOutlined />} />
    </Tooltip>
  ) : (
    ''
  );
};

export default EditEventButton;
