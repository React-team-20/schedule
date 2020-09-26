import {DeleteOutlined} from '@ant-design/icons';
import {Button, Tooltip, message} from 'antd';
import React from 'react';
import {connect} from 'react-redux';
import {organizersLoaded, showLoader, hideLoader} from '../../../../actions';

const DeleteTypeButton = () => {
  return (
    <Tooltip title="Delete">
      <Button style={{border: 0, background: 'inherit'}} size="small" icon={<DeleteOutlined />} />
    </Tooltip>
  );
};

const mapDispatchToProps = {
  organizersLoaded,
  showLoader,
  hideLoader,
};

export default connect(null, mapDispatchToProps)(DeleteTypeButton);
