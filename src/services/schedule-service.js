export default class ScheduleService {
  getSchedule() {
    return [
      {
        key: 1,
        topic: 'Schedule',
        description: 'выдача таска',
        descriptionUrl:
          'https://www.google.com/url?q=https://github.com/rolling-scopes-school/tasks/blob/master/tasks/schedule.md&sa=D&ust=1599577530380000&usg=AFQjCNHwbeeMRIINGVr049lGk6fcedZilQ',
        tags: ['task'],
        date: 'Tuesday, 1 September 2020',
        time: '19:00',
        place: 'string',
        comment: 'string',
      },
      {
        key: 2,
        topic: 'React. Routing',
        description: 'выдача таска',
        descriptionUrl: 'https://www.youtube.com/',
        tags: ['lecture'],
        date: 'Wednesday, 2 September 2020',
        time: '19:00',
        place: 'string',
        comment: 'string',
      },
    ];
  }
}
