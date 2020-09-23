import React, {useState} from 'react';
import {connect} from 'react-redux';
import {Modal, Input, Tag, message} from 'antd';
import {BlockPicker} from 'react-color';
import './new-type-modal.css';
import {addNewType, hideTypeModalView} from '../../actions';

const connector = connect(
  state => ({
    currentTypes: state.styles,
    view: state.app.isShowTypeModal,
  }),
  dispatch => ({
    addNewType: value => dispatch(addNewType(value)),
    hideWindow: value => dispatch(hideTypeModalView(value)),
  })
);
const NewTypeModal = ({currentTypes, addNewType, view, hideWindow}) => {
  const initialType = {
    title: 'title',
    value: 'title',
    background: '#d9e3f0',
    color: '#555555',
  };
  const [type, setType] = useState(initialType);
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

  function saveNewType() {
    if (!currentTypes.find(item => item.value === type.value)) {
      addNewType(type);
      localStorage.setItem('eventTypeStyles', JSON.stringify([...currentTypes, type]));
      message.success('Success');
      hideWindow(false);
    } else {
      message.error('This type already decleared');
    }
  }
  return (
    <Modal
      title="Add new type"
      visible={view}
      onOk={saveNewType}
      onCancel={() => {
        hideWindow(false);
      }}
    >
      <Tag style={{color: type.color, background: type.background}} className="tag-example">
        {type.title}
      </Tag>
      <Input placeholder="title" onChange={updateTitle} />
      <div className="color-type-container">
        <div className="background-color-type-container">
          <div
            className="background-color-type"
            onMouseEnter={() => setBackPicker(true)}
            onMouseLeave={() => setBackPicker(false)}
            style={{background: type.background}}
          >
            <span className="background-color-type-content" style={{color: type.color}}>
              Background
            </span>
            <div onMouseLeave={() => setBackPicker(false)}>
              <BlockPicker
                onChange={updateBackground}
                color={type.background}
                className={`background-color-type-picker ${backPicker ? '' : 'hidden'}`}
              />
            </div>
          </div>
        </div>
        <div className="text-color-type-container">
          <div
            className="text-color-type"
            onMouseEnter={() => setTextPicker(true)}
            onMouseLeave={() => setTextPicker(false)}
            style={{background: type.background}}
          >
            <span className="text-color-type-content" style={{color: type.color}}>
              Text
            </span>
            <div onMouseLeave={() => setTextPicker(false)}>
              <BlockPicker
                onChange={updateText}
                color={type.color}
                className={`text-color-type-picker ${textPicker ? '' : 'hidden'}`}
              />
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default connector(NewTypeModal);
