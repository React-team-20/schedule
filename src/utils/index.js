import moment from 'moment-timezone';
import eventsTypes from '../constants/events-types';

export const dateTimeParse = (dateTime, timezone) => {
  return {
    date: moment(dateTime).tz(timezone).format('YYYY-MM-DD'),
    time: moment(dateTime).tz(timezone).format('HH:mm'),
  };
};

export const shortDateByDayParse = (dateTime, timezone) => {
  return moment(dateTime).tz(timezone).format('DD');
};

export const shortDateByDayOfWeekParse = (dateTime, timezone) => {
  return moment(dateTime).tz(timezone).format('ddd');
};

export const dateByMonthAndDayParse = (dateTime, timezone) => {
  return moment(dateTime).tz(timezone).format('MMMM DD');
};

export const dateByMonthAndYearParse = (dateTime, timezone) => {
  return moment(dateTime).tz(timezone).format('MMMM YYYY');
};

export const setTagColor = tag => eventsTypes.find(item => item.value === tag).background;

export const setTagStyle = (tag, eventTypes) => {
  const resultOfSearch = eventTypes.find(item => item.value === tag);
  const defaultTag = {
    title: tag,
    value: tag,
    background: '#d9e3f0',
    color: '#555555',
  };
  if (resultOfSearch) {
    return resultOfSearch;
  } else {
    return defaultTag;
  }
};

export const isLinkRegExp = /^((ftp|http|https):\/\/)?(www\.)?([A-Za-zА-Яа-я0-9]{1}[A-Za-zА-Яа-я0-9-]*\.?)*\.{1}[A-Za-zА-Яа-я0-9-]{2,8}(\/([\w#!:.?+=&%@!\-/])*)?/;
