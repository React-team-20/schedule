import {Button, Checkbox, Col, Drawer, Form, message, Row} from 'antd';
import moment from 'moment-timezone';
import React, {useContext, useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {
  hideFormEditEvent,
  hideLoader,
  organizersLoaded,
  setAlertMessage,
  showLoader,
} from '../../../actions';
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
import './edit-event.css';

const EditEvent = ({
  isShowFormEditEvent,
  hideFormEditEvent,
  currentEventId,
  setAlertMessage,
  fetchEvents,
  showLoader,
  hideLoader,
  events,
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

  const [width, setWidth] = useState();

  useEffect(() => {
    if (window.innerWidth < 1000) setWidth('100%');
    else setWidth('50%');
  }, []);

  window.addEventListener('resize', () => {
    if (window.innerWidth < 1000) setWidth('100%');
    else setWidth('50%');
  });

  useEffect(() => {
    if (currentEventId !== null) {
      setEvent(events.find(i => i.id === currentEventId));
    }
    // eslint-disable-next-line
  }, [isShowFormEditEvent]);

  const onClose = () => {
    hideFormEditEvent();
  };

  const setPlace = (placeObj) => {
    setEvent({...event, place: placeObj});
  }

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

  const onSubmit = async () => {
    hideFormEditEvent();
    showLoader();
    try {
      await editEvent(event.id, event);
      setAlertMessage('Event edit successfully!');
      fetchEvents();
      form.resetFields();
    } catch {
      hideLoader();
      message.error('Something went wrong');
    }
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
      organizersLoaded(newOrganizers);
      message.success('Event edited successfully!');
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

  const onValuesFormChange = (changedValues, allValues) => {
    const field = Object.keys(changedValues)[0];
    const tzone = allValues.timezone ? allValues.timezone : event.timezone;
    const tzDate = (date, timeZone) => {
      return Date.parse(moment.timeZone(date.format('YYYY-MM-DD HH:mm:ss'), timeZone).format());
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
      default:
        return null;
    }
  };

  return (
    <>
      <Drawer style={{zIndex: '1'}}
        title="Edit event"
        width={width}
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
        <Form
          layout="vertical"
          hideRequiredMark
          id="edit-form"
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
              <OrganizerSelect
                addNewOrganizer={addNewOrganizer}
                event={event}
                onSelectOrganizer={onSelectOrganizer}
              />
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
              <TimeZoneSelect tz={event.timezone} />
            </Col>
          </Row>
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
    </>
  );
};

const mapStateToProps = state => {
  return {
    event: state.events,
    isShowFormEditEvent: state.app.isShowFormEditEvent,
    currentEventId: state.app.currentEvent,
    events: state.events.events,
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
