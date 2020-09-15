import {Avatar, Divider, List, Tag} from 'antd';
import React from 'react';
import {setTagColor} from '../../utils';

const getListItem = data => {
  return (
    <div className="list-item-wrapper">
      <Divider className="list-item-divider" orientation="left">
        September, 2020
      </Divider>
      <List
        itemLayout="horizontal"
        dataSource={data}
        renderItem={item => (
          <List.Item>
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
              title={<a href="https://ant.design">{item.topic}</a>}
              description={`${item.date}, ${item.time}`}
            />
            <span className="item-organizer">organizer:</span>
            <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
            <a href="#">link</a>
          </List.Item>
        )}
      />
    </div>
  );
};

const ScheduleList = ({events}) => {
  return (
    <div className="list-wrapper">
      {getListItem(events)}
      {getListItem(events)}
    </div>
  );
};

export default ScheduleList;
