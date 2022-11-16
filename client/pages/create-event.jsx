import React from 'react';
import Navbar from '../components/navbar';
import EventForm from '../components/event-form';

export default class CreateEventPage extends React.Component {
  render() {
    return (
      <div>
        <Navbar />
        <div className="container-fluid">
          <h1 className="heading cookie">Create Event</h1>
          <EventForm />
        </div>
      </div>
    );
  }
}
