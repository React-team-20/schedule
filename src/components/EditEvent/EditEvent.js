import {
  Button,
  Col,
  DatePicker,
  Drawer,
  Form,
  Input,
  message,
  Row,
  Select,
  Divider,
  Checkbox,
} from 'antd';
import React, {useContext, useState, useEffect} from 'react';
import moment from 'moment-timezone';
import {connect} from 'react-redux';
import {
  hideFormEditEvent,
  hideLoader,
  setAlertMessage,
  showLoader,
  organizersLoaded,
} from '../../actions';
import eventsTypes from '../../constants/events-types';
import {ScheduleServiceContext} from '../ScheduleServiceContext';
import './edit-event.css';
import {PlusOutlined} from '@ant-design/icons';
import DeleteOrganizerButton from '../CreateEvent/DeleteOrganizerButton';

const {Option} = Select;

const EditEvent = ({
  isShowFormEditEvent,
  hideFormEditEvent,
  currentEventId,
  setAlertMessage,
  fetchEvents,
  showLoader,
  hideLoader,
  events,
  tz,
  organizers,
  organizersLoaded,
}) => {
  const [form] = Form.useForm();
  const [event, setEvent] = useState({organizer: '', feedback: false});
  const {editEvent, getGithubData, addOrganizer, getOrganizers} = useContext(
    ScheduleServiceContext
  );
  const [hideSubFieldsForTaskFlag, setHideSubFieldsForTaskFlag] = useState(true);
  const [hideSubFieldsForOfflineFlag, setHideSubFieldsForOfflineFlag] = useState(true);

  useEffect(() => {
    if (currentEventId !== null) {
      setEvent(events.find(event => event.id === currentEventId));
    }
  }, [isShowFormEditEvent]);

  const onClose = () => {
    hideFormEditEvent();
  };

  const initialFormValue = () => {
    if (event.type === 'task' || event.type === 'optional-task') {
      setHideSubFieldsForTaskFlag(false);
    } else {
      setHideSubFieldsForTaskFlag(true);
    }

    if (event.type === 'offline-lecture' || event.type === 'meetup') {
      setHideSubFieldsForOfflineFlag(false);
    } else {
      setHideSubFieldsForOfflineFlag(true);
    }

    form.setFieldsValue({
      topic: event.topic,
      'description-url': event.descriptionUrl,
      organizer: event.organizer.name,
      type: event.type,
      date: moment(event.dateTime).tz(tz),
      'demo-url': event.taskObj.demoUrl,
      description: event.description,
      materials: event.taskObj.materials,
      comment: event.comment,
      place: event.place,
      screen: event.taskObj.screen,
    });
  };

  const onSubmit = () => {
    hideFormEditEvent();
    showLoader();
    editEvent(event.id, event)
      .then(() => {
        setAlertMessage('Event edited successfully!');
        fetchEvents();
        form.resetFields();
      })
      .catch(() => {
        hideLoader();
        message.error('Something went wrong');
      });
  };

  const addNewOrganizer = async () => {
    const data = await getGithubData(event.organizerGitHub);

    if (data.name === undefined) {
      message.error('GitHub does not exist!');
      setEvent({...event, organizerGitHub: ''});
      return;
    }

    if (
      organizers.find(
        organizer => organizer.name.toLowerCase() === event.organizerGitHub.toLowerCase().trim()
      ) === undefined
    ) {
      setEvent({...event, organizerGitHub: ''});
      await addOrganizer(data);
      const newOrganizers = await getOrganizers();
      setAlertMessage('Event edited successfully!');
      organizersLoaded(newOrganizers);
    } else {
      message.error('Such an organizer exists!');
      setEvent({...event, organizerGitHub: ''});
    }
  };

  const onSelectType = e => {
    if (e === 'task' || e === 'optional-task') {
      setHideSubFieldsForTaskFlag(false);
    } else {
      setHideSubFieldsForTaskFlag(true);
    }
    setEvent({...event, type: e});
  };

  const onSelectOrganizer = e => {
    setEvent({...event, organizer: organizers.find(organizer => organizer.name === e)});
  };

  const onChangeInputs = e => {
    switch (e.target.name) {
      case 'topic':
        setEvent({...event, topic: e.target.value});
        break;
      case 'description-url':
        setEvent({...event, descriptionUrl: e.target.value});
        break;
      case 'organizer-github':
        setEvent({...event, organizerGitHub: e.target.value});
        break;
      case 'demo-url':
        setEvent({
          ...event,
          taskObj: {
            ...event.taskObj,
            demoUrl: e.target.value,
          },
        });
        break;
      case 'screen':
        setEvent({
          ...event,
          taskObj: {
            ...event.taskObj,
            screen: e.target.value,
          },
        });
        break;
      case 'description':
        setEvent({...event, description: e.target.value});
        break;
      case 'materials':
        setEvent({
          ...event,
          taskObj: {
            ...event.taskObj,
            materials: e.target.value,
          },
        });
        break;
      case 'comment':
        setEvent({...event, comment: e.target.value});
        break;
      case 'place':
        setEvent({...event, place: e.target.value});
        break;
      default:
        return null;
    }
  };

  const onChangeTimeAndDate = e => {
    setEvent({
      ...event,
      dateTime: Date.parse(e._d.toString()),
    });
  };

  return (
    <>
      <Drawer
        title="Edit event"
        width="50%"
        onClose={onClose}
        afterVisibleChange={initialFormValue}
        visible={isShowFormEditEvent}
        bodyStyle={{paddingBottom: 80}}
        footer={
          <div
            style={{
              textAlign: 'right',
            }}
          >
            <Button onClick={onClose} style={{marginRight: 8}}>
              Cancel
            </Button>
            <Button type="primary" form="edit-form" htmlType="submit">
              Submit
            </Button>
          </div>
        }
      >
        <Form layout="vertical" hideRequiredMark id="edit-form" onFinish={onSubmit} form={form}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="topic"
                label="Topic"
                onChange={onChangeInputs}
                rules={[{required: true, message: 'Please enter event topic'}]}
              >
                <Input name="topic" placeholder="Please enter event topic" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item onChange={onChangeInputs} name="description-url" label="Link">
                <Input
                  name="description-url"
                  style={{width: '100%'}}
                  placeholder="Please enter url"
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item onChange={onChangeInputs} name="organizer" label="Organizer">
                <Select
                  onSelect={onSelectOrganizer}
                  placeholder={'Please enter event organizer'}
                  dropdownRender={menu => (
                    <div>
                      {menu}
                      <Divider style={{margin: '4px 0'}} />
                      <div style={{display: 'flex', flexWrap: 'nowrap', padding: 8}}>
                        <Input
                          style={{flex: 'auto'}}
                          name="organizer-github"
                          onChange={onChangeInputs}
                          value={event.organizerGitHub}
                        />
                        <a
                          style={{
                            flex: 'none',
                            padding: '8px',
                            display: 'block',
                            cursor: 'pointer',
                          }}
                          onClick={addNewOrganizer}
                        >
                          <PlusOutlined /> Add github
                        </a>
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
            </Col>
            <Col span={12}>
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
                        <a
                          style={{
                            flex: 'none',
                            padding: '8px',
                            display: 'block',
                            cursor: 'pointer',
                          }}
                          /* onClick={addNewType} */
                        >
                          <PlusOutlined /> Create a new type
                        </a>
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
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="date"
                label="Date and time"
                rules={[{required: true, message: 'Please choose the Date and Time'}]}
              >
                <DatePicker
                  name="date"
                  style={{width: '100%'}}
                  showTime={{format: 'HH:mm'}}
                  format="YYYY-MM-DD HH:mm"
                  onChange={onChangeTimeAndDate}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                onChange={onChangeInputs}
                name="place"
                label="Place"
                hidden={hideSubFieldsForOfflineFlag}
              >
                <Input
                  name="description-url"
                  style={{width: '100%'}}
                  placeholder="Please enter place"
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                onChange={onChangeInputs}
                name="demo-url"
                label="Demo Url"
                hidden={hideSubFieldsForTaskFlag}
              >
                <Input name="demo-url" style={{width: '100%'}} placeholder="Please enter url" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                onChange={onChangeInputs}
                name="screen"
                label="Screen"
                hidden={hideSubFieldsForTaskFlag}
              >
                <Input
                  name="screen"
                  style={{width: '100%'}}
                  placeholder="Please enter screen url"
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item onChange={onChangeInputs} name="description" label="Description">
                <Input.TextArea name="description" rows={2} placeholder="Please add description" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                onChange={onChangeInputs}
                name="materials"
                label="Materials"
                hidden={hideSubFieldsForTaskFlag}
              >
                <Input.TextArea name="materials" rows={2} placeholder="Please add materials" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item onChange={onChangeInputs} name="comment" label="Comment">
                <Input.TextArea name="comment" rows={2} placeholder="Please add comment" />
              </Form.Item>
            </Col>
          </Row>
          <Checkbox
            onChange={e => setEvent({...event, feedback: e.target.checked})}
            checked={event.feedback}
          >
            Allow feedback
          </Checkbox>
        </Form>
      </Drawer>
    </>
  );
};

const mapStateToProps = state => {
  return {
    event: state.events,
    isShowFormEditEvent: state.app.isShowFormEditEvent,
    currentEventId: state.app.currentEvent,
    events: state.events.events,
    tz: state.app.timezone,
    organizers: state.app.organizers,
  };
};

const mapDispatchToProps = {
  hideFormEditEvent,
  showLoader,
  hideLoader,
  setAlertMessage,
  organizersLoaded,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditEvent);
