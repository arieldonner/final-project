import React from 'react';
import Navbar from '../components/navbar';
import NotFound from '../components/not-found';
import EventTile from '../components/event-tile';
// import { convertTime } from '../lib';

export default class Upcoming extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: new Date(), events: [], upcoming: [], dates: [], loading: true, error: false };
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
        const dates = [];
        for (let i = 0; i < res.length; i++) {
          const oneDay = new Date(res[i].startDate.slice(0, 10));
          const converted = oneDay.toISOString();
          if (converted > this.state.value.toISOString()) {
            upcomingArr.push(res[i]);
            dates.push(res[i].startDate);
          }
        }
        const unique = dates.filter((v, i, a) => a.indexOf(v) === i);
        // console.log(unique);
        const copy = upcomingArr.map(obj => {
          return { ...obj, startDate: new Date(obj.startDate) };
        });
        const sorted = copy.sort(
          (objA, objB) => Number(objA.startDate) - Number(objB.startDate)
        );
        const fixed = sorted.map(obj => {
          return { ...obj, startDate: obj.startDate.toISOString() };
        });
        this.setState({ events: res, upcoming: fixed, dates: unique, loading: false, error: false });
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
          <div className='d-flex flex-column align-items-center justify-content-center'>
            {this.state.dates.map((event, index) => (
              <div key={index} className='col-sm-12 col-md-6 order-sm-2 order-md-1'>
                <h1 className='text-center'>{event.slice(0, 10)}</h1>
                <EventTile value={new Date(event)}/>
              </div>
            ))}
            {/* {this.state.upcoming.map(event => (
              <div key={event.eventId} className='col-12 d-flex flex-column align-items-center'>
                <h3>{event.startDate}</h3>
                <a href={`#edit-event?eventId=${event.eventId}`} className='tile col-sm-12 col-md-10 col-lg-4 ps-4 mb-3 text-decoration-none tile-hover'>
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
              </div>
            ))} */}
          </div>
        </div>
      </div>
    );
  }
}
