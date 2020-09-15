  
import React from 'react';
import {Avatar} from 'antd';
import {GithubFilled} from '@ant-design/icons';
import axios from 'axios';

class GithubUserLink extends React.Component {
  state = {
    name: null,
    avatarUrl: null,
    profileUrl: null
  };

  componentDidMount() {
    axios.get(`https://api.github.com/users/${this.props.user}`)
      .then(res => {
        const data = res.data;
        const url = data.html_url;
        const avatarUrl = data.avatar_url;
        const {name} = data;
        this.setState({avatarUrl: avatarUrl, name: name, profileUrl: url});
      })
      .catch(error => {
        // handle error
        console.log(error);
      })   
  }   

  render() {
    const {name, avatarUrl, profileUrl} = this.state;

    return (
      <a target="_blank" className="link-user-profile" href={profileUrl}>
        <Avatar src={avatarUrl} />
        <span className="link-user-name">
          {name ? name : ''}
          <GithubFilled className="link-github-label"/>
        </span>
      </a>
    )
  }
}

export default GithubUserLink;