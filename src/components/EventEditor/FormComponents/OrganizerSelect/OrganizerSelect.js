import {PlusOutlined} from '@ant-design/icons';
import {Button, Divider, Form, Input, message, Select} from 'antd';
import React, {useContext, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {hideLoader, organizersLoaded, showLoader} from '../../../../actions';
import {ScheduleServiceContext} from '../../../ScheduleServiceContext';
import DeleteOrganizerButton from '../DeleteOrganizerButton';
import './organizer-select.css';

const {Option} = Select;

const OrganizerSelect = ({form}) => {
  const dispatch = useDispatch();
  const {organizers} = useSelector(state => state.app);
  const {getGithubData, addOrganizer, getOrganizers} = useContext(ScheduleServiceContext);
  const [organizerGitHub, setOrganizerGitHub] = useState('');
  const [selectedOrg, setSelectedOrg] = useState('');

  const addNewOrganizer = async () => {
    if (organizerGitHub === '') return null;
    const data = await getGithubData(organizerGitHub);

    if (data.name === undefined) {
      message.error('GitHub does not exist!');
      setOrganizerGitHub('');
      return null;
    }
    if (!organizers.find(org => org.name.toLowerCase() === organizerGitHub)) {
      dispatch(showLoader());
      await addOrganizer(data);
      const newOrganizers = await getOrganizers();
      dispatch(organizersLoaded(newOrganizers));
      dispatch(hideLoader());
      form.setFieldsValue({'organizer-github': ''});
      message.success('Organizer added successfully!');
    } else {
      message.error('Such an organizer exists!');
    }
    setOrganizerGitHub('');
  };

  return (
    <Form.Item name="organizer" label="Organizer">
      <Select
        placeholder="Please enter event organizer"
        allowClear
        onChange={val => {
          setSelectedOrg(val);
        }}
        dropdownRender={menu => (
          <div>
            {menu}
            <Divider style={{margin: '4px 0'}} />
            <div style={{display: 'flex', flexWrap: 'nowrap', padding: 8}}>
              <Form.Item name="organizer-github">
                <Input
                  style={{flex: 'auto'}}
                  onChange={e => setOrganizerGitHub(e.target.value.toLowerCase().trim())}
                />
              </Form.Item>
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
        {organizers.map(org => (
          <Option value={org.name} key={org.id}>
            <div className="option-wrapper">
              {org.name}
              {org.name !== selectedOrg && <DeleteOrganizerButton id={org.id} />}
            </div>
          </Option>
        ))}
      </Select>
    </Form.Item>
  );
};

export default OrganizerSelect;
