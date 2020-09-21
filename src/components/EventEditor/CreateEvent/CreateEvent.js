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

  const onValuesChangeMaterials = materials => {
    setEvent({
      ...event,
      taskObj: {
        ...event.taskObj,
        materials: materials,
      },
    });
  };

  const onChangeTimeAndDate = e => {
    const tzDate = moment.tz(e.format('YYYY-MM-DD HH:mm:ss'), event.timeZone);
    setEvent({
      ...event,
      dateTime: Date.parse(tzDate.format()),
    });
  };

  const onChangeTimeAndDateDeadline = e => {
    setDeadline({
      ...deadline,
      date: Date.parse(e._d.toString()),
    });
  };

  const onChangeTimezone = value => {
    setEvent({...event, timeZone: value});
  };

  const onChangeInputs = e => {
    switch (e.target.name) {
      case 'topic':
        setEvent({...event, topic: e.target.value});
        break;
      case 'place':
        setEvent({...event, place: e.target.value});
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
      case 'comment':
        setEvent({...event, comment: e.target.value});
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
        onValuesChange={(changedValues, allValues) => {
          if (changedValues.materials) onValuesChangeMaterials(allValues.materials);
        }}
      >
        <Row gutter={16}>
          <Col span={12}>
            <TopicField onChangeInputs={onChangeInputs} />
          </Col>
          <Col span={12}>
            <DescriptionUrlField onChangeInputs={onChangeInputs} />
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <OrganizerSelect
              addNewOrganizer={addNewOrganizer}
              event={event}
              onSelectOrganizer={onSelectOrganizer}
              onChangeInputs={onChangeInputs}
            />
          </Col>
          <Col span={12}>
            <TypeSelect onSelectType={onSelectType} />
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <DateTimeComponent onChangeTimeAndDate={onChangeTimeAndDate} />
          </Col>
          <Col span={12}>
            <TimeZoneSelect onChangeTimezone={onChangeTimezone} />
          </Col>
        </Row>
        {deadline.flag && (
          <Row gutter={16}>
            <Col span={12}>
              <DateTimeComponent onChangeTimeAndDate={onChangeTimeAndDateDeadline} deadline />
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
