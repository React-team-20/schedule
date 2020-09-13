import moment from 'moment-timezone';
import eventsTypes from '../constants/events-types';

export const dateTimeParse = (dateTime, timezone) => {
  return {
    date: moment(+dateTime)
      .tz(timezone)
      .format('YYYY-MM-DD'),
    time: moment(dateTime).tz(timezone).format('HH:mm'),
  };
};

export const setTagColor = tag => eventsTypes.find(item => item.value === tag).color;
