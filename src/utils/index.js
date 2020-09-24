import moment from 'moment-timezone';
import eventsTypes from '../constants/events-types';

export const dateTimeParse = (dateTime, timezone) => {
  return {
    date: moment(dateTime).tz(timezone).format('YYYY-MM-DD'),
    time: moment(dateTime).tz(timezone).format('HH:mm'),
  };
};

export const shortDateByDayParse = dateTime => {
  return moment(dateTime).format('DD');
};

export const shortDateByDayOfWeekParse = dateTime => {
  return moment(dateTime).format('ddd');
};

export const dateByMonthAndDayParse = dateTime => {
  return moment(dateTime).format('MMMM DD');
};

export const dateByMonthAndYearParse = dateTime => {
  return moment(dateTime).format('MMMM YYYY');
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
  return resultOfSearch || defaultTag;
};

export const isLinkRegExp = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w\-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)/;

export const isImageLinkRegExp = /((http|ftp|https):\/\/([\w+?.\w+])+([a-zA-Z0-9\\~\\!\\@\\#\\$\\%\\^\\&\\*\\(\\)_\-\\=\\+\\\\/\\?\\.\\:\\;\\'\\,]*\.(?:jpg|JPG|jpeg|JPEG|gif|GIF|png|PNG|bmp|BMP|tiff|TIFF)))/;
