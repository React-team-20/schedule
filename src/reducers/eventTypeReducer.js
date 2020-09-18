import Event_Type_Styles from '../constants/events-types';

const initialState = localStorage.getItem('eventTypeStyles') || Event_Type_Styles;

const eventTypeReducer = (state = initialState, {type}) => {
  switch (type) {
    default:
      return state;
  }
};

export default eventTypeReducer;
