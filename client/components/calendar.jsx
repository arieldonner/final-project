import React from 'react';
import Calendar from 'react-calendar/dist/cjs/Calendar';
import 'react-calendar/dist/Calendar.css';
import EventTile from './event-tile';

export default class CalendarPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: new Date(), events: [] };
    this.onChange = this.onChange.bind(this);
  }

  onChange(date) {
    this.setState({ value: date });
  }

  componentDidMount() {
    fetch('/api/events')
      .then(res => res.json())
      .then(res => {
        this.setState({ events: res });
      });
  }

  render() {
    return (
      <div className='container-fluid'>
        <h1 className='heading cookie'>Events</h1>
        <div className='container'>
          <div className='row'>
            <div className='col-sm-12 col-md-6 order-sm-1 order-md-2'>
              <div className='row align-items-center justify-content-center mb-3 ms-md-5 ps-3 ps-md-0'>
                <i className="fa-regular fa-rectangle-list col-3" />
                <button type='button' className='btn btn-primary col-3 col-md-2 offset-4 offset-md-1'>New+</button>
              </div>
              <div className='row justify-content-center'>
                <Calendar onChange={this.onChange} value={this.state.value}
                tileClassName={({ date }) => {
                  let day = date.getDate();
                  let month = date.getMonth() + 1;
                  if (date.getMonth() < 10) {
                    month = '0' + month;
                  }
                  if (date.getDate() < 10) {
                    day = '0' + day;
                  }
                  const realDate = date.getFullYear() + '-' + month + '-' + day;
                  for (let i = 0; i < this.state.events.length; i++) {
                    const fixedDate = this.state.events[i].startDate.slice(0, 10);
                    if (realDate === fixedDate) {
                      return 'highlight';
                    }
                  }
                }}
                />
              </div>
            </div>
            <div className='col-sm-12 col-md-6 order-sm-2 order-md-1'>
              <h2 className='date mb-3'>{this.state.value.toDateString()}</h2>
              <EventTile value={this.state.value} events={this.state.events} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
