import {PlusOutlined} from '@ant-design/icons';
import {Button, Form} from 'antd';
import React from 'react';
import './dynamic-field.css';
import FieldTemplate from './FieldTemplate';

const DynamicField = () => {
  return (
    <Form.List name="materials">
      {(fields, {add, remove}) => {
        return (
          <div>
            {fields.map(field => (
              <FieldTemplate field={field} remove={remove} key={field.fieldKey} />
            ))}

            <Form.Item>
              <Button
                type="dashed"
                onClick={() => {
                  add();
                }}
                block
              >
                <PlusOutlined /> Add field
              </Button>
            </Form.Item>
          </div>
        );
      }}
    </Form.List>
  );
};

export default DynamicField;
