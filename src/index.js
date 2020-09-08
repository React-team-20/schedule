import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {BrowserRouter as Router} from 'react-router-dom';
import 'antd/dist/antd.css';

import App from './components/App';
import ErrorBoundry from './components/ErrorBoundry';
import {ScheduleServiceProvider} from './components/ScheduleServiceContext';
import ScheduleService from './services/schedule-service';
import store from './store';

const scheduleService = new ScheduleService();

ReactDOM.render(
  <Provider store={store}>
    <ErrorBoundry>
      <ScheduleServiceProvider value={scheduleService}>
        <Router>
          <App />
        </Router>
      </ScheduleServiceProvider>
    </ErrorBoundry>
  </Provider>,
  document.getElementById('root')
);
