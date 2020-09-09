import {combineReducers} from 'redux';
import appReducer from './appReducer';
import eventsReducer from './eventsReducer';

const rootReducer = combineReducers({
  app: appReducer,
  events: eventsReducer,
});

export default rootReducer;
