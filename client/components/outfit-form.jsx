import React from 'react';
import { AppContext } from '../lib';

export default class OutfitForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      outfitName: '',
      outfitImg: '',
      category: '',
      bottoms: '',
      makeup: '',
      show: false
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
    event.preventDefault();
    const { route } = this.context;
    if (route.path === 'create-outfit') {
      const req = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': localStorage.getItem('jwt')
        },
        body: JSON.stringify(this.state)
      };
      fetch('/api/create/outfit', req)
        .then(res => res.json())
        .then(result => {
          window.location.hash = '#outfits';
        });
    }

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
          <a href='#outfits' className='red fs-5 text-decoration-none'>Cancel</a>
          <button type='submit' className='blue btn btn-link text-decoration-none'><span className='fs-5'>Submit</span></button>
        </div>
        <div className='mb-4'>
          <label htmlFor='outfitName' className='form-label'>Dress Name:</label>
          <input
            required
            autoFocus
            id='outfitName'
            type="text"
            name="outfitName"
            value={this.state.outfitName}
            onChange={handleChange}
            className="form-control" />
        </div>
        <div className='mb-4'>
          <p>Dress Picture:</p>
          <input
            required
            id='outfitImg'
            type="file"
            name="outfitImg"
            accept=".png, .jpg, .jpeg"
            value={this.state.outfitImg}
            onChange={handleChange} />
        </div>
        <div className='mb-4'>
          <p>Category:</p>
          <div>
            <input
              required
              id='Synchro'
              type="radio"
              name="category"
              value={this.state.category}
              onChange={handleChange} />
            <label htmlFor='Synchro' className='pe-3 pe-m-5'>Synchro</label>
            <input
              id='Singles'
              type="radio"
              name="category"
              value={this.state.category}
              onChange={handleChange} />
            <label htmlFor='Singles' className='pe-3 pe-m-5'>Singles</label>
            <input
              id='Dance'
              type="radio"
              name="category"
              value={this.state.category}
              onChange={handleChange} />
            <label htmlFor='Dance' className='pe-3 pe-m-5'>Dance</label>
            <input
              id='Pairs'
              type="radio"
              name="category"
              value={this.state.category}
              onChange={handleChange} />
            <label htmlFor='Pairs'>Pairs</label>
          </div>
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
          <label htmlFor='makeup' className='form-label'>Makeup:</label>
          <textarea
            id='makeup'
            type="text"
            name="makeup"
            value={this.state.makeup}
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
