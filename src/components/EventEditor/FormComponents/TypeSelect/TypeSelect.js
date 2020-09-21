import {PlusOutlined} from '@ant-design/icons';
import {Button, Divider, Form, Select} from 'antd';
import React from 'react';
import eventsTypes from '../../../../constants/events-types';
import './type-select.css';

const {Option} = Select;

const TypeSelect = ({onSelectType}) => {
  return (
    <Form.Item
      name="type"
      label="Type"
      rules={[{required: true, message: 'Please choose the type'}]}
    >
      <Select
        name="type"
        onSelect={onSelectType}
        placeholder="Please choose the type"
        allowClear
        dropdownRender={menu => (
          <div>
            {menu}
            <Divider style={{margin: '4px 0'}} />
            <div style={{display: 'flex', flexWrap: 'nowrap', padding: 8}}>
              <Button
                style={{
                  border: 0,
                }}
                /* onClick={addNewType} */
                icon={<PlusOutlined />}
                type="link"
              >
                Create a new type
              </Button>
            </div>
          </div>
        )}
      >
        {eventsTypes.map(item => (
          <Option value={item.value} key={item.value}>
            {item.title}
          </Option>
        ))}
      </Select>
    </Form.Item>
  );
};

export default TypeSelect;
