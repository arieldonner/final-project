import React from 'react';
import Navbar from '../components/navbar';

export default class About extends React.Component {
  render() {
    return (
      <div>
        <Navbar />
        <div className="container-fluid">
          <div className='d-flex justify-content-center align-items-center col-12'>
            <h1 className='heading cookie'>About</h1>
          </div>
          <div className='container d-flex flex-column justify-content-center tile col-sm-12 col-md-10 col-lg-7 ps-4 pt-3 mb-3'>
            <div>
              <h3 className='blue'>Stay organized this competition season!</h3>
            </div>
            <div>
              <p>Add skating competitions, practices, and events to your calendar.</p>
            </div>
            <div>
              <p>Click on the icons to toggle between calendar and list view.</p>
            </div>
            <div>
              <p>Edit details by clicking on an event tile.</p>
            </div>
            <div>
              <p>Save your outfits for each competition. View and edit details by clicking on an outfit tile.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
