import React from 'react';

const ScheduleServiceContext = React.createContext();

const {
  Provider: ScheduleServiceProvider,
  Consumer: ScheduleServiceConsumer,
} = ScheduleServiceContext;

export {ScheduleServiceContext, ScheduleServiceProvider, ScheduleServiceConsumer};
