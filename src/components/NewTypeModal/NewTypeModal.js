import React, {useState} from 'react';
import {connect} from 'react-redux';
import {Modal, Input, Tag} from 'antd';
import {BlockPicker} from 'react-color';
import './new-type-modal.css';

const connector = connect();
const NewTypeModal = () => {
  const [type, setType] = useState({
    title: 'title',
    value: 'title',
    background: 'green',
    color: 'black',
  });
  const [backPicker, setBackPicker] = useState(false);
  const [textPicker, setTextPicker] = useState(false);
  function updateTitle(x) {
    const current = x.target.value;
    setType(prev => {
      return {
        ...prev,
        title: current,
        value: current.trim().toLowerCase(),
      };
    });
  }
  function updateBackground(x) {
    const current = x.hex;
    setType(prev => {
      return {
        ...prev,
        background: current,
      };
    });
  }
  function updateText(x) {
    const current = x.hex;
    setType(prev => {
      return {
        ...prev,
        color: current,
      };
    });
  }

  function visibleBackPicker(event) {
    setBackPicker(prev => !prev);
  }
  function visibleTextPicker(event) {
    setTextPicker(prev => !prev);
  }
  return (
    <Modal
      title="Add new type"
      visible={true}
      /* onOk={this.handleOk}
      onCancel={this.handleCancel} */
    >
      <Tag style={{color: type.color, background: type.background}} className="tag-example">
        {type.title}
      </Tag>
      <Input placeholder="title" onChange={updateTitle} />
      <div className="color-type-container">
        <div className="background-color-type-container">
          <div
            className="background-color-type"
            onMouseEnter={visibleBackPicker}
            style={{background: type.background}}
          >
            <div onMouseLeave={visibleBackPicker}>
              <BlockPicker
                onChange={updateBackground}
                color={type.background}
                className={`background-color-type-picker ${backPicker ? '' : 'hidden'}`}
              />
            </div>
          </div>
          <span>Background</span>
        </div>
        <div className="text-color-type-container">
          <div
            className="text-color-type"
            onMouseEnter={visibleTextPicker}
            style={{background: type.color}}
          >
            <div onMouseLeave={visibleTextPicker}>
              <BlockPicker
                onChange={updateText}
                color={type.color}
                className={`text-color-type-picker ${textPicker ? '' : 'hidden'}`}
              />
            </div>
          </div>
          <span>Text color</span>
        </div>
      </div>
    </Modal>
  );
};

export default connector(NewTypeModal);
