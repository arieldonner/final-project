import React from 'react';

export default class Modal extends React.Component {
  render() {
    return (
      <div className='my-modal'>
        <div className='my-modal-content'>
          <div className='my-modal-header'>
            <h4 className='my-modal-title'>Delete Event</h4>
          </div>
          <div className='my-modal-body'>
            Are you sure you want to delete this event? This process cannot be undone.
          </div>
          <div className='my-modal-footer d-flex justify-content-end gap-3'>
            <button className='btn btn-outline-secondary'>Cancel</button>
            <button className='btn btn-danger'>Delete</button>
          </div>
        </div>
      </div>
    );
  }
}
