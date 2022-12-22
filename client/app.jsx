import React from 'react';
import jwtDecode from 'jwt-decode';
import Home from './pages/home';
import AuthPage from './pages/auth';
import CreateEventPage from './pages/create-event';
import EditEventPage from './pages/edit-event';
import Outfits from './pages/outfits';
import CreateOutfitPage from './pages/create-outfit';
import OutfitDetails from './components/outfit-details';
import EditOutfitPage from './pages/edit-outfit';
import NotFound from './components/not-found';
import About from './pages/about';
import { parseRoute, AppContext } from './lib';

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
    const token = window.localStorage.getItem('jwt');
    const user = token ? jwtDecode(token) : null;
    this.setState({ user, isAuthorizing: false });
  }

  handleSignIn(result) {
    const { user, token } = result;
    window.localStorage.setItem('jwt', token);
    this.setState({ user });
  }

  handleSignOut() {
    window.localStorage.removeItem('jwt');
    this.setState({ user: null });
  }

  renderPage() {
    const { path } = this.state.route;
    if (path === '') {
      return <Home />;
    }
    if (path === 'sign-in' || path === 'sign-up') {
      return <AuthPage />;
    }
    if (path === 'create-event') {
      return <CreateEventPage />;
    }
    if (path === 'edit-event') {
      const queryString = window.location.hash.slice(11);
      const params = new URLSearchParams(queryString);
      const eventId = params.get('eventId');
      return <EditEventPage eventId={eventId} />;
    }
    if (path === 'outfits') {
      return <Outfits />;
    }
    if (path === 'create-outfit') {
      return <CreateOutfitPage />;
    }
    if (path === 'outfit-details') {
      const queryString = window.location.hash.slice(16);
      const params = new URLSearchParams(queryString);
      const outfitId = params.get('outfitId');
      return <OutfitDetails outfitId={outfitId}/>;
    }
    if (path === 'edit-outfit') {
      const queryString = window.location.hash.slice(13);
      const params = new URLSearchParams(queryString);
      const outfitId = params.get('outfitId');
      return <EditOutfitPage outfitId={outfitId} />;
    }
    if (path === 'about') {
      return <About />;
    }
    return <NotFound />;
  }

  render() {
    if (this.state.isAuthorizing) return null;
    const { user, route } = this.state;
    const { handleSignIn, handleSignOut } = this;
    const contextValue = { user, route, handleSignIn, handleSignOut };
    return (
      <AppContext.Provider value={contextValue}>
        {this.renderPage()}
      </AppContext.Provider>
    );
  }
}

App.contextType = AppContext;
