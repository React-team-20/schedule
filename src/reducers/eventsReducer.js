import {LOADED_SCHEDULE, REMOVE_EVENT, SET_EVENT_TYPE_FILTER} from '../constants/actions-types';

const initialState = {
  events: [],
  eventTypeFilter: JSON.parse(localStorage.getItem('eventTypeFilter')) || [],
};

const eventsReducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case LOADED_SCHEDULE:
      return {...state, events: payload};
    case REMOVE_EVENT:
      return {...state, events: state.events.filter(evt => evt.id !== payload)};
    case SET_EVENT_TYPE_FILTER:
      return {...state, eventTypeFilter: payload};
    default:
      return state;
  }
};

export default eventsReducer;
