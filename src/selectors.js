import {createSelector} from 'reselect';

export const getFilteredEvents = createSelector(
  state => state.events,
  state => state.eventTypeFilter,
  (events, types) => events.filter(item => types.includes(item.type))
);
