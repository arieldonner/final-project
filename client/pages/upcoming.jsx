import React from 'react';
import Navbar from '../components/navbar';
// import EventTile from '../components/event-tile';
import NotFound from '../components/not-found';

export default class Upcoming extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: new Date(), events: [], loading: true, error: false };
  }

  componentDidMount() {
    fetch('/api/events', {
      headers: {
        'x-access-token': localStorage.getItem('jwt')
      }
    })
      .then(res => res.json())
      .then(res => {
        this.setState({ events: res, loading: false, error: false });
      })
      .catch(() => {
        this.setState({ error: true });
      });
  }

  render() {
    // console.log(this.state);
    for (let i = 0; i < this.state.events.length; i++) {
      const oneDay = new Date(this.state.events[i].startDate.slice(0, 10));
      if (oneDay > this.state.value) {
        // console.log(oneDay);
      }
    }
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

        </div>
      </div>
    );
  }
}
