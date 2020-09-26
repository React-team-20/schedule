import React, {useContext} from 'react';
import {connect} from 'react-redux';
import {
  hideFormCreationEvent,
  hideFormEditEvent,
  showPreview,
  scheduleLoaded,
} from '../../../../actions';
import {Button} from 'antd';
import {ScheduleServiceContext} from '../../../ScheduleServiceContext';

const PreviewButton = ({
  currentEvent,
  hideFormCreationEvent,
  hideFormEditEvent,
  events,
  scheduleLoaded,
  showPreview,
  currentEventId,
  isShowFormСreationEvent,
  isShowFormEditEvent,
  tz,
  deadline,
  form,
}) => {
  const {transformEventData} = useContext(ScheduleServiceContext);

  const openPreview = () => {
    form
      .validateFields()
      .then(() => {
        if (isShowFormСreationEvent) {
          let newEvents = transformEventData([...events, {...currentEvent, id: ''}], tz);
          if (deadline.flag) {
            const deadlineForCurrentEvent = Object.assign({}, currentEvent);
            newEvents = transformEventData(
              [
                ...newEvents,
                {
                  ...deadlineForCurrentEvent,
                  type: 'deadline',
                  id: 'id',
                  dateTime: deadline.date,
                },
              ],
              tz
            );
          }
          scheduleLoaded(newEvents);
          hideFormCreationEvent();
        }
        if (isShowFormEditEvent) {
          const copyEvents = events.slice();
          const copyCurrentEvent = Object.assign({}, currentEvent);
          const editEventIndex = events.findIndex(event => event.id === currentEventId);
          copyEvents[editEventIndex] = {...copyCurrentEvent, previewEdit: true};
          scheduleLoaded(transformEventData(copyEvents, tz));
          hideFormEditEvent();
        }
      })
      .then(() => showPreview());
  };

  return (
    <Button onClick={openPreview} type="primary" style={{marginRight: 8}}>
      Preview
    </Button>
  );
};

const mapStateToProps = state => {
  return {
    events: state.events.events,
    isShowFormСreationEvent: state.app.isShowFormСreationEvent,
    isShowFormEditEvent: state.app.isShowFormEditEvent,
    isShowPreview: state.app.isShowPreview,
    currentEventId: state.app.currentEvent,
    tz: state.app.timezone,
  };
};

const mapDispatchToProps = {
  hideFormCreationEvent,
  hideFormEditEvent,
  showPreview,
  scheduleLoaded,
};

export default connect(mapStateToProps, mapDispatchToProps)(PreviewButton);
