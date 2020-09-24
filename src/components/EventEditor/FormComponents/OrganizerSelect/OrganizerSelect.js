import {PlusOutlined} from '@ant-design/icons';
import {Button, Divider, Form, Input, Select} from 'antd';
import React from 'react';
import {useSelector} from 'react-redux';
import DeleteOrganizerButton from '../DeleteOrganizerButton';
import './organizer-select.css';

const {Option} = Select;

const OrganizerSelect = ({event, onSelectOrganizer, addNewOrganizer}) => {
  const {organizers} = useSelector(state => state.app);

  return (
    <Form.Item name="organizer" label="Organizer">
      <Select
        onSelect={onSelectOrganizer}
        placeholder="Please enter event organizer"
        allowClear
        dropdownRender={menu => (
          <div>
            {menu}
            <Divider style={{margin: '4px 0'}} />
            <div style={{display: 'flex', flexWrap: 'nowrap', padding: 8}}>
              <Input style={{flex: 'auto'}} name="organizer-github" value={event.organizerGitHub} />
              <Button
                style={{
                  flex: 'none',
                  padding: '8px',
                  display: 'block',
                  cursor: 'pointer',
                }}
                onClick={addNewOrganizer}
                icon={<PlusOutlined />}
                type="link"
              >
                Add github
              </Button>
            </div>
          </div>
        )}
      >
        {organizers.map(organizer => (
          <Option value={organizer.name} key={organizer.id}>
            <div className="option-wrapper">
              {organizer.name}
              {organizer.name !== event.organizer.name && (
                <DeleteOrganizerButton id={organizer.id} />
              )}
            </div>
          </Option>
        ))}
      </Select>
    </Form.Item>
  );
};

export default OrganizerSelect;
