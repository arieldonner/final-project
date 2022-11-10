import React from 'react';
import Calendar from 'react-calendar/dist/cjs/Calendar';
import 'react-calendar/dist/Calendar.css';
// import EventTile from './event-tile';

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
        // console.log(res);
        this.setState({ events: res });
        // console.log(res[0].startDate.slice(0, 10));
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
            {/* dummy data below */}
            <div className='col-sm-12 col-md-6 order-sm-2 order-md-1'>
              <h2 className='date mb-3'>{this.state.value.toDateString()}</h2>
              <div className='row justify-content-center'>
                <div className='tile col col-md-10 ps-4 mb-3'>
                  <div className='row align-items-center'>
                    <div className='col-8 col-md-9'>
                      <h3 className='blue'>Competition</h3>
                      <p>Location: <span className='blue'>Irvine</span></p>
                    </div>
                    <div className='col-4 col-md-3 text-end pe-4'>
                      <p className='mb-1'>9:30 AM</p>
                      <p>10:30 AM</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
