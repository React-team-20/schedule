import {ADD_NEW_TYPE} from '../constants/actions-types';
import EVENT_TYPE_STYLES from '../constants/events-types';

const initialState = JSON.parse(localStorage.getItem('eventTypeStyles')) || EVENT_TYPE_STYLES;

const eventTypeReducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case ADD_NEW_TYPE:
      return [...state, payload];

    default:
      return state;
  }
};

export default eventTypeReducer;
