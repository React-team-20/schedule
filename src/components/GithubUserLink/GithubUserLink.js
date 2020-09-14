  
import React from 'react';
import {Avatar} from 'antd';
import {GithubFilled} from '@ant-design/icons';

const GithubUserLink = (item) => {
  const organizerLink = 'https://github.com/yuliaHope';

  return (
    <div className="item-organizer">
      <span className="item-organizer-label">organizer:</span>
      <a target="_blank" className="link-user-profile" href={organizerLink}>
        <Avatar src="https://avatars1.githubusercontent.com/u/14111020?v=4" />
        <span className="link-user-name">
          {item}
          <GithubFilled className="link-github-label"/>
        </span>
      </a>
    </div>
  )
}

export default GithubUserLink;