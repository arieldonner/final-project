import React from 'react';
import NotFound from './not-found';
import Navbar from './navbar';

export default class OutfitDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      outfitName: '',
      outfitImg: '',
      category: '',
      bottoms: '',
      makeup: '',
      loading: true,
      error: false
    };
  }

  componentDidMount() {
    fetch(`/api/outfit/${this.props.outfitId}`, {
      headers: {
        'x-access-token': localStorage.getItem('jwt')
      }
    })
      .then(res => res.json())
      .then(outfit => this.setState({
        outfitName: outfit.outfitName,
        outfitImg: outfit.outfitImg,
        category: outfit.category,
        bottoms: outfit.bottoms,
        makeup: outfit.makeup,
        star: outfit.star,
        loading: false,
        error: false
      }))
      .catch(() => {
        this.setState({ error: true });
      });
  }

  render() {
    return (
      <div>
        <Navbar />
        <div className="container-fluid">
          <div className='d-flex justify-content-center align-items-center col-12'>
            <a href='#outfits'><i className="fa-solid fa-chevron-left blue" /></a>
            <h1 className='heading cookie col-10 col-md-8 col-lg-5'>My Outfit</h1>
          </div>
          {this.state.error === true &&
            <NotFound />
          }
          {this.state.loading === true &&
            <div className='d-flex justify-content-center'>
              <div className="lds-default"><div /><div /><div /><div /><div /><div /><div /><div /><div /><div /><div /><div /></div>
            </div>
          }
          <div className='container-fluid col-12 col-md-9 col-lg-6 p-4 form-style'>
            <a href={`#edit-outfit?outfitId=${this.props.outfitId}`} className='red fs-5 text-decoration-none float-end'>Edit</a>
            <div className='d-flex justify-content-center col-12'>
              <div className='big-circle mb-2'>
                <img src={this.state.outfitImg} alt='Outft image' className='outfit-img' />
              </div>
            </div>
            <div className='d-flex align-items-center pb-2'>
              <div className='pe-3'>
                <h2 className='blue'>{this.state.outfitName}</h2>
              </div>
              {this.state.star === true &&
                <i className="fa-solid fa-star pb-1" />
              }
            </div>
            <div className='d-flex'>
              {this.state.category === 'Synchro' &&
                <span className='my-badge pink-back'>{this.state.category}</span>
              }
              {this.state.category === 'Single' &&
                <span className='my-badge blue-back'>{this.state.category}</span>
              }
              {this.state.category === 'Pairs' &&
                <span className='my-badge pale-back'>{this.state.category}</span>
              }
              {this.state.category === 'Dance' &&
                <span className='my-badge purple-back'>{this.state.category}</span>
              }
            </div>
            <div>
              <h5 className='mt-3 mb-0'>Bottoms:</h5>
              <p className='blue pb-2'>{this.state.bottoms}</p>
            </div>
            <div>
              <h5 className='mt-3 mb-0'>Hair/Makeup:</h5>
              <p className='blue pb-2'>{this.state.makeup}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
