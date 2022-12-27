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
          <div className='container d-flex flex-column justify-content-center tile col-sm-12 col-md-10 col-lg-6 ps-4 pt-3 mb-3'>
            <div>
              <h3 className='blue pt-3'>Stay organized this competition season!</h3>
              <hr />
            </div>
            <div className='d-flex align-items-center justify-content-between p-3'>
              <p className='col-5'>Add skating competitions, practices, and events to your calendar.</p>
              <p className='btn btn-primary col-3 col-lg-2 offset-4 offset-md-1'>New+</p>
            </div>
            <div className='d-flex align-items-center justify-content-between p-3'>
              <div className='pe-5 ps-4 mb-4'>
                <i className="fa-regular fa-rectangle-list pe-4" />
                <i className="fa-solid fa-calendar-days" />
              </div>
              <p className='col-5 text-end'>Click on the icons to toggle between calendar and list view.</p>
            </div>
            <div className='d-flex align-items-center justify-content-between p-3'>
              <p className='col-5'>Edit details by clicking on an event tile.</p>
              <div className='tile col-sm-12 col-md-11 col-lg-7 ps-4 shrink ms-4'>
                <div className='row align-items-center justify-content-between'>
                  <div className='col-8 col-lg-6'>
                    <h3 className='blue'>Competition</h3>
                    <p className='black'>Location: <span className='blue'>Irvine</span></p>
                  </div>
                  <div className='col-4 col-md-4 text-end'>
                    <p className='mb-1 black'>9:30 AM</p>
                    <p className='black'>10:30 AM</p>
                  </div>
                </div>
              </div>
            </div>
            <div className='d-flex align-items-center justify-content-between p-3'>
              <div className='circle'>
                <img src='https://litb-cgis.rightinthebox.com/images/384x500/202110/bps/product/inc/fqdfpu1635163742663.jpg' alt='Outft image' className='outfit-img' />
              </div>
              <p className='col-5 text-end'>Save your outfits for each competition. View and edit details by clicking on an outfit tile.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
