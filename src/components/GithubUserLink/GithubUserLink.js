import {GithubFilled} from '@ant-design/icons';
import {Avatar} from 'antd';
import React from 'react';

const GithubUserLink = organizer => {
  return (
    <a
      target="_blank"
      rel="noopener noreferrer"
      className="link-user-profile"
      href={organizer.htmlUrl}
    >
      <Avatar src={organizer.avatar} />
      <span className="link-user-name">
        {organizer.name}
        <GithubFilled className="link-github-label" />
      </span>
    </a>
  );
};

export default GithubUserLink;
