import React from 'react';
import { AppContext } from '../lib';
import NotFound from './not-found';

export default class EventForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      eventName: '',
      startDate: '',
      startTime: '',
      endTime: '',
      locationName: '',
      show: false,
      loading: true,
      error: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleModal = this.handleModal.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    const { route } = this.context;
    if (route.path === 'edit-event') {
      fetch(`/api/event/${this.props.eventId}`, {
        headers: {
          'x-access-token': localStorage.getItem('jwt')
        }
      })
        .then(res => res.json())
        .then(event => this.setState({
          eventName: event.eventName,
          startDate: event.startDate.slice(0, 10),
          startTime: event.startTime,
          endTime: event.endTime,
          locationName: event.locationName,
          loading: false,
          error: false
        }))
        .catch(() => {
          this.setState({ error: true });
        });
    } else {
      this.setState({ loading: false });
    }
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { route } = this.context;
    if (route.path === 'create-event') {
      const req = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': localStorage.getItem('jwt')
        },
        body: JSON.stringify(this.state)
      };
      fetch('/api/create/event', req)
        .then(res => res.json())
        .then(result => {
          window.location.hash = '#';
        });
    } else if (route.path === 'edit-event') {
      const req = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': localStorage.getItem('jwt')
        },
        body: JSON.stringify(this.state)
      };
      fetch(`/api/edit/event/${this.props.eventId}`, req)
        .then(res => res.json())
        .then(res => {
          window.location.hash = '#';
        });
    }
  }

  handleModal(event) {
    event.preventDefault();
    this.setState({ isOpen: !this.state.isOpen });
  }

  handleDelete(event) {
    event.preventDefault();
    fetch(`/api/delete/event/${this.props.eventId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': localStorage.getItem('jwt')
      }
    })
      .then(res => {
        window.location.hash = '#';
      });
  }

  render() {

    const { handleChange, handleSubmit } = this;
    const { route } = this.context;
    return (
      <form className='container-fluid col-12 col-md-9 col-md-6 p-4 form-style' onSubmit={handleSubmit}>
        {this.state.error === true &&
          <NotFound />
        }
        {this.state.loading === true &&
          <div className='d-flex justify-content-center'>
            <div className="lds-default"><div /><div /><div /><div /><div /><div /><div /><div /><div /><div /><div /><div /></div>
          </div>
        }
        {this.state.isOpen === true &&
          <div className='my-modal'>
            <div className='my-modal-content'>
              <div className='my-modal-header'>
                <h4 className='my-modal-title'>Delete Event</h4>
              </div>
              <div className='my-modal-body'>
                Are you sure you want to delete this event? This process cannot be undone.
              </div>
              <div className='my-modal-footer d-flex justify-content-end gap-3'>
                <button className='btn btn-outline-secondary' onClick={this.handleModal}>Cancel</button>
                <button className='btn btn-danger' onClick={this.handleDelete}>Delete</button>
              </div>
            </div>
          </div>
        }
        <div className='d-flex justify-content-between align-items-center mb-3'>
          <a href='#' className='red fs-5 text-decoration-none'>Cancel</a>
          <button type='submit' className='blue btn btn-link text-decoration-none'><span className='fs-5'>Submit</span></button>
        </div>
        <div className='mb-4'>
          <label htmlFor='eventName' className='form-label'>Event Name:</label>
          <input
            required
            autoFocus
            id='eventName'
            type="text"
            name="eventName"
            value={this.state.eventName}
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
            value={this.state.startDate}
            onChange={handleChange}
            className="form-control" />
        </div>
        <div className='d-flex justify-content-between col-12'>
          <div className='mb-4 col-5'>
            <label htmlFor='startTime' className='form-label'>Start Time:</label>
            <input
              required
              id='startTime'
              type="time"
              name="startTime"
              value={this.state.startTime}
              onChange={handleChange}
              className="form-control" />
          </div>
          <div className='mb-4 col-5'>
            <label htmlFor='endTime' className='form-label'>End Time:</label>
            <input
              required
              id='endTime'
              type="time"
              name="endTime"
              value={this.state.endTime}
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
            value={this.state.locationName}
            onChange={handleChange}
            className="form-control" />
        </div>
        <div className='d-flex justify-content-center'>
          { route.path === 'edit-event' && <button onClick={this.handleModal} className='btn btn-outline-danger'>Delete Event</button> }
        </div>
      </form>
    );
  }
}

EventForm.contextType = AppContext;
