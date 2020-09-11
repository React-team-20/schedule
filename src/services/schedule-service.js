import {dateTimeParse} from '../utils';

export default class ScheduleService {
  getEvents = async tz => {
    const res = await fetch('https://rs-react-schedule.firebaseapp.com/api/team/q20/events');
    const data = await res.json();
    return this.transformEventData(data.data, tz);
  };

  addEvent = async event => {
    await fetch('https://rs-react-schedule.firebaseapp.com/api/team/q20/event', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(event),
    });
  };

  editEvent = async (eventId, event) => {
    await fetch(`https://rs-react-schedule.firebaseapp.com/api/team/q20/event/${eventId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(event),
    });
  };

  deleteEvent = async eventId => {
    await fetch(`https://rs-react-schedule.firebaseapp.com/api/team/q20/event/${eventId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
    });
  };

  getEvent = async eventId => {
    const res = await fetch(
      `https://rs-react-schedule.firebaseapp.com/api/team/q20/event/${eventId}`
    );
    const data = await res.json();
    return data;
  };

  transformEventData = (data, tz) => {
    const sortData = data.sort((a, b) => a.dateTime - b.dateTime);
    return tz ? sortData.map(item => ({...item, ...dateTimeParse(item.dateTime, tz)})) : sortData;
  };
}
