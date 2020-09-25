import React from 'react';
import {Button, notification} from 'antd';
import {FileSearchOutlined} from '@ant-design/icons';

const close = () => {
  // todo action
  console.log('Notification was closed.');
};
const key = `open${Date.now()}`;

const openNotificationPreviewMode = () => {
  const btn = (
    <Button
      type="primary"
      size="small"
      onClick={() => {
        notification.close(key);
        close();
      }}
    >
      Exit mode
    </Button>
  );

  notification.open({
    message: 'Preview Mode',
    key,
    duration: 0,
    btn,
    onClose: {close},
    placement: 'bottomLeft',
    style: {backgroundColor: '#e6f7ff'},
    icon: <FileSearchOutlined style={{color: '#1d39c4'}} />,
  });
};

export default openNotificationPreviewMode;
