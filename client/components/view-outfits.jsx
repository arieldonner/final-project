import React from 'react';

export default class ViewOutfits extends React.Component {
  constructor(props) {
    super(props);
    this.state = { outfits: null };
  }

  componentDidMount() {
    fetch('/api/outfits', {
      headers: {
        'x-access-token': localStorage.getItem('jwt')
      }
    })
      .then(res => res.json())
      .then(res => {
        this.setState({ outfits: res });
      });
  }

  render() {
    if (!this.state.outfits) {
      return (
        <div className='container'>
          <div className='row justify-content-center'>
            <div className='tile col-sm-12 col-md-6 d-flex gap-4 ps-4 pt-2 pb-2'>
              <div className='circle'>
                <i className="fa-regular fa-face-disappointed" />
              </div>
              <div className='d-flex flex-column justify-content-center'>
                <h2 className='blue pb-2'>No outfits</h2>
              </div>
            </div>
          </div>
        </div>
      );
    }
    return (
      <div className="container-fluid">
        <div className='d-flex justify-content-center align-items-center col-12'>
          <h1 className='col-8 col-md-4 ps-5 heading cookie'>Outfits</h1>
          <a href='#create-outfit' className='btn btn-primary button-position'>New+</a>
        </div>
        <div className='container'>
          {this.state.outfits.map(event => (
            <div key={event.outfitId} className='row justify-content-center'>
              <div className='tile col-sm-12 col-md-6 d-flex gap-4 ps-4 pt-2 pb-2'>
                <div className='circle'>
                  <img src={event.outfitImg} alt='Outft image' className='outfit-img' />
                </div>
                <div className='d-flex flex-column justify-content-center'>
                  <h2 className='blue pb-2'>{event.outfitName}</h2>
                  <span className='my-badge'>{event.category}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
