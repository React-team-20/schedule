import React from 'react';
import HeaderTitle from './HeaderTitle';
import HeaderToolsPanel from './HeaderToolsPanel';

import './header.css';

const Header = () => {
  return (
    <nav className="header">
      <HeaderTitle />
      <HeaderToolsPanel />
    </nav>
  );
};

export default Header;
