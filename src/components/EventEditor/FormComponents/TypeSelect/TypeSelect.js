import {PlusOutlined} from '@ant-design/icons';
import {Button, Divider, Form, Select} from 'antd';
import React, {useState} from 'react';
import './type-select.css';
import {connect} from 'react-redux';
import {showTypeModalView} from '../../../../actions';
import requiredEventTypes from '../../../../constants/events-types';
import DeleteTypeButton from '../DeleteTypeButton';

const {Option} = Select;

const TypeSelect = ({onSelectType, eventsTypes, showTypeModalView}) => {
  const [selectedType, setSelectedType] = useState('');

  return (
    <Form.Item
      name="type"
      label="Type"
      rules={[{required: true, message: 'Please choose the type'}]}
    >
      <Select
        name="type"
        onChange={val => {
          setSelectedType(val);
        }}
        allowClear
        onSelect={onSelectType}
        placeholder="Please choose the type"
        dropdownRender={menu => (
          <div>
            {menu}
            <Divider style={{margin: '4px 0'}} />
            <div style={{display: 'flex', flexWrap: 'nowrap', padding: 8}}>
              <Button
                style={{
                  border: 0,
                }}
                onClick={() => showTypeModalView()}
                icon={<PlusOutlined />}
                type="link"
              >
                Create a new type
              </Button>
            </div>
          </div>
        )}
      >
        {eventsTypes.map(type => (
          <Option value={type.value} key={type.value}>
            <div className="option-wrapper">
              {type.title}
              {type.value !== selectedType &&
                !requiredEventTypes.find(item => item.value === type.value) && (
                  <DeleteTypeButton id={type.value} />
                )}
            </div>
          </Option>
        ))}
      </Select>
    </Form.Item>
  );
};

const mapStateToProps = state => {
  return {
    eventsTypes: state.styles,
  };
};

const mapDispatchToProps = {
  showTypeModalView,
};

export default connect(mapStateToProps, mapDispatchToProps)(TypeSelect);
