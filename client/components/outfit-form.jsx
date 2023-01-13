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
      star: false,
      isOpen: false,
      flag: false,
      loading: true,
      error: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleModal = this.handleModal.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.fileInputRef = React.createRef();
  }

  componentDidMount() {
    const { route } = this.context;
    if (route.path === 'edit-outfit') {
      fetch(`/api/outfit/${this.props.outfitId}`, {
        headers: {
          'x-access-token': localStorage.getItem('jwt')
        }
      })
        .then(res => res.json())
        .then(outfit => {
          this.setState({
            outfitName: outfit.outfitName,
            outfitImg: outfit.outfitImg,
            category: outfit.category,
            bottoms: outfit.bottoms,
            makeup: outfit.makeup,
            star: outfit.star,
            loading: false,
            error: false
          });
        })
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
    if (name === 'image') {
      this.setState({ flag: true });
    }
    if (name === 'star') {
      this.setState({ star: !this.state.star });
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    const { route } = this.context;

    const formData = new FormData();
    formData.append('outfitName', this.state.outfitName);
    formData.append('category', this.state.category);
    formData.append('bottoms', this.state.bottoms);
    formData.append('makeup', this.state.makeup);
    formData.append('star', this.state.star);
    formData.append('flag', this.state.flag);
    if (this.fileInputRef.current.files[0] === undefined) {
      formData.append('outfitImg', this.state.outfitImg);
    } else {
      formData.append('image', this.fileInputRef.current.files[0]);
    }

    if (route.path === 'create-outfit') {
      const req = {
        method: 'POST',
        headers: {
          'x-access-token': localStorage.getItem('jwt')
        },
        body: formData
      };
      fetch('/api/create/outfit', req)
        .then(res => res.json())
        .then(result => {
          window.location.hash = '#outfits';
        });
    } else if (route.path === 'edit-outfit') {
      const req = {
        method: 'PUT',
        headers: {
          'x-access-token': localStorage.getItem('jwt')
        },
        body: formData
      };
      const outfitId = this.props.outfitId;
      fetch(`/api/edit/outfit/${outfitId}`, req)
        .then(res => res.json())
        .then(result => {
          window.location.hash = '#outfits';
        });
    }

  }

  handleModal(event) {
    event.preventDefault();
    this.setState({ isOpen: !this.state.isOpen });
  }

  handleDelete(event) {
    event.preventDefault();
    fetch(`/api/delete/outfit/${this.props.outfitId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': localStorage.getItem('jwt')
      }
    })
      .then(res => {
        window.location.hash = '#outfits';
      });
  }

  render() {
    const { handleChange, handleSubmit } = this;
    const { route } = this.context;
    return (
      <form className='container-fluid col-12 col-md-9 col-lg-6 p-4 form-style' onSubmit={handleSubmit}>
        {this.state.isOpen === true &&
          <div className='my-modal'>
            <div className='my-modal-content'>
              <div className='my-modal-header'>
                <h4 className='my-modal-title'>Delete Event</h4>
              </div>
              <div className='my-modal-body'>
                Are you sure you want to delete this outfit? This process cannot be undone.
              </div>
              <div className='my-modal-footer d-flex justify-content-end gap-3'>
                <button className='btn btn-outline-secondary' onClick={this.handleModal}>Cancel</button>
                <button className='btn btn-danger' onClick={this.handleDelete}>Delete</button>
              </div>
            </div>
          </div>
        }
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
            id='outfitImg'
            type="file"
            name="image"
            ref={this.fileInputRef}
            accept=".png, .jpg, .jpeg"
            onChange={handleChange} />
          {route.path === 'edit-outfit' &&
            <div className='mt-2'><a href={this.state.outfitImg} target="_blank" rel="noreferrer">Click here to see current file.</a></div>
            }
        </div>
        <div className='mb-4'>
          <p>Category:</p>
          <div>
            <input
              required
              id='Synchro'
              type="radio"
              name="category"
              value="Synchro"
              checked={this.state.category === 'Synchro'}
              onChange={handleChange} />
            <label htmlFor='Synchro' className='pe-3 pe-m-5 ms-m-1'>Synchro</label>
            <input
              id='Single'
              type="radio"
              name="category"
              value="Single"
              checked={this.state.category === 'Single'}
              onChange={handleChange} />
            <label htmlFor='Single' className='pe-3 pe-m-5 ms-m-1'>Single</label>
            <input
              id='Dance'
              type="radio"
              name="category"
              value="Dance"
              checked={this.state.category === 'Dance'}
              onChange={handleChange} />
            <label htmlFor='Dance' className='pe-3 pe-m-5 ms-m-1'>Dance</label>
            <input
              id='Pairs'
              type="radio"
              name="category"
              value="Pairs"
              checked={this.state.category === 'Pairs'}
              onChange={handleChange} />
            <label htmlFor='Pairs' className='ms-m-1'>Pairs</label>
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
        <div className='mb-4'>
          <input type="checkbox" id="star" name="star" value={true} checked={this.state.star} onChange={handleChange} className='me-2'/>
          <label htmlFor="star">Favorite this outfit</label>
        </div>
        <div className='d-flex justify-content-center'>
          {route.path === 'edit-outfit' && <button onClick={this.handleModal} className='btn btn-outline-danger'>Delete Outfit</button>}
        </div>
      </form>
    );
  }
}

OutfitForm.contextType = AppContext;
