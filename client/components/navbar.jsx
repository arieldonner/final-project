import React from 'react';

export default class Navbar extends React.Component {
  render() {
    return (
      <nav className='light-blue container-fluid nav-container'>
        <div className='p-1 white row align-items-center'>
          <div className='col-1 cookie brand'>IceTime</div>
          <div className='col-1'>Events</div>
          <div className='col-1'>Outfits</div>
          <div className='col-1'>About</div>
        </div>
      </nav>
    );
  }
}
