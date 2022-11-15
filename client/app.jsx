import React from 'react';
import Home from './pages/home';
import AuthPage from './pages/auth';
import { parseRoute } from './lib';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      isAuthorizing: true,
      route: parseRoute(window.location.hash)
    };
    this.handleSignIn = this.handleSignIn.bind(this);
    this.handleSignOut = this.handleSignOut.bind(this);
  }

  componentDidMount() {
    window.addEventListener('hashchange', () => {
      this.setState({ route: parseRoute(window.location.hash) });
    });
    // const token = window.localStorage.getItem('');
  }

  renderPage() {
    const { path } = this.state.route;
    if (path === '') {
      return <Home />;
    }
    if (path === 'sign-in' || path === 'sign-up') {
      return <AuthPage />;
    }
    // if (route.path === 'outfits') {

    // }
    // if (route.path === 'about') {

    // }
    // if (route.path === 'register') {

    // }
    // return <NotFound />
  }

  render() {
    return <Home />;
  }
}
