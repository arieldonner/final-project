import React from 'react';
import { convertTime, AppContext } from '../lib';

export default class EventTile extends React.Component {
  constructor(props) {
    super(props);
    this.state = { event: null };
    // this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    const currentSelect = this.props.value.toISOString().split('T')[0] + 'T00:00:00Z';
    fetch(`/api/events/${currentSelect}`, {
      headers: {
        'x-access-token': localStorage.getItem('jwt')
      }
    })
      .then(res => res.json())
      .then(res => {
        if (!Response.ok) {
          this.setState({ event: null });
        }
        this.setState({ event: res });
      });
  }

  componentDidUpdate(prevProps) {
    if (this.props.value !== prevProps.value) {
      const currentSelect = this.props.value.toISOString().split('T')[0] + 'T00:00:00Z';
      fetch(`/api/events/${currentSelect}`, {
        headers: {
          'x-access-token': localStorage.getItem('jwt')
        }
      })
        .then(res => res.json())
        .then(res => {
          if (!Response.ok) {
            this.setState({ event: null });
          }
          this.setState({ event: res });
        });
    }
  }

  // handleClick(event) {
  //   console.log(event.target.key);
  //   console.log(this.state.event[0].eventId);
  //   window.location.hash = 'edit-event';
  // }

  render() {
    // const { handleClick } = this;
    if (!this.state.event) {
      return (
        <div className='row justify-content-center'>
          <div className='tile col col-md-10 ps-4'>
            <div className='row text-center'>
              <h3>No Events</h3>
            </div>
          </div>
        </div>
      );
    }
    return (
      <div className='row justify-content-center'>
        {this.state.event.map(event => (
          <a key={event.eventId} href={`#edit-event?eventId=${event.eventId}`} className='tile col-sm-12 col-md-10 ps-4 mb-3 text-decoration-none'>
            <div className='row align-items-center'>
              <div className='col-8 col-md-9'>
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
    );
  }
}

EventTile.contextType = AppContext;
