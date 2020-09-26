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
<<<<<<< HEAD
import TestClosePreviewButton from '../TestClosePreviewButton';
=======
import openNotificationPreviewMode from '../PreviewModeNotification';
>>>>>>> cd47e188f4281c334b294cddc9795ceeefa9836e

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
      // todo action
      //dispatch(hidePreview);
      console.log('Notification was closed.');
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
      <TestClosePreviewButton></TestClosePreviewButton>
    </>
  );
};

export default Main;
