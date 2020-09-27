import React, {Component} from 'react';
import ErrorIndicator from '../ErrorIndicator';

export default class ErrorBoundry extends Component {
  constructor() {
    super();
    this.state = {
      hasError: false,
      errorMessage: '',
    };
  }

  componentDidCatch(_, info) {
    this.setState({hasError: true, errorMessage: info.componentStack});
  }

  render() {
    const {hasError, errorMessage} = this.state;
    const {children} = this.props;
    if (hasError) {
      return <ErrorIndicator error={errorMessage} />;
    }

    return children;
  }
}
