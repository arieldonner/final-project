import React from 'react';
import Navbar from '../components/navbar';

export default class Upcoming extends React.Component {
  render() {
    return (
      <div>
        <Navbar />
        <div className="container-fluid">
          <h1 className="heading cookie">Upcoming Events</h1>
          <div className='d-flex align-items-center justify-content-center'>
            <a href='#'><i className="fa-solid fa-calendar-days" /></a>
            <a href='#create-event' className='btn btn-primary col-3 col-lg-2 offset-4 offset-md-1'>New+</a>
          </div>
        </div>
      </div>
    );
  }
}
