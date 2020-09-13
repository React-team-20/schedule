import {
  CHANGE_SCHEDULE_VIEW,
  CHANGE_TIMEZONE,
  CHANGE_USER_ROLE,
  HIDE_ALERT,
  HIDE_FORM_CREATION_EVENT,
  HIDE_FORM_EDIT_EVENT,
  HIDE_LOADER,
  SHOW_ALERT,
  SHOW_FORM_CREATION_EVENT,
  SHOW_FORM_EDIT_EVENT,
  SHOW_LOADER,
} from '../constants/actions-types';
import { DEFAULT_TIMEZONE } from '../constants/timezones';
import { DEFAULT_USER_ROLE } from '../constants/user-role';

const initialState = {
  viewSelect: localStorage.getItem('scheduleView') || 'table',
  timezone: localStorage.getItem('timezone') || DEFAULT_TIMEZONE,
  userRole: localStorage.getItem('userRole') || DEFAULT_USER_ROLE,
  isShowFormСreationEvent: false,
  isShowFormEditEvent: false,
  currentEvent: null,
  loading: true,
  alert: null,
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_LOADER:
      return { ...state, loading: true };
    case HIDE_LOADER:
      return { ...state, loading: false };
    case SHOW_ALERT:
      return { ...state, alert: action.payload };
    case HIDE_ALERT:
      return { ...state, alert: null };
    case SHOW_FORM_CREATION_EVENT:
      return { ...state, isShowFormСreationEvent: true };
    case HIDE_FORM_CREATION_EVENT:
      return { ...state, isShowFormСreationEvent: false };
    case SHOW_FORM_EDIT_EVENT:
      return { ...state, isShowFormEditEvent: true, currentEvent: action.payload };
    case HIDE_FORM_EDIT_EVENT:
      return { ...state, isShowFormEditEvent: false, currentEvent: null };
    case CHANGE_SCHEDULE_VIEW:
      return { ...state, viewSelect: action.payload };
    case CHANGE_TIMEZONE:
      return { ...state, timezone: action.payload };
    case CHANGE_USER_ROLE:
      return { ...state, userRole: action.payload };
    default:
      return state;
  }
};

export default appReducer;
