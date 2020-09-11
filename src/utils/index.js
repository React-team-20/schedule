import moment from 'moment-timezone';

export const dateTimeParse = (dateTime, timezone) => {
  return {
    date: moment(+dateTime)
      .tz(timezone)
      .format('YYYY-MM-DD'),
    time: moment(dateTime).tz(timezone).format('HH:mm'),
  };
};

export const setTagColor = tag => {
  switch (tag) {
    case 'YOUTUBE LIVE':
      return 'green';
    case 'OFFLINE LECTURE':
      return 'green';
    case 'SELF_EDUCATION':
      return 'blue';
    case 'TWITCH':
      return 'purple';
    case 'MEETUP':
      return 'geekblue';
    case 'OPTIONAL TASK':
      return 'magenta';
    case 'TASK':
      return '#87D068';
    case 'CROSS-CHECK':
      return '#f50';
    case 'DEADLINE':
      return '#FF4D4F';
    case 'CODEWARS':
      return '#2db7f5';
    case 'TEST':
      return '#854eca';
    case 'INTERVIEW':
      return '#854eca';
    default:
      return 'green';
  }
};
