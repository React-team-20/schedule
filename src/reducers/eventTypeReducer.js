import { ADD_NEW_TYPE } from '../constants/actions-types';
import Event_Type_Styles from '../constants/events-types';

const initialState = JSON.parse(localStorage.getItem('eventTypeStyles')) || Event_Type_Styles;

const eventTypeReducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case ADD_NEW_TYPE: return [...state, payload] 

    default:
      return state;
  }
};

export default eventTypeReducer;
