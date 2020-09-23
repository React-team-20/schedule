import {combineReducers} from 'redux';
import appReducer from './appReducer';
import eventsReducer from './eventsReducer';
import eventTypeReducer from './eventTypeReducer';

const rootReducer = combineReducers({
  app: appReducer,
  events: eventsReducer,
  styles: eventTypeReducer,
});

export default rootReducer;
