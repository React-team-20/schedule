import {createSelector} from 'reselect';

export const getFilteredTypesEvents = createSelector(
  state => state.events,
  state => state.eventTypeFilter,
  (events, types) => (types.length ? events.filter(item => types.includes(item.type)) : events)
);

export const getFilteredHiddenEvents = createSelector(
  state => state.events,
  state => state.hiddenEvents,
  (events, hidden) => events.filter(item => !hidden.includes(item.id))
);

export const getFilteredTypesAndHideEvents = createSelector(
  getFilteredTypesEvents,
  state => state.hiddenEvents,
  (events, hidden) => events.filter(item => !hidden.includes(item.id))
);

export const getFilteredColumns = createSelector(
  state => state.columns,
  state => state.hiddenColumns,
  (columns, hiddenColumns) => columns.filter(i => !hiddenColumns.includes(i.title))
);
