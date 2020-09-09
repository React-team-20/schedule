import {LOADED_SCHEDULE} from '../constants/actions-types';

const initialState = [];

const eventsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADED_SCHEDULE:
      return action.payload;

    default:
      return state;
  }
};

export default eventsReducer;
