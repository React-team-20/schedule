import {DeleteOutlined} from '@ant-design/icons';
import {Button, Tooltip, message} from 'antd';
import React from 'react';
import {connect} from 'react-redux';
import {deleteType} from '../../../../actions';

const DeleteTypeButton = ({id, deleteType}) => {
  const deleteCurrentType = e => {
    e.stopPropagation();
    deleteType(id);
    message.success('Type deleted');
  };

  return (
    <Tooltip title="Delete">
      <Button
        style={{border: 0, background: 'inherit'}}
        size="small"
        icon={<DeleteOutlined onClick={deleteCurrentType} />}
      />
    </Tooltip>
  );
};

const mapDispatchToProps = {
  deleteType,
};

export default connect(null, mapDispatchToProps)(DeleteTypeButton);
