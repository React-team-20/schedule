import React from 'react';
import ScheduleListItem from './ScheduleListItem';

const getListItem = (data) => {
  return ( 
    <div className="list-item-wrapper">
      {ScheduleListItem(data)}
    </div>   
  )    
};

const ScheduleList = ({events}) => {
  const listItems = getListItem(events);

  return (
    <div className="list-wrapper">
      {listItems}
    </div>  
  )
};

export default ScheduleList;