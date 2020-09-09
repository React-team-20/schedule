import {
  CHANGE_SCHEDULE_VIEW,
  HIDE_ALERT,
  HIDE_LOADER,
  SHOW_ALERT,
  SHOW_LOADER,
} from '../constants/actions-types';

const initialState = {
  viewSelect: localStorage.getItem('scheduleView') || 'table',
  loading: true,
  alert: null,
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_LOADER:
      return {...state, loading: true};
    case HIDE_LOADER:
      return {...state, loading: false};
    case SHOW_ALERT:
      return {...state, alert: action.payload};
    case HIDE_ALERT:
      return {...state, alert: null};
    case CHANGE_SCHEDULE_VIEW:
      return {...state, viewSelect: action.payload};
    default:
      return state;
  }
};

export default appReducer;
