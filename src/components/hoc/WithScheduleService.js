/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import {ScheduleServiceConsumer} from '../ScheduleServiceContext';

const withScheduleServiceService = () => Wrapped => {
  return props => {
    return (
      <ScheduleServiceConsumer>
        {scheduleService => {
          return <Wrapped {...props} scheduleService={scheduleService} />;
        }}
      </ScheduleServiceConsumer>
    );
  };
};

export default withScheduleServiceService;
