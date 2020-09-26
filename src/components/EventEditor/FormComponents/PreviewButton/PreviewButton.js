import React, {useContext, useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {
  hideFormCreationEvent,
  hideFormEditEvent,
  showPreview,
  scheduleLoaded,
} from '../../../../actions';
import {Button} from 'antd';
import {dateTimeParse} from '../../../../utils';
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
  onClose,
  tz,
}) => {
  const {transformEventData} = useContext(ScheduleServiceContext);

  const openPreview = () => {
    showPreview();
    if (isShowFormСreationEvent) {
      const dateAndTime = dateTimeParse(currentEvent.dataTime, tz);
      const newEvents = transformEventData([...events, {...currentEvent, ...dateAndTime}], tz);
      scheduleLoaded(newEvents);
      hideFormCreationEvent();
    }
    if (isShowFormEditEvent) {
      const newEvents = events.slice();
      const newCurrentEvent = Object.assign({}, currentEvent);
      newCurrentEvent.previewEdit = true;
      const editEventIndex = events.findIndex(event => event.id === currentEventId);
      newEvents[editEventIndex] = newCurrentEvent;
      scheduleLoaded(newEvents);
      hideFormEditEvent();
    }
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
