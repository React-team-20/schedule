import React from 'react';
import {Divider} from 'antd';
import {filterDateByMonthAndYear} from '../../utils';
import ScheduleListItem from './ScheduleListItem';

const getDivider = (data) => {
  return <Divider className="list-item-divider" orientation="left">{data}</Divider>  
};

const getListItem = (key, data) => {
  return ( 
    <div key={key} className="list-item-wrapper">
      {getDivider(key)}
      {ScheduleListItem(data)}
    </div>   
  )    
};

const ScheduleList = ({events}) => {
  const filterData = filterDateByMonthAndYear(events);
  const listItems = [];

  for (let key in filterData) {  
    const item = getListItem(key, filterData[key]);
    listItems.push(item)
  }

  return (
    <div className="list-wrapper"> 
      {listItems}
    </div>  
  )
};

export default ScheduleList;