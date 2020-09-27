import {FileSearchOutlined} from '@ant-design/icons';
import {notification} from 'antd';
import React from 'react';
import './preview-mode-notification.css';

const key = `open${Date.now()}`;

const openNotificationPreviewMode = close => {
  const btn = <span>Exit</span>;

  notification.open({
    message: 'Preview Mode',
    key,
    duration: 0,
    closeIcon: btn,
    top: 0,
    onClose: close,
    onClick: () => {
      close();
      notification.close(key);
    },
    placement: 'topLeft',
    className: 'preview-notification',
    icon: <FileSearchOutlined style={{color: '#ffffff'}} />,
  });
};

export default openNotificationPreviewMode;
