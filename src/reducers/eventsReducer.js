import {LOADED_SCHEDULE, REMOVE_EVENT} from '../constants/actions-types';

const initialState = [];

const eventsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADED_SCHEDULE:
      return action.payload;
    case REMOVE_EVENT:
      return state.filter(evt => evt.id !== action.payload);
    default:
      return state;
  }
};

export default eventsReducer;
