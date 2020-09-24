import {
  ADD_NEW_TYPE,
  CHANGE_SCHEDULE_VIEW,
  CHANGE_TIMEZONE,
  CHANGE_USER_ROLE,
  HIDE_ALERT,
  HIDE_FORM_CREATION_EVENT,
  HIDE_FORM_EDIT_EVENT,
  HIDE_LOADER,
  HIDE_TASK_OVERVIEW,
  HIDE_TYPE_MODAL,
  LOADED_ORGANIZERS,
  LOADED_SCHEDULE,
  REMOVE_EVENT,
  REMOVE_HIDDEN_EVENT,
  SET_ALERT_MESSAGE,
  SET_EVENT_TYPE_FILTER,
  SET_HIDDEN_EVENTS,
  SET_TABLE_COLUMNS,
  SHOW_ALERT,
  SHOW_FORM_CREATION_EVENT,
  SHOW_FORM_EDIT_EVENT,
  SHOW_LOADER,
  SHOW_TASK_OVERVIEW,
  SHOW_TYPE_MODAL,
  SWITCH_VISIBILITY_HIDDEN_EVENTS,
  GEOCODE_PLACE,
  EXPORT_TO_GOOGLE
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

export const removeHiddenEvent = id => {
  return {
    type: REMOVE_HIDDEN_EVENT,
    payload: id,
  };
};

export const setTableColumns = title => {
  return {
    type: SET_TABLE_COLUMNS,
    payload: title,
  };
};

export const addNewType = value => {
  return {
    type: ADD_NEW_TYPE,
    payload: value,
  };
};

export const showTypeModalView = value => {
  return {
    type: SHOW_TYPE_MODAL,
    payload: value,
  };
};

export const hideTypeModalView = value => {
  return {
    type: HIDE_TYPE_MODAL,
    payload: value,
  };
};

export const geocodePlace = place => {
  return async dispatch => {
    const url = `https://geocode-maps.yandex.ru/1.x/?format=json&apikey=3aa805ff-53da-48b8-9c1e-5eee21f8ecde&geocode=${place}`;
    const response = await fetch(url);
    const getPlacePos = await response.json();
    const [lng, lat] = await getPlacePos.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos.split(' ');
    dispatch({type: GEOCODE_PLACE, lat: +lat, lng: +lng});
  }
}

export const exportToGoogle = () => {
  return {
    type: EXPORT_TO_GOOGLE,
  };
};
