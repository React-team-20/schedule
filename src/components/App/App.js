import React from 'react';
import {useSelector} from 'react-redux';
import Header from '../Header';
import Main from '../Main';
import Spinner from '../Spinner';
import './app.css';

const App = () => {
  const loading = useSelector(state => state.app.loading);
  return (
    <>
      {loading && <Spinner />}
      <Header />
      <Main />
    </>
  );
};

export default App;
