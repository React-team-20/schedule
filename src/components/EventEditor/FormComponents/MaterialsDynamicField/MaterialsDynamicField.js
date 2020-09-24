import {PlusOutlined} from '@ant-design/icons';
import {Button, Form} from 'antd';
import React from 'react';
import FieldTemplate from './FieldTemplate';
import './materials-dynamic-field.css';

const MaterialsDynamicField = () => {
  return (
    <>
      <div className="ant-col ant-form-item-label">
        <span>Materials</span>
      </div>
      <Form.List name="materials">
        {(fields, {add, remove}) => {
          return (
            <>
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
            </>
          );
        }}
      </Form.List>
    </>
  );
};

export default MaterialsDynamicField;
