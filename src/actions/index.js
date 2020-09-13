import {
  CHANGE_SCHEDULE_VIEW,
  CHANGE_TIMEZONE,
  CHANGE_USER_ROLE,
  HIDE_ALERT,
  HIDE_FORM_CREATION_EVENT,
  HIDE_FORM_EDIT_EVENT,
  HIDE_LOADER,
  LOADED_SCHEDULE,
  REMOVE_EVENT,
  SET_ALERT_MESSAGE,
  SHOW_ALERT,
  SHOW_FORM_CREATION_EVENT,
  SHOW_FORM_EDIT_EVENT,
  SHOW_LOADER,
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

export const removeEvent = id => {
  return {
    type: REMOVE_EVENT,
    payload: id,
  };
};

export const hideFormEditEvent = () => {
  return {
    type: HIDE_FORM_EDIT_EVENT,
  };
};

export const scheduleLoaded = newSchedule => {
  return {
    type: LOADED_SCHEDULE,
    payload: newSchedule,
  };
};
