import {DeleteOutlined} from '@ant-design/icons';
import {Button, Tooltip, message} from 'antd';
import React, {useContext} from 'react';
import {connect} from 'react-redux';
import {organizersLoaded, showLoader, hideLoader} from '../../../../actions';
import {ScheduleServiceContext} from '../../../ScheduleServiceContext';

const DeleteOrganizerButton = ({id, organizersLoaded, showLoader, hideLoader}) => {
  const {deleteOrganizer, getOrganizers} = useContext(ScheduleServiceContext);
  const delOrganizer = async e => {
    e.stopPropagation();
    showLoader();
    await deleteOrganizer(id);
    const newOrganizers = await getOrganizers();
    hideLoader();
    message.success('Organizer deleted');
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
  showLoader,
  hideLoader,
};

export default connect(null, mapDispatchToProps)(DeleteOrganizerButton);
