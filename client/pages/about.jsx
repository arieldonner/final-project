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
          <div className='container d-flex flex-column justify-content-center tile col-sm-12 col-md-8 col-lg-6 ps-4 pt-1 mb-3'>
            <div>
              <h2 className='blue pt-3 ps-lg-5 pe-lg-5 text-center about-heading'>Stay organized for your competition season!</h2>
              <hr />
            </div>
            <div className='d-flex align-items-center justify-content-between p-1 p-md-2 ps-lg-5 pe-lg-5 pt-lg-2 mb-lg-2'>
              <p className='col-9 col-md-8 col-lg-8 about-text'>Add skating competitions, practices, and events to your calendar.</p>
              <p className='btn btn-primary col-3 col-lg-2 no-pointer no-transition'>New+</p>
            </div>
            <div className='d-flex align-items-center justify-content-between p-1 p-md-2 ps-lg-5 pe-lg-5 pt-lg-2 mb-lg-2'>
              <div className='pe-5 ps-4 mb-4'>
                <i className="fa-regular fa-rectangle-list pe-4 no-pointer about-icons" />
                <i className="fa-solid fa-calendar-days no-pointer about-icons" />
              </div>
              <p className='col-7 col-md-8 col-lg-8 text-end about-text'>Click on the icons to toggle between calendar and list view.</p>
            </div>
            <div className='d-flex align-items-center justify-content-between ps-1 p-md-2 ps-lg-5 pe-lg-5 pt-lg-2 mb-lg-2 pb-3 pb-lg-0'>
              <p className='col-4 col-md-5 about-text'>Edit details by clicking on an event tile.</p>
              <div className='tile col-sm-12 col-md-8 col-lg-8 shrink'>
                <div className='row align-items-center justify-content-between'>
                  <div className='col-6 col-lg-6'>
                    <h3 className='blue'>Competition</h3>
                    <p className='black'>Location: <span className='blue'>Irvine</span></p>
                  </div>
                  <div className='col-6 col-md-4 text-end pt-4 pt-md-0'>
                    <p className='mb-1 black'>9:30 AM</p>
                    <p className='black'>10:30 AM</p>
                  </div>
                </div>
              </div>
            </div>
            <div className='d-flex align-items-center justify-content-between p-0 ps-lg-5 pe-lg-5 pt-lg-2 pb-md-2 pb-lg-0'>
              <div className='circle col-5'>
                <img src='https://litb-cgis.rightinthebox.com/images/384x500/202110/bps/product/inc/fqdfpu1635163742663.jpg' alt='Outft image' className='outfit-img' />
              </div>
              <p className='col-7 col-lg-8 pe-3 pe-lg-0 text-end about-text'>Save your outfits for each competition. View and edit details by clicking on an outfit tile.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
