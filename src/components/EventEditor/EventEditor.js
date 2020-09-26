import {Button, Checkbox, Col, Drawer, Form, message, Row} from 'antd';
import moment from 'moment-timezone';
import React, {useContext, useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {
  hideFormCreationEvent,
  hideFormEditEvent,
  hideLoader,
  setAlertMessage,
  showLoader,
} from '../../actions';
import INITIAL_EVENT_OBJECT from '../../constants/event-object';
import {ScheduleServiceContext} from '../ScheduleServiceContext';
import './event-editor.css';
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
  PreviewButton,
} from './FormComponents';

const CreateEvent = ({
  isShowFormСreationEvent,
  hideFormCreationEvent,
  showLoader,
  setAlertMessage,
  hideLoader,
  fetchEvents,
  organizers,
  isShowFormEditEvent,
  hideFormEditEvent,
  currentEventId,
  events,
}) => {
  const {addEvent, editEvent} = useContext(ScheduleServiceContext);
  const initialObject = isShowFormEditEvent
    ? {organizer: '', feedback: false}
    : INITIAL_EVENT_OBJECT;
  const [form] = Form.useForm();
  const [hideSubFieldsForTaskFlag, setHideSubFieldsForTaskFlag] = useState(true);
  const [event, setEvent] = useState(initialObject);
  const [hideSubFieldsForOfflineFlag, setHideSubFieldsForOfflineFlag] = useState(true);
  const [deadline, setDeadline] = useState({flag: false, date: ''});
  const [width, setWidth] = useState();

  const onClose = () => {
    hideFormCreationEvent();
    hideFormEditEvent();
    form.resetFields();
    setEvent(INITIAL_EVENT_OBJECT);
  };

  useEffect(() => {
    if (currentEventId !== null) {
      setEvent(events.find(i => i.id === currentEventId));
    }
    // eslint-disable-next-line
  }, [isShowFormEditEvent]);

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
      date: moment(event.dateTime).tz(event.timezone),
      'demo-url': event.taskObj.demoUrl,
      description: event.description,
      materials: event.taskObj.materials,
      comment: event.comment,
      place: event.place.address,
      screen: event.taskObj.screen,
      timezone: event.timezone,
    });
  };

  useEffect(() => {
    if (window.innerWidth < 1000) setWidth('100%');
    else setWidth('50%');
  }, []);

  window.addEventListener('resize', () => {
    if (window.innerWidth < 1000) setWidth('100%');
    else setWidth('50%');
  });

  const setPlace = placeObj => {
    form.setFieldsValue({place: placeObj.address});
    setEvent({...event, place: placeObj});
  };

  const onSelectType = e => {
    if (e === 'task' || e === 'optional-task') {
      setHideSubFieldsForTaskFlag(false);
    } else {
      setHideSubFieldsForTaskFlag(true);
      if (!isShowFormEditEvent) setDeadline({...deadline, flag: false});
    }

    if (!isShowFormEditEvent) {
      if (e === 'offline-lecture' || e === 'meetup') {
        setHideSubFieldsForOfflineFlag(false);
      } else {
        setHideSubFieldsForOfflineFlag(true);
      }
    }

    setEvent({...event, type: e});
  };

  const onSubmit = async () => {
    onClose();
    showLoader();
    try {
      if (isShowFormEditEvent) {
        await editEvent(event.id, event);
        setAlertMessage('Event edit successfully!');
      } else {
        await addEvent(event);
        setAlertMessage('Event added successfully!');
      }
      fetchEvents();
      if (deadline.flag && !isShowFormEditEvent) {
        await addEvent({...event, type: 'deadline', dateTime: deadline.date});
        setAlertMessage('Deadline added successfully!');
        fetchEvents();
        setDeadline({...deadline, flag: false});
      }
      if (!isShowFormEditEvent) setEvent(INITIAL_EVENT_OBJECT);
      form.resetFields();
    } catch {
      hideLoader();
      message.error('Something went wrong');
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
        setEvent({
          ...event,
          place: {
            ...event.place,
            address: allValues[field],
          },
        });
        break;
      case 'description-url':
        setEvent({...event, descriptionUrl: allValues[field]});
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
            timezone: allValues[field],
          });
        }
        if (allValues.dateDeadline && !isShowFormEditEvent) {
          setDeadline({
            ...deadline,
            date: tzDate(allValues.dateDeadline, allValues[field]),
            timezone: allValues[field],
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
      case 'organizer':
        setEvent({...event, organizer: organizers.find(org => org.name === allValues[field])});
        break;
      default:
        return null;
    }
  };

  return (
    <Drawer
      style={{zIndex: '1001'}}
      title="Event editor"
      width={width}
      onClose={onClose}
      visible={isShowFormСreationEvent || isShowFormEditEvent}
      afterVisibleChange={isShowFormEditEvent ? initialFormValue : undefined}
      bodyStyle={{paddingBottom: 80}}
      footer={
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
          <div>
            <PreviewButton
              onClose={onClose}
              currentEvent={event}
              deadline={deadline}
            ></PreviewButton>
          </div>
          <div>
            <Button onClick={onClose} style={{marginRight: 8}}>
              Cancel
            </Button>
            <Button type="primary" form="editor" htmlType="submit">
              Submit
            </Button>
          </div>
        </div>
      }
    >
      <Form
        layout="vertical"
        hideRequiredMark
        id="editor"
        onFinish={onSubmit}
        form={form}
        onValuesChange={onValuesFormChange}
      >
        <Row gutter={16}>
          <Col span={24} sm={12}>
            <TopicField />
          </Col>
          <Col span={24} sm={12}>
            <DescriptionUrlField />
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24} sm={12}>
            <OrganizerSelect />
          </Col>
          <Col span={24} sm={12}>
            <TypeSelect onSelectType={onSelectType} />
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24} sm={12}>
            <DateTimeComponent />
          </Col>
          <Col span={24} sm={12}>
            <TimeZoneSelect />
          </Col>
        </Row>
        {deadline.flag && !isShowFormEditEvent && (
          <Row gutter={16}>
            <Col span={24}>
              <DateTimeComponent deadline />
            </Col>
          </Row>
        )}
        {!hideSubFieldsForTaskFlag && !isShowFormEditEvent && (
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
              <PlaceComponent setPlace={setPlace} />
            </Col>
          </Row>
        )}
        {!hideSubFieldsForTaskFlag && (
          <Row gutter={16}>
            <Col span={24} sm={12}>
              <DemoUrlField />
            </Col>
            <Col span={24} sm={12}>
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
    event: state.events,
    isShowFormEditEvent: state.app.isShowFormEditEvent,
    currentEventId: state.app.currentEvent,
    events: state.events.events,
  };
};

const mapDispatchToProps = {
  hideFormCreationEvent,
  showLoader,
  hideLoader,
  setAlertMessage,
  hideFormEditEvent,
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateEvent);
