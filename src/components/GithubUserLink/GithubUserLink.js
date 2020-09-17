  
import React from 'react';
import {Avatar} from 'antd';
import {GithubFilled} from '@ant-design/icons';

const  GithubUserLink = (organizer) => {
  return (
    <a target="_blank" className="link-user-profile" href={organizer.htmlUrl}>
      <Avatar src={organizer.avatar} />
      <span className="link-user-name">
        {organizer.name}
        <GithubFilled className="link-github-label"/>
      </span>
    </a>
  )
}

export default GithubUserLink;