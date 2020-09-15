import {LOADED_SCHEDULE, REMOVE_EVENT} from '../constants/actions-types';

const initialState = [];

const eventsReducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case LOADED_SCHEDULE:
      return payload;
    case REMOVE_EVENT:
      return state.filter(evt => evt.id !== payload);
    default:
      return state;
  }
};

export default eventsReducer;
