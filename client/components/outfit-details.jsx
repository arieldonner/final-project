import React from 'react';
// import NotFound from './not-found';

export default class OutfitDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      outfitName: '',
      outfitImg: '',
      category: '',
      bottoms: '',
      makeup: '',
      star: false,
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
      <div className="container-fluid">
        <div className='d-flex justify-content-center align-items-center col-12'>
          <a href='#outfits'><i className="fa-solid fa-chevron-left blue" /></a>
          <h1 className='heading cookie'>My Outfit</h1>
        </div>
        <div className='container-fluid col-12 col-md-9 col-lg-6 p-4 form-style'>
          <a href='#edit-outfit' className='red fs-5 text-decoration-none float-end'>Edit</a>
          <div className='d-flex justify-content-center col-12'>
            <div className='circle'>
              <img src={this.state.outfitImg} alt='Outft image' className='outfit-img' />
            </div>
          </div>
          <h2 className='blue pb-2'>{this.state.outfitName}</h2>
        </div>
      </div>
    );
  }
}
