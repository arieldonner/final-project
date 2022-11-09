import React, { useState } from 'react';
import Calendar from 'react-calendar/dist/cjs/Calendar';
import 'react-calendar/dist/Calendar.css';

export default function CalendarPage(props) {
  const [value, onChange] = useState(new Date());

  return (
    <div className='container-fluid'>
      <h1 className='heading cookie'>Events</h1>
      <div className='container'>
        <div className='row'>
          <div className='col'>
            <h2 className='date'>{value.toDateString()}</h2>
          </div>
          <div className='col'>
            {/* <i className="fa-regular fa-rectangle-list" /> */}
            <Calendar onChange={onChange} value={value} />
          </div>
        </div>
      </div>
    </div>
  );
}
