import React from 'react';
import { AppContext } from '../lib';

export default class OutfitForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      outfit: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleModal = this.handleModal.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {

  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSubmit(event) {

  }

  handleModal(event) {

  }

  handleDelete(event) {

  }

  render() {
    const { handleChange, handleSubmit } = this;
    // const { route } = this.context;
    return (
      <form className='container-fluid col-12 col-md-6 p-4 form-style' onSubmit={handleSubmit}>
        {/* {this.state.isOpen === true &&
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
        } */}
        <div className='d-flex justify-content-between align-items-center mb-3'>
          <a href='#' className='red fs-5 text-decoration-none'>Cancel</a>
          <button type='submit' className='blue btn btn-link text-decoration-none'><span className='fs-5'>Submit</span></button>
        </div>
        <div className='mb-4'>
          <label htmlFor='dressName' className='form-label'>Dress Name:</label>
          <input
            required
            autoFocus
            id='dressName'
            type="text"
            name="dressName"
            value={this.state.dressName}
            onChange={handleChange}
            className="form-control" />
        </div>
        <div className='mb-4'>
          <label htmlFor='category' className='form-label'>Category:</label>
          <input
            id='Synchro'
            type="radio"
            name="category"
            value={this.state.category}
            onChange={handleChange} />
          <label htmlFor='Synchro'>Synchro</label>
        </div>
        <div className='mb-4'>
          <label htmlFor='bottoms' className='form-label'>Bottoms:</label>
          <input
            id='bottoms'
            type="text"
            name="bottoms"
            value={this.state.bottoms}
            onChange={handleChange}
            className="form-control" />
        </div>
        <div className='mb-4'>
          <label htmlFor='extras' className='form-label'>Extras:</label>
          <textarea
            id='extras'
            type="text"
            name="extras"
            value={this.state.extras}
            onChange={handleChange}
            className="form-control" />
        </div>
        {/* <div className='d-flex justify-content-center'>
          {route.path === 'edit-event' && <button onClick={this.handleModal} className='btn btn-outline-danger'>Delete Event</button>}
        </div> */}
      </form>
    );
  }
}

OutfitForm.contextType = AppContext;
