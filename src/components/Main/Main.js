import {message} from 'antd';
import React, {useContext, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  hideAlert,
  hideLoader,
  organizersLoaded,
  scheduleLoaded,
  setAlertMessage,
  showAlert,
  showLoader,
  hidePreview,
  showFormCreationEvent,
  showFormEditEvent,
} from '../../actions';
import {getFilteredTypesAndHideEvents, getFilteredTypesEvents} from '../../selectors';
import EventEditor from '../EventEditor';
import EventTypeFilter from '../EventTypeFilter';
import ScheduleList from '../ScheduleList';
import {ScheduleServiceContext} from '../ScheduleServiceContext';
import ScheduleTable from '../ScheduleTable';
import ScheduleСalendar from '../ScheduleСalendar';
import TaskOverview from '../TaskOverview';
import NewTypeModal from '../NewTypeModal';
import openNotificationPreviewMode from '../PreviewModeNotification';

const Main = () => {
  const dispatch = useDispatch();
  const {getEvents, transformEventData, getOrganizers} = useContext(ScheduleServiceContext);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const {
    alert: isAlert,
    alertMessage,
    timezone: tz,
    scheduleView,
    visibilityHiddenEvents,
    isShowPreview,
  } = useSelector(state => state.app);
  const data = useSelector(state => state.events);
  const {events} = data;

  const fetchEvents = () => {
    dispatch(showLoader());
    getEvents(tz)
      .then(evts => {
        dispatch(scheduleLoaded(evts));
        dispatch(showAlert());
      })
      .catch(() => message.error('Something went wrong'))
      .finally(() => dispatch(hideLoader()));
  };

  useEffect(() => {
    dispatch(setAlertMessage('Schedule uploaded successfully!'));
    getOrganizers()
      .then(organizers => dispatch(organizersLoaded(organizers)))
      .catch(() => message.error('Organizers list was not loaded'));
    fetchEvents();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (alertMessage && isAlert) {
      message.success(alertMessage);
      dispatch(setAlertMessage(null));
      dispatch(hideAlert());
    }
    // eslint-disable-next-line
  }, [isAlert]);

  useEffect(() => {
    const newEvents = transformEventData(events, tz);
    dispatch(scheduleLoaded(newEvents));
    // eslint-disable-next-line
  }, [tz]);

  useEffect(() => {
    if (!visibilityHiddenEvents) {
      setFilteredEvents(getFilteredTypesAndHideEvents(data));
    } else {
      setFilteredEvents(getFilteredTypesEvents(data));
    }
  }, [data, visibilityHiddenEvents]);

  useEffect(() => {
    const close = () => {
      getEvents(tz).then(evts => {
        dispatch(scheduleLoaded(evts));
      });
      if (events.findIndex(event => event.id === '') !== -1) {
        dispatch(showFormCreationEvent());
      }
      const editedPreviewEvent = events.find(event => event.previewEdit);
      if (editedPreviewEvent !== undefined) {
        dispatch(showFormEditEvent(editedPreviewEvent.id));
        delete editedPreviewEvent.previewEdit;
      }
      dispatch(hidePreview());
    };
    if (isShowPreview) openNotificationPreviewMode(close);
  }, [isShowPreview]);

  return (
    <>
      <EventTypeFilter />
      {
        {
          table: <ScheduleTable events={filteredEvents} />,
          list: <ScheduleList events={filteredEvents} />,
          calendar: <ScheduleСalendar events={filteredEvents} />,
        }[scheduleView]
      }
      <EventEditor fetchEvents={fetchEvents} />
      <TaskOverview />
      <NewTypeModal />
    </>
  );
};

export default Main;
