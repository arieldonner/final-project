import React from 'react';
import Navbar from '../components/navbar';
import NotFound from '../components/not-found';
import { convertTime } from '../lib';

export default class Upcoming extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: new Date(), events: [], upcoming: [], loading: true, error: false };
  }

  componentDidMount() {
    fetch('/api/events', {
      headers: {
        'x-access-token': localStorage.getItem('jwt')
      }
    })
      .then(res => res.json())
      .then(res => {
        const upcomingArr = [];
        for (let i = 0; i < res.length; i++) {
          const oneDay = new Date(res[i].startDate.slice(0, 10));
          const converted = oneDay.toISOString();
          if (converted > this.state.value.toISOString()) {
            upcomingArr.push(res[i]);
          }
        }
        this.setState({ events: res, upcoming: upcomingArr, loading: false, error: false });
      })
      .catch(() => {
        this.setState({ error: true });
      });
  }

  render() {
    // console.log(this.state);
    return (
      <div>
        <Navbar />
        <div className="container-fluid">
          <h1 className="heading cookie">Upcoming Events</h1>
          <div className='d-flex align-items-center justify-content-center'>
            <a href='#'><i className="fa-solid fa-calendar-days" /></a>
            <a href='#create-event' className='btn btn-primary col-3 col-lg-1 offset-4 offset-md-1'>New+</a>
          </div>
          {this.state.error === true &&
            <NotFound />
          }
          {this.state.loading === true &&
            <div className='d-flex justify-content-center'>
              <div className="lds-default"><div /><div /><div /><div /><div /><div /><div /><div /><div /><div /><div /><div /></div>
            </div>
          }
          <div className='row justify-content-center'>
            {this.state.upcoming.map(event => (
              <a key={event.eventId} href={`#edit-event?eventId=${event.eventId}`} className='tile col-sm-12 col-md-11 col-lg-10 ps-4 mb-3 text-decoration-none tile-hover'>
                <div className='row align-items-center'>
                  <div className='col-8 col-lg-9'>
                    <h3 className='blue'>{event.eventName}</h3>
                    <p className='black'>Location: <span className='blue'>{event.locationName}</span></p>
                  </div>
                  <div className='col-4 col-md-3 text-end pe-4'>
                    <p className='mb-1 black'>{convertTime(event.startTime)}</p>
                    <p className='black'>{convertTime(event.endTime)}</p>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    );
  }
}
