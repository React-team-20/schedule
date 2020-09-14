import React from 'react';
import {List, Tag} from 'antd';
import {setTagColor} from '../../../utils';
import GithubUserLink from '../../GithubUserLink';

const ScheduleListItem = (data) => {

  return (
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
          {item.organizer ? GithubUserLink(item.organizer) : ''}
        </List.Item>
      )}
    />
  )
}

export default ScheduleListItem;
