import {ADD_NEW_TYPE, DELETE_TYPE} from '../constants/actions-types';
import EVENT_TYPE_STYLES from '../constants/events-types';

const initialState = JSON.parse(localStorage.getItem('eventTypeStyles')) || EVENT_TYPE_STYLES;

const eventTypeReducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case ADD_NEW_TYPE:
      return [...state, payload];
    case DELETE_TYPE:
      localStorage.setItem(
        'eventTypeStyles',
        JSON.stringify([...state.filter(el => el.value !== payload)])
      );
      return [...state.filter(el => el.value !== payload)];
    default:
      return state;
  }
};

export default eventTypeReducer;
