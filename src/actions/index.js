const scheduleLoaded = newSchedule => {
  return {
    type: 'SCHEDULE_LOADED',
    payload: newSchedule,
  };
};

export {scheduleLoaded};
