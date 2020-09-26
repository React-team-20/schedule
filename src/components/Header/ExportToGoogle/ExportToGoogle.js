
import React from 'react';
import {useSelector} from 'react-redux';
import {ExportOutlined} from '@ant-design/icons';
import {Button, Tooltip} from 'antd';
import {gapi} from 'gapi-script';
import CALENDAR_API from '../../../constants/calendar-api';
import moment from 'moment-timezone';

const ExportToGoogle = () => {
  const data = useSelector(state => state.events);
  const {events} = data;

  const eventsList = events.map((event) => {
    return {   
      'summary': event.topic,
      'location': (event.place.address) ? event.place.address : '',
      'description': event.description,
      'start': {
        'dateTime': moment(event.dateTime).format(),
        'timeZone': 'Europe/Minsk'
      },
      'end': {
        'dateTime': moment(event.dateTime).format(),
        'timeZone': 'Europe/Minsk'
      },
      'reminders': {
        'useDefault': false,
        'overrides': [
          {'method': 'email', 'minutes': 24 * 60},
          {'method': 'popup', 'minutes': 10}
        ]
      },
      'source': {
        'url': (event.descriptionUrl) ? event.descriptionUrl : 'https://google.com',
        'title': 'Description url'
      }
    }
  });

  const getListEventsFromCalendar = () => {    
    return gapi.client.calendar.events.list({
      'calendarId': 'primary',
      'showDeleted': false,
      'timeMin': (new Date()).toISOString(),
      'singleEvents': true,
      'orderBy': 'startTime',          
      'colorRgbFormat': true
    }).then(response => {      
      return response.result.items;
    });
  };

  const handleClick = () => {
    gapi.load('client:auth2', () => {
      gapi.client.init({
        apiKey: CALENDAR_API.API_KEY,
        clientId: CALENDAR_API.CLIENT_ID,
        discoveryDocs: CALENDAR_API.DISCOVERY_DOCS,
        scope: CALENDAR_API.SCOPES,
      })

      gapi.auth2.getAuthInstance().signIn()
      .then(async () => {
        const calandarEvents = await getListEventsFromCalendar();      
        const lastIndex = eventsList.length - 1;

        eventsList.map((event, index) => {         
          const eventExisting = calandarEvents.filter((item) => item.start.dateTime === event.start.dateTime);
         
          if (eventExisting.length > 0) {
            const eventId = eventExisting[0].id;
            
            const request = gapi.client.calendar.events.update({
              'calendarId': 'primary',
              'eventId': eventId,
              'resource': event
            });
            
            request.execute(event => {
              if (lastIndex === index) {
                window.open(event.htmlLink)
              }            
            })
          }

          if (eventExisting.length === 0) {
            const request = gapi.client.calendar.events.insert({
              'calendarId': 'primary',
              'resource': event,
            });

            request.execute(event => {           
              if (lastIndex === index) {
                window.open(event.htmlLink)
              }            
            });
          }
        });
      });
    });
  }

  return (
    <Tooltip title='export to Google calendar'>
      <Button className='button-center-icon button-export' onClick={handleClick}>
        <ExportOutlined />
      </Button>
    </Tooltip>  
  );
};

export default ExportToGoogle;