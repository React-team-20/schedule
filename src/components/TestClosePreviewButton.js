import React, {useContext} from 'react';
import {connect} from 'react-redux';
import {hidePreview, scheduleLoaded, showFormEditEvent, showFormCreationEvent} from '../actions';
import {ScheduleServiceContext} from './ScheduleServiceContext';

const TestClosePreviewButton = ({
  tz,
  hidePreview,
  scheduleLoaded,
  isShowPreview,
  events,
  showFormCreationEvent,
  showFormEditEvent,
}) => {
  const {getEvents} = useContext(ScheduleServiceContext);

  const closePreview = () => {
    getEvents(tz).then(evts => {
      scheduleLoaded(evts);
    });
    if (events.findIndex(event => event.id === '') !== -1) {
      showFormCreationEvent();
    }
    if (events.find(event => event.previewEdit === true) !== undefined) {
      showFormEditEvent(events.find(event => event.previewEdit).id);
      delete events.find(event => event.previewEdit).previewEdit;
    }
    hidePreview();
  };
  return isShowPreview && <button onClick={closePreview}>close preview</button>;
};

const mapDispatchToProps = {
  hidePreview,
  scheduleLoaded,
  showFormCreationEvent,
  showFormEditEvent,
};
const mapStateToProps = state => {
  return {
    isShowPreview: state.app.isShowPreview,
    events: state.events.events,
    tz: state.app.timezone,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TestClosePreviewButton);
