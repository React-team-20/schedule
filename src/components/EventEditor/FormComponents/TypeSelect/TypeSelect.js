import {PlusOutlined} from '@ant-design/icons';
import {Button, Divider, Form, Select} from 'antd';
import React from 'react';
import './type-select.css';
import {connect} from 'react-redux';
import {showTypeModalView} from '../../../../actions';

const {Option} = Select;

const TypeSelect = ({onSelectType, eventsTypes, showTypeModalView}) => {
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
        {eventsTypes.map(item => (
          <Option value={item.value} key={item.value}>
            {item.title}
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
