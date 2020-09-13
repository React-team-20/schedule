import {Layout} from 'antd';
import React from 'react';
import {useSelector} from 'react-redux';
import Header from '../Header';
import Main from '../Main';
import Spinner from '../Spinner';
import './app.css';

const {Content} = Layout;

const App = () => {
  const loading = useSelector(state => state.app.loading);
  return (
    <Layout>
      {loading && <Spinner />}
      <Header />
      <Content>
        <Main />
      </Content>
    </Layout>
  );
};

export default App;
