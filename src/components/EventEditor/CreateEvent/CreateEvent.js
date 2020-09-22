import {Button, Checkbox, Col, Drawer, Form, message, Row} from 'antd';
import moment from 'moment-timezone';
import React, {useContext, useState} from 'react';
import {connect} from 'react-redux';
import {
  hideFormCreationEvent,
  hideLoader,
  organizersLoaded,
  setAlertMessage,
  showLoader,
} from '../../../actions';
import INITIAL_EVENT_OBJECT from '../../../constants/event-object';
import {ScheduleServiceContext} from '../../ScheduleServiceContext';
import {DEFAULT_TIMEZONE} from '../../../constants/timezones';
import {
  CommentField,
  DateTimeComponent,
  DemoUrlField,
  DescriptionComponent,
  DescriptionUrlField,
  MaterialsDynamicField,
  OrganizerSelect,
  PlaceComponent,
  ScreenUrlField,
  TimeZoneSelect,
  TopicField,
  TypeSelect,
} from '../FormComponents';
import './create-event.css';

const CreateEvent = ({
  isShowFormСreationEvent,
  hideFormCreationEvent,
  showLoader,
  setAlertMessage,
  hideLoader,
  fetchEvents,
  organizers,
  organizersLoaded,
}) => {
  const {addEvent, getGithubData, addOrganizer, getOrganizers} = useContext(ScheduleServiceContext);
  const onClose = () => {
    hideFormCreationEvent();
  };

  const [form] = Form.useForm();
  const [hideSubFieldsForTaskFlag, setHideSubFieldsFlag] = useState(true);
  const [event, setEvent] = useState(INITIAL_EVENT_OBJECT);
  const [hideSubFieldsForOfflineFlag, setHideSubFieldsForOfflineFlag] = useState(true);
  const [deadline, setDeadline] = useState({flag: false, date: ''});

  const onSelectOrganizer = e => {
    setEvent({...event, organizer: organizers.find(organizer => organizer.name === e)});
  };

  const addNewOrganizer = async () => {
    const data = await getGithubData(event.organizerGitHub);

    if (data.name === undefined) {
      message.error('GitHub does not exist!');
      setEvent({...event, organizerGitHub: ''});
      return null;
    }

    if (
      organizers.find(
        organizer => organizer.name.toLowerCase() === event.organizerGitHub.toLowerCase().trim()
      ) === undefined
    ) {
      setEvent({...event, organizerGitHub: ''});
      await addOrganizer(data);
      const newOrganizers = await getOrganizers();
      organizersLoaded(newOrganizers);
      message.success('Organizer added successfully!');
    } else {
      message.error('Such an organizer exists!');
      setEvent({...event, organizerGitHub: ''});
    }
  };

  const onSelectType = e => {
    if (e === 'task' || e === 'optional-task') {
      setHideSubFieldsFlag(false);
    } else {
      setHideSubFieldsFlag(true);
      setDeadline({...deadline, flag: false});
    }

    if (e === 'offline-lecture' || e === 'meetup') {
      setHideSubFieldsForOfflineFlag(false);
    } else {
      setHideSubFieldsForOfflineFlag(true);
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
        setEvent(INITIAL_EVENT_OBJECT);
        form.resetFields();
      })
      .catch(() => {
        hideLoader();
        message.error('Something went wrong');
      });
    if (deadline.flag) {
      addEvent({...event, type: 'deadline', dateTime: deadline.date}).then(() => {
        fetchEvents();
        setEvent(INITIAL_EVENT_OBJECT);
        form.resetFields();
        setDeadline({...deadline, flag: false});
      });
    }
  };

  const onValuesFormChange = (changedValues, allValues) => {
    const field = Object.keys(changedValues)[0];
    const tzone = allValues.timezone ? allValues.timezone : event.timezone;
    const tzDate = (date, tz) => {
      return Date.parse(moment.tz(date.format('YYYY-MM-DD HH:mm:ss'), tz).format());
    };
    switch (field) {
      case 'topic':
        setEvent({...event, topic: allValues[field]});
        break;
      case 'place':
        setEvent({...event, place: allValues[field]});
        break;
      case 'description-url':
        setEvent({...event, descriptionUrl: allValues[field]});
        break;
      case 'organizer-github':
        setEvent({...event, organizerGitHub: allValues[field]});
        break;
      case 'demo-url':
        setEvent({
          ...event,
          taskObj: {
            ...event.taskObj,
            demoUrl: allValues[field],
          },
        });
        break;
      case 'screen':
        setEvent({
          ...event,
          taskObj: {
            ...event.taskObj,
            screen: allValues[field],
          },
        });
        break;
      case 'description':
        setEvent({...event, description: allValues[field]});
        break;
      case 'comment':
        setEvent({...event, comment: allValues[field]});
        break;
      case 'materials':
        setEvent({
          ...event,
          taskObj: {
            ...event.taskObj,
            materials: allValues[field],
          },
        });
        break;
      case 'timezone':
        setEvent({...event, timezone: allValues[field]});
        if (allValues.date) {
          setEvent({
            ...event,
            dateTime: tzDate(allValues.date, allValues[field]),
          });
        }
        if (allValues.dateDeadline) {
          setDeadline({
            ...deadline,
            date: tzDate(allValues.dateDeadline, allValues[field]),
          });
        }
        break;
      case 'date':
        setEvent({
          ...event,
          dateTime: tzDate(allValues[field], tzone),
        });
        break;
      case 'dateDeadline':
        setDeadline({
          ...deadline,
          date: tzDate(allValues[field], tzone),
        });
        break;
      default:
        return null;
    }
  };

  return (
    <Drawer
      title="Create a new event"
      width={window.innerWidth > 1000 ? '50%' : '100%'}
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
      <Form
        layout="vertical"
        hideRequiredMark
        id="create-form"
        onFinish={onSubmit}
        form={form}
        onValuesChange={onValuesFormChange}
      >
        <Row gutter={16}>
          <Col span={12}>
            <TopicField />
          </Col>
          <Col span={12}>
            <DescriptionUrlField />
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <OrganizerSelect
              addNewOrganizer={addNewOrganizer}
              event={event}
              onSelectOrganizer={onSelectOrganizer}
            />
          </Col>
          <Col span={12}>
            <TypeSelect onSelectType={onSelectType} />
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <DateTimeComponent />
          </Col>
          <Col span={12}>
            <TimeZoneSelect tz={DEFAULT_TIMEZONE} />
          </Col>
        </Row>
        {deadline.flag && (
          <Row gutter={16}>
            <Col span={12}>
              <DateTimeComponent deadline />
            </Col>
          </Row>
        )}
        {!hideSubFieldsForTaskFlag && (
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item name="checkbox-deadline">
                <Checkbox
                  onChange={e => setDeadline({...deadline, flag: e.target.checked})}
                  checked={deadline.flag}
                >
                  Add deadline
                </Checkbox>
              </Form.Item>
            </Col>
          </Row>
        )}
        {!hideSubFieldsForOfflineFlag && (
          <Row gutter={16}>
            <Col span={24}>
              <PlaceComponent />
            </Col>
          </Row>
        )}
        {!hideSubFieldsForTaskFlag && (
          <Row gutter={16}>
            <Col span={12}>
              <DemoUrlField />
            </Col>
            <Col span={12}>
              <ScreenUrlField />
            </Col>
          </Row>
        )}
        <Row gutter={16}>
          <Col span={24}>
            <DescriptionComponent />
          </Col>
        </Row>
        {!hideSubFieldsForTaskFlag && (
          <Row gutter={16}>
            <Col span={24}>
              <MaterialsDynamicField />
            </Col>
          </Row>
        )}
        <Row gutter={16}>
          <Col span={24}>
            <CommentField />
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
  );
};

const mapStateToProps = state => {
  return {
    isShowFormСreationEvent: state.app.isShowFormСreationEvent,
    organizers: state.app.organizers,
  };
};

const mapDispatchToProps = {
  hideFormCreationEvent,
  showLoader,
  hideLoader,
  setAlertMessage,
  organizersLoaded,
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateEvent);