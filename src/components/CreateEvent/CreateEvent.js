import {Button, Col, DatePicker, Drawer, Form, Input, message, Row, Select} from 'antd';
import React, {useContext, useState} from 'react';
import {connect} from 'react-redux';
import {hideFormCreationEvent, hideLoader, setAlertMessage, showLoader} from '../../actions';
import eventsTypes from '../../constants/events-types';
import {ScheduleServiceContext} from '../ScheduleServiceContext';
import './create-event.css';

const emptyEvent = {
  id: '',
  topic: '1',
  description: '',
  descriptionUrl: '',
  type: '',
  timeZone: '',
  date: '',
  time: '',
  dateTime: 0,
  taskObj: {
    demoUrl: '',
    materials: '',
  },
  place: '',
  comment: '',
  organizer: '',
};

const {Option} = Select;

const CreateEvent = ({
  isShowFormСreationEvent,
  hideFormCreationEvent,
  showLoader,
  setAlertMessage,
  hideLoader,
  fetchEvents,
}) => {
  const {addEvent} = useContext(ScheduleServiceContext);
  const onClose = () => {
    hideFormCreationEvent();
  };

  const [form] = Form.useForm();
  const [hideSubFieldsFlag, setHideSubFieldsFlag] = useState(true);
  const [event, setEvent] = useState(emptyEvent);

  const onSelectType = e => {
    if (e === 'task' || e === 'optional-task') {
      setHideSubFieldsFlag(false);
    } else {
      setHideSubFieldsFlag(true);
    }
    setEvent({...event, type: e});
  };

  const onSubmit = () => {
    hideFormCreationEvent();
    showLoader();
    addEvent(event)
      .then(() => {
        setAlertMessage('Event added successfully!');
        fetchEvents();
        setEvent(emptyEvent);
        form.resetFields();
      })
      .catch(() => {
        hideLoader();
        message.error('Something went wrong');
      });
  };

  const onChangeTimeAndDate = e => {
    setEvent({
      ...event,
      dateTime: Date.parse(e._d.toString()),
    });
  };

  const onChangeInputs = e => {
    switch (e.target.name) {
      case 'topic':
        setEvent({...event, topic: e.target.value});
        break;
      case 'description-url':
        setEvent({...event, descriptionUrl: e.target.value});
        break;
      case 'organizer':
        setEvent({...event, organizer: e.target.value});
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
      default:
        return null;
    }
  };

  return (
    <>
      <Drawer
        title="Create a new event"
        width="50%"
        onClose={onClose}
        visible={isShowFormСreationEvent}
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
            <Button type="primary" form="create-form" htmlType="submit">
              Submit
            </Button>
          </div>
        }
      >
        <Form layout="vertical" hideRequiredMark id="create-form" onFinish={onSubmit} form={form}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="topic"
                label="Topic"
                onChange={onChangeInputs}
                value="asd"
                rules={[{required: true, message: 'Please enter event topic'}]}
              >
                <Input name="topic" placeholder="Please enter event topic" value={event.topic} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                onChange={onChangeInputs}
                name="description-url"
                label="Broadcast Url"
                rules={[{required: true, message: 'Please enter broadcast url'}]}
              >
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
              <Form.Item
                onChange={onChangeInputs}
                name="organizer"
                label="Organizer"
                rules={[{required: true, message: 'Please enter event organizer'}]}
              >
                <Input name="organizer" placeholder="Please enter event organizer" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="type"
                label="Type"
                rules={[{required: true, message: 'Please choose the type'}]}
              >
                <Select name="type" onSelect={onSelectType} placeholder="Please choose the type">
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
                name="demo-url"
                label="Demo Url"
                hidden={hideSubFieldsFlag}
                rules={[{required: false, message: 'Please enter broadcast url'}]}
              >
                <Input name="demo-url" style={{width: '100%'}} placeholder="Please enter url" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                onChange={onChangeInputs}
                name="description"
                label="Description"
                rules={[
                  {
                    required: true,
                    message: 'Please add Description',
                  },
                ]}
              >
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
                hidden={hideSubFieldsFlag}
                rules={[
                  {
                    required: false,
                    message: 'please add materials',
                  },
                ]}
              >
                <Input.TextArea name="materials" rows={2} placeholder="Please add materials" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                onChange={onChangeInputs}
                name="comment"
                label="Comment"
                rules={[
                  {
                    required: true,
                    message: 'Please add comment',
                  },
                ]}
              >
                <Input.TextArea name="comment" rows={2} placeholder="Please add comment" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Drawer>
    </>
  );
};

const mapStateToProps = state => {
  return {
    isShowFormСreationEvent: state.app.isShowFormСreationEvent,
  };
};

const mapDispatchToProps = {
  hideFormCreationEvent,
  showLoader,
  hideLoader,
  setAlertMessage,
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateEvent);
