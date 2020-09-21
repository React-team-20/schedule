import React, {useState} from 'react';
import {Button, Input} from 'antd';
import {EnvironmentOutlined} from '@ant-design/icons';

import './InputGoogleMap.css';
import Modal from 'antd/lib/modal/Modal';

const GOOGLE_MAPS_API_KEY = '';

const InputGoogleMap = () => {
  const {visibleModal, setVisibleModal} = useState(false);

  // const handlerShowMap = () => {
  //   setVisibleModal(({visibleModal}) => !visibleModal);
  // };

  const AddonAfterButton = () => (
    <Button
      className="button-center-icon button-no-border"
      size="small"
      // onClick={handlerShowMap}
    >
      <EnvironmentOutlined />
    </Button>
  );

  const MapsModal = () => (
    <Modal
      title="Google maps"
      visible={visibleModal}
      // onOk={this.handleOk}
      // confirmLoading={confirmLoading}
      // onCancel={this.handleCancel}
    >
      <p>ModalText</p>
    </Modal>
  );

  return (
    <div>
      <Input placeholder="input address" addonAfter={<AddonAfterButton />} />
      <MapsModal />
    </div>
  );
};

export default InputGoogleMap;
