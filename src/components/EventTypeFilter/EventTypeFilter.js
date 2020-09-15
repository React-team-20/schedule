import {Select, Tag} from 'antd';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {setEventTypeFilter} from '../../actions';
import eventsTypes from '../../constants/events-types';
import './event-type-filter.css';

const {Option} = Select;

const EventTypeFilter = () => {
  const dispatch = useDispatch();
  const {eventTypeFilter} = useSelector(state => state.events);

  const children = eventsTypes.map(i => (
    <Option key={i.value}>
      <Tag className="list-item-tag" color={i.color}>
        {i.title.toUpperCase()}
      </Tag>
    </Option>
  ));

  function handleChange(value) {
    localStorage.setItem('eventTypeFilter', JSON.stringify(value));
    dispatch(setEventTypeFilter(value));
  }

  return (
    <Select
      mode="multiple"
      allowClear
      style={{width: '100%'}}
      placeholder="Please select the desired event types"
      defaultValue={eventTypeFilter}
      onChange={handleChange}
    >
      {children}
    </Select>
  );
};

export default EventTypeFilter;
