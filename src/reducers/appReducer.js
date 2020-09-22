import { act } from 'react-dom/test-utils';
import {
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
  SET_ALERT_MESSAGE,
  SET_TABLE_COLUMNS,
  SHOW_ALERT,
  SHOW_FORM_CREATION_EVENT,
  SHOW_FORM_EDIT_EVENT,
  SHOW_LOADER,
  SHOW_TASK_OVERVIEW,
  SHOW_TYPE_MODAL,
  SWITCH_VISIBILITY_HIDDEN_EVENTS,
  GEOCODE_PLACE,
} from '../constants/actions-types';
import DEFAULT_TABLE_COLUMNS from '../constants/table-columns';
import {DEFAULT_TIMEZONE} from '../constants/timezones';
import {DEFAULT_USER_ROLE} from '../constants/user-role';

const initialState = {
  scheduleView: localStorage.getItem('scheduleView') || 'table',
  timezone: localStorage.getItem('timezone') || DEFAULT_TIMEZONE,
  userRole: localStorage.getItem('userRole') || DEFAULT_USER_ROLE,
  visibilityHiddenEvents: localStorage.getItem('visibilityHiddenEvents') || false,
  tableColumns: JSON.parse(localStorage.getItem('tableColumns')) || DEFAULT_TABLE_COLUMNS,
  isShowFormСreationEvent: false,
  isShowFormEditEvent: false,
  isShowTaskOverview: false,
  isShowTypeModal: false,
  currentEvent: null,
  loading: true,
  alert: false,
  alertMessage: null,
  organizers: [],
  hiddenTableColumns: [],
  lat: null,
  lng: null,
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_LOADER:
      return {...state, loading: true};
    case HIDE_LOADER:
      return {...state, loading: false};
    case SHOW_ALERT:
      return {...state, alert: true};
    case HIDE_ALERT:
      return {...state, alert: false};
    case SET_ALERT_MESSAGE:
      return {...state, alertMessage: action.payload};
    case SHOW_FORM_CREATION_EVENT:
      return {...state, isShowFormСreationEvent: true};
    case HIDE_FORM_CREATION_EVENT:
      return {...state, isShowFormСreationEvent: false};
    case SHOW_FORM_EDIT_EVENT:
      return {...state, isShowFormEditEvent: true, currentEvent: action.payload};
    case HIDE_FORM_EDIT_EVENT:
      return {...state, isShowFormEditEvent: false, currentEvent: null};
    case SHOW_TASK_OVERVIEW:
      return {...state, isShowTaskOverview: true, currentEvent: action.payload};
    case HIDE_TASK_OVERVIEW:
      return {...state, isShowTaskOverview: false, currentEvent: null};
    case SWITCH_VISIBILITY_HIDDEN_EVENTS:
      return {...state, visibilityHiddenEvents: !state.visibilityHiddenEvents};
    case CHANGE_SCHEDULE_VIEW:
      return {...state, scheduleView: action.payload};
    case CHANGE_TIMEZONE:
      return {...state, timezone: action.payload};
    case CHANGE_USER_ROLE:
      return {...state, userRole: action.payload};
    case LOADED_ORGANIZERS:
      return {...state, organizers: action.payload};
    case SET_TABLE_COLUMNS:
      return {...state, tableColumns: action.payload};
    case SHOW_TYPE_MODAL:
      return {...state, isShowTypeModal: action.payload};
    case HIDE_TYPE_MODAL:
      return {...state, isShowTypeModal: action.payload};
    case GEOCODE_PLACE:
      return {...state, lng: action.lng, lat: action.lat};
    default:
      return state;
  }
};

export default appReducer;
