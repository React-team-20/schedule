import {RightOutlined} from '@ant-design/icons';
import {Tag} from 'antd';
import React from 'react';
import {isLinkRegExp, setTagColor} from '../../../utils';
import GithubUserLink from '../../GithubUserLink';
import EditEventButton from '../EditEventButton';
import RemoveEventButton from '../RemoveEventButton';
import TopicButton from '../TopicButton';
import СolumnSelectionMenu from '../СolumnSelectionMenu';

const TableColumns = () => [
  {
    title: 'Date',
    dataIndex: 'date',
    width: 90,
    hidden: false,
  },
  {
    title: 'Time',
    dataIndex: 'time',
    width: 60,
    hidden: false,
  },
  {
    title: 'Type',
    dataIndex: 'type',
    width: 120,
    hidden: false,
    render: (_, record) => (
      <Tag className="list-item-tag" color={setTagColor(record.type)}>
        {record.type
          .toUpperCase()
          .split('')
          .map(i => (i === '-' ? ' ' : i))
          .join('')}
      </Tag>
    ),
  },
  {
    title: 'Topic',
    dataIndex: 'topic',
    width: 500,
    hidden: false,
    ellipsis: true,
    render: (text, record) => {
      return <TopicButton text={text} id={record.id} />;
    },
  },
  {
    title: 'Link',
    width: 200,
    dataIndex: 'descriptionUrl',
    hidden: false,
    ellipsis: true,
    render: text => {
      return isLinkRegExp.test(text) ? (
        <a className="events-link" target="_blank" rel="noopener noreferrer" href={text}>
          Go to <RightOutlined />
        </a>
      ) : (
        <span>{text}</span>
      );
    },
  },
  {
    title: 'Organizer',
    dataIndex: 'organizer',
    width: 200,
    hidden: false,
    render: (_, record) => {
      return record.organizer ? (
        <div className="item-organizer">{GithubUserLink(record.organizer)}</div>
      ) : (
        ''
      );
    },
  },
  {
    title: 'Comment',
    dataIndex: 'comment',
    width: 200,
    hidden: false,
  },
  {
    title: <СolumnSelectionMenu />,
    key: 'operation',
    fixed: 'right',
    width: 80,
    hidden: true,
    render: (_, record) => (
      <div className="table-action-buttons">
        <EditEventButton id={record.id} />
        <RemoveEventButton id={record.id} />
      </div>
    ),
  },
];

export default TableColumns;
