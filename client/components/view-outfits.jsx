import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFaceSadCry } from '@fortawesome/free-regular-svg-icons';

export default class ViewOutfits extends React.Component {
  constructor(props) {
    super(props);
    this.state = { outfits: null, loading: true };
  }

  componentDidMount() {
    fetch('/api/outfits', {
      headers: {
        'x-access-token': localStorage.getItem('jwt')
      }
    })
      .then(res => res.json())
      .then(res => {
        if (res.length === 0) {
          this.setState({ outfits: null, loading: false });
        } else {
          this.setState({ outfits: res, loading: false });
        }
      });
  }

  render() {
    return (
      <div className="container-fluid">
        <div className='d-flex justify-content-center align-items-center col-12'>
          <h1 className='col-8 col-md-7 col-lg-4 ps-5 heading cookie'>Outfits</h1>
          <a href='#create-outfit' className='btn btn-primary button-position'>New+</a>
        </div>
        {this.state.loading === true &&
          <div className='d-flex justify-content-center'>
            <div className="lds-default"><div /><div /><div /><div /><div /><div /><div /><div /><div /><div /><div /><div /></div>
          </div>
        }
        <div className='container'>
          {this.state.loadding === false && !this.state.outfits &&
            <div className='container ps-1 pe-1'>
              <div className='row justify-content-center'>
                <div className='tile col-sm-12 col-md-10 col-lg-6 d-flex gap-4 ps-4 pt-2 pb-2'>
                  <div className='circle d-flex justify-content-center align-items-center'>
                    <FontAwesomeIcon icon={faFaceSadCry} className='icon sad' />
                  </div>
                  <div className='d-flex flex-column justify-content-center'>
                    <h2 className='pb-2'>No outfits</h2>
                  </div>
                </div>
              </div>
            </div>
          }
          {this.state.outfits &&
          this.state.outfits.map(event => (
            <div key={event.outfitId} className='row justify-content-center pb-3'>
              <div className='tile col-sm-12 col-md-10 col-lg-6 d-flex gap-4 ps-4 pt-2 mb-3'>
                <div className='circle'>
                  <img src={event.outfitImg} alt='Outft image' className='outfit-img' />
                </div>
                <div className='d-flex flex-column justify-content-center'>
                  <h2 className='blue pb-2'>{event.outfitName}</h2>
                  {event.category === 'Synchro' &&
                    <span className='my-badge pink-back'>{event.category}</span>
                  }
                  {event.category === 'Single' &&
                    <span className='my-badge blue-back'>{event.category}</span>
                  }
                  {event.category === 'Pairs' &&
                    <span className='my-badge pale-back'>{event.category}</span>
                  }
                  {event.category === 'Dance' &&
                    <span className='my-badge purple-back'>{event.category}</span>
                  }
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
