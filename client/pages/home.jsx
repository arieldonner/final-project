import React from 'react';
import Navbar from '../components/navbar';
import CalendarPage from '../components/calendar';
import Redirect from '../components/redirect';
import { AppContext } from '../lib';

export default class Home extends React.Component {
  render() {
    if (!this.context.user) return <Redirect to="sign-in" />;

    return (
      <div>
        <Navbar />
        <CalendarPage />
      </div>
    );
  }
}

Home.contextType = AppContext;
