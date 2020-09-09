import {
  CHANGE_SCHEDULE_VIEW,
  HIDE_ALERT,
  HIDE_LOADER,
  SHOW_ALERT,
  SHOW_LOADER,
  LOADED_SCHEDULE,
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

export const hideAlert = () => {
  return {
    type: HIDE_ALERT,
  };
};

export const showAlert = text => {
  return dispatch => {
    dispatch({
      type: SHOW_ALERT,
      payload: text,
    });

    setTimeout(() => {
      dispatch(hideAlert());
    }, 3000);
  };
};

export const changeScheduleView = newView => {
  return {
    type: CHANGE_SCHEDULE_VIEW,
    payload: newView,
  };
};

export const scheduleLoaded = newSchedule => {
  return {
    type: LOADED_SCHEDULE,
    payload: newSchedule,
  };
};
