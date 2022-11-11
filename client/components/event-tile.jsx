import React from 'react';
import { convertTime } from '../lib';

export default class EventTile extends React.Component {
  constructor(props) {
    super(props);
    this.state = { event: null };
  }

  componentDidMount() {
    const currentSelect = this.props.value.toISOString().split('T')[0] + 'T00:00:00Z';
    fetch(`/api/events/${currentSelect}`)
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
      fetch(`/api/events/${currentSelect}`)
        .then(res => res.json())
        .then(res => {
          if (!Response.ok) {
            this.setState({ event: null });
          }
          this.setState({ event: res });
        });
    }
  }

  render() {
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
    const {
      eventName, startTime, endTime, locationName
    } = this.state.event;
    return (
      <div className='row justify-content-center'>
        <div className='tile col col-md-10 ps-4 mb-3'>
          <div className='row align-items-center'>
            <div className='col-8 col-md-9'>
              <h3 className='blue'>{eventName}</h3>
              <p>Location: <span className='blue'>{locationName}</span></p>
            </div>
            <div className='col-4 col-md-3 text-end pe-4'>
              <p className='mb-1'>{convertTime(startTime)}</p>
              <p>{convertTime(endTime)}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
