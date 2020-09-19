import {
  LOADED_SCHEDULE,
  REMOVE_EVENT,
  REMOVE_HIDDEN_EVENT,
  SET_EVENT_TYPE_FILTER,
  SET_HIDDEN_EVENTS,
} from '../constants/actions-types';

const initialState = {
  events: [],
  hiddenEvents: JSON.parse(localStorage.getItem('hiddenEvents')) || [],
  eventTypeFilter: JSON.parse(localStorage.getItem('eventTypeFilter')) || [],
};
let newHiddenEvents;

const eventsReducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case LOADED_SCHEDULE:
      return {...state, events: payload};
    case REMOVE_EVENT:
      return {...state, events: state.events.filter(evt => evt.id !== payload)};
    case SET_EVENT_TYPE_FILTER:
      return {...state, eventTypeFilter: payload};
    case SET_HIDDEN_EVENTS:
      newHiddenEvents = Array.from(new Set([...state.hiddenEvents, ...payload]));
      localStorage.setItem('hiddenEvents', JSON.stringify(newHiddenEvents));
      return {...state, hiddenEvents: newHiddenEvents};
    case REMOVE_HIDDEN_EVENT:
      newHiddenEvents = state.hiddenEvents.filter(evt => evt !== payload);
      localStorage.setItem('hiddenEvents', JSON.stringify(newHiddenEvents));
      return {...state, hiddenEvents: newHiddenEvents};
    default:
      return state;
  }
};

export default eventsReducer;
