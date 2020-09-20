import React from 'react';
import './error-indicator.css';

const ErrorIndicator = ({error}) => {
  return (
    <main className="main-error">
      <header>
        <h1 className="emotion">:(</h1>
      </header>
      <p className="description-error">Our app ran into a problem and needs to restart.</p>
      <footer className="footer-error">
        <p>
          <small>
            If you would like to know more, you can search here:
            <span>&nbsp;{error}</span>
          </small>
        </p>
      </footer>
    </main>
  );
};

export default ErrorIndicator;
