import {Button, Tooltip} from 'antd';
import React, {useContext} from 'react';
import {connect} from 'react-redux';
import {organizersLoaded, setAlertMessage} from '../../../actions';
import {DeleteOutlined} from '@ant-design/icons';
import {ScheduleServiceContext} from '../../ScheduleServiceContext';

const DeleteOrganizerButton = ({id, organizersLoaded, setAlertMessage}) => {
  const {deleteOrganizer, getOrganizers} = useContext(ScheduleServiceContext);
  const delOrganizer = async e => {
    e.stopPropagation();
    await deleteOrganizer(id);
    const newOrganizers = await getOrganizers();
    setAlertMessage('Organizer deleted');
    organizersLoaded(newOrganizers);
  };

  return (
    <Tooltip title="Delete">
      <Button
        style={{border: 0, background: 'inherit'}}
        size="small"
        icon={<DeleteOutlined />}
        onClick={delOrganizer}
      />
    </Tooltip>
  );
};

const mapDispatchToProps = {
  organizersLoaded,
  setAlertMessage,
};

export default connect(/* mapStateToProps */ null, mapDispatchToProps)(DeleteOrganizerButton);
