import React from 'react';
import Navbar from '../components/navbar';

export default class Upcoming extends React.Component {
  render() {
    return (
      <div>
        <Navbar />
        <div className="container-fluid">
          <h1 className="heading cookie">Upcoming Events</h1>
        </div>
      </div>
    );
  }
}
