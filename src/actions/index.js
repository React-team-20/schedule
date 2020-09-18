import {
  CHANGE_SCHEDULE_VIEW,
  CHANGE_TIMEZONE,
  CHANGE_USER_ROLE,
  HIDE_ALERT,
  HIDE_FORM_CREATION_EVENT,
  HIDE_FORM_EDIT_EVENT,
  HIDE_LOADER,
  HIDE_TASK_OVERVIEW,
  LOADED_ORGANIZERS,
  LOADED_SCHEDULE,
  REMOVE_EVENT,
  SET_ALERT_MESSAGE,
  SET_EVENT_TYPE_FILTER,
  SET_HIDDEN_EVENTS,
  SHOW_ALERT,
  SHOW_FORM_CREATION_EVENT,
  SHOW_FORM_EDIT_EVENT,
  SHOW_LOADER,
  SHOW_TASK_OVERVIEW,
  SWITCH_VISIBILITY_HIDDEN_EVENTS,
} from '../constants/actions-types';

export const showLoader = () => {
  return {
    type: SHOW_LOADER,
  };
};

export const hideLoader = () => {
  return {
    type: HIDE_LOADER,
  };
};

export const showAlert = () => {
  return {
    type: SHOW_ALERT,
  };
};

export const hideAlert = () => {
  return {
    type: HIDE_ALERT,
  };
};

export const setAlertMessage = text => {
  return {
    type: SET_ALERT_MESSAGE,
    payload: text,
  };
};

export const changeScheduleView = newView => {
  return {
    type: CHANGE_SCHEDULE_VIEW,
    payload: newView,
  };
};

export const changeTimezone = newTimezone => {
  return {
    type: CHANGE_TIMEZONE,
    payload: newTimezone,
  };
};

export const changeUserRole = newUserRole => {
  return {
    type: CHANGE_USER_ROLE,
    payload: newUserRole,
  };
};

export const showFormCreationEvent = () => {
  return {
    type: SHOW_FORM_CREATION_EVENT,
  };
};

export const hideFormCreationEvent = () => {
  return {
    type: HIDE_FORM_CREATION_EVENT,
  };
};

export const showFormEditEvent = id => {
  return {
    type: SHOW_FORM_EDIT_EVENT,
    payload: id,
  };
};

export const hideFormEditEvent = () => {
  return {
    type: HIDE_FORM_EDIT_EVENT,
  };
};

export const showTaskOverview = id => {
  return {
    type: SHOW_TASK_OVERVIEW,
    payload: id,
  };
};

export const hideTaskOverview = () => {
  return {
    type: HIDE_TASK_OVERVIEW,
  };
};

export const switchVisibilityHiddenEvents = () => {
  return {
    type: SWITCH_VISIBILITY_HIDDEN_EVENTS,
  };
};

export const removeEvent = id => {
  return {
    type: REMOVE_EVENT,
    payload: id,
  };
};

export const scheduleLoaded = newSchedule => {
  return {
    type: LOADED_SCHEDULE,
    payload: newSchedule,
  };
};

export const setEventTypeFilter = events => {
  return {
    type: SET_EVENT_TYPE_FILTER,
    payload: events,
  };
};

export const organizersLoaded = organizers => {
  return {
    type: LOADED_ORGANIZERS,
    payload: organizers,
  };
};

export const setHiddenEvents = events => {
  return {
    type: SET_HIDDEN_EVENTS,
    payload: events,
  };
};
