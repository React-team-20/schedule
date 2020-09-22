import {List, Tag, Button, Divider} from 'antd';
import {EyeOutlined} from '@ant-design/icons';
import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {setHiddenEvents, removeHiddenEvent, showTaskOverview} from '../../../actions';
import EventHideButton from '../../ScheduleTable/EventHideButton';

import {
  setTagColor,
  dateByMonthAndYearParse, 
  dateByMonthAndDayParse, 
  shortDateByDayOfWeekParse,
  shortDateByDayParse} from '../../../utils';
import GithubUserLink from '../../GithubUserLink';

const ScheduleListItem = (data) => {
  const dispatch = useDispatch();
  const {hiddenEvents} = useSelector(state => state.events);
  const [selectedRows, setSelectedRows] = useState([]);

  const handlerEventShow = id => {
    dispatch(removeHiddenEvent(id));
  };

  const handleClickCapture = (event, id) => {
    if (event.target.id) return false;

    if (event.shiftKey) {
      onSelectRow(id, true);
    } else {
      onSelectRow(id);
    }
  };

  const onSelectRow = (id, isShift = false) => {
    if (isShift) {      
      if (selectedRows.includes(id)) {
        setSelectedRows(selectedRows.filter(i => i !== id));
      } else {
        setSelectedRows([...selectedRows, id]);
      }
    } else {
      setSelectedRows(selectedRows[0] === id ? [] : [id]);
    }
  };

  const showTaskInfo = id => {
    dispatch(showTaskOverview(id));
  };

  const setItemClassName = (item) => {
    if (selectedRows.includes(item.id)) {
      return 'list-item selected-list-item';
    }
    if (hiddenEvents.includes(item.id)) {
      return 'list-item hidden-event';
    }
    if (hiddenEvents.includes(item.id) && selectedRows.includes(item.id)) {
      return 'list-item selected-list-item';
    }   
    if (item.dateTime < Date.now()) {
      return 'list-item past-event';
    }
    if (item.dateTime < Date.now() && selectedRows.includes(item.id)) {
      return 'list-item selected-list-item';
    }
    return 'list-item';
  }

  const handlerEventHide = () => {
    dispatch(setHiddenEvents(selectedRows));
    setSelectedRows([]);
  }; 
  
  const getDivider = (data) => {
    return <Divider className="list-item-divider" orientation="left">{data}</Divider>  
  };
  
  const getMonthAndYearDivider = (data, index) => {
    const currentDate = dateByMonthAndYearParse(data[index].dateTime);
    const prevIdx = data[index - 1];

    if (prevIdx) {      
      const previousDate = dateByMonthAndYearParse(data[index - 1].dateTime);

      if (previousDate !== currentDate) {
        return getDivider(currentDate);
      }
    } else {
      return getDivider(currentDate);
    }
  }
  
  return (
    <div className="list-item-wrapper">
      <div className="hide-button-wrapper">        
          {selectedRows.length ? (
            <EventHideButton handlerEventHide={handlerEventHide} />
          ) : (
            ''
          )}
      </div> 
      <List
        pagination={{defaultCurrent: 1, defaultPageSize: 10,}}
        itemLayout="horizontal"
        dataSource={data}
        renderItem={(item, index) => (
         <> 
          {getMonthAndYearDivider(data, index)}
          <List.Item 
            className={setItemClassName(item)}
            onClickCapture={(event) => handleClickCapture(event, item.id)}
            onDoubleClick={() => showTaskInfo(item.id)}>
            <div className="button-wrapper">
              {hiddenEvents.includes(item.id)
              ? <Button
                  type="text"
                  className="show-event-button list-item-button"
                  onClick={() => handlerEventShow(item.id)}
                >      
                  <EyeOutlined />
                </Button>
              : ''}  
            </div>  
            <div className="item-list-content">
              <div className="tag-wrapper">
                <Tag className="list-item-tag" color={setTagColor(item.type)}>
                  {item.type
                    .toUpperCase()
                    .split('')
                    .map(i => (i === '-' ? ' ' : i))
                    .join('')}
                </Tag>
              </div>
              <List.Item.Meta
                title={
                  <>
                    <p className="short-date-wrapper">
                      <span className="date-week">{shortDateByDayParse(item.dateTime)}</span>
                      <span className="date-day">{shortDateByDayOfWeekParse(item.dateTime)}</span>
                    </p>
                    <Button
                      type="link"
                      className="info-event-button"
                      onClick={() => showTaskInfo(item.id)}
                      style={{padding: '0'}}
                    >
                      {item.topic}
                    </Button>
                  </>
                }
                description={`${dateByMonthAndDayParse(item.dateTime)}, ${item.time}`}
              />              
              {item.organizer ? (
                <div className="item-organizer">
                  <span className="item-organizer-label">organizer:</span>
                  {GithubUserLink(item.organizer)}
                </div>
              ) : (
                ''
              )}
            </div> 
          </List.Item>   
        </>         
        )}
      />
    </div>  
  );
};

export default ScheduleListItem;
