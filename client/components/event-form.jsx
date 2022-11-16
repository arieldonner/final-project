import React from 'react';

export default class EventForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      eventName: '',
      startDate: '',
      startTime: '',
      endTime: '',
      locationName: null,
      outfit: null
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  render() {
    const { handleChange, handleSubmit } = this;
    return (
      <form className='container-fluid col-12 col-md-6 p-3 form-style' onSubmit={handleSubmit}>
        <div className='d-flex justify-content-between'>
          <p className='red'>Cancel</p>
          <p className='blue'>Submit</p>
        </div>
        <div className='mb-4'>
          <label htmlFor='eventName' className='form-label'>Event Name:</label>
          <input
            required
            autoFocus
            id='eventName'
            type="text"
            name="eventName"
            onChange={handleChange}
            className="form-control" />
        </div>
        <div className='mb-4'>
          <label htmlFor='startDate' className='form-label'>Start Date:</label>
          <input
            required
            id='startDate'
            type="date"
            name="startDate"
            min="1960-01-01"
            onChange={handleChange}
            className="form-control" />
        </div>
        <div className='d-flex justify-content-between col-12'>
          <div className='mb-4 col-6'>
            <label htmlFor='startTime' className='form-label'>Start Time:</label>
            <input
              required
              id='startTime'
              type="time"
              name="startTime"
              onChange={handleChange}
              className="form-control" />
          </div>
          <div className='mb-4 col-6'>
            <label htmlFor='endTime' className='form-label'>End Time:</label>
            <input
              required
              id='endTime'
              type="time"
              name="endTime"
              onChange={handleChange}
              className="form-control" />
          </div>
        </div>
        <div className='mb-4'>
          <label htmlFor='locationName' className='form-label'>Location:</label>
          <input
            id='locationName'
            type="text"
            name="locationName"
            onChange={handleChange}
            className="form-control" />
        </div>
      </form>
    );
  }
}
