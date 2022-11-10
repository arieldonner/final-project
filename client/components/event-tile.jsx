import React from 'react';

export default class EventTile extends React.Component {
  constructor(props) {
    super(props);
    this.state = { event: null };
  }

  componentDidMount() {
    fetch(`/api/events/${this.props.eventId}`)
      .then(res => res.json())
      .then(event => this.setState({ event }));
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
              <p className='mb-1'>{startTime}</p>
              <p>{endTime}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
