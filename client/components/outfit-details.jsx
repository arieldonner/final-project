import React from 'react';
// import NotFound from './not-found';

export default class OutfitDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      outfitName: '',
      startDate: '',
      startTime: '',
      endTime: '',
      locationName: '',
      show: false,
      loading: true,
      error: false
    };
  }

  componentDidMount() {

  }

  render() {
    return (
      <div className="container-fluid">
        <div className='d-flex justify-content-center align-items-center col-12'>
          <a href='#outfits'><i className="fa-solid fa-chevron-left blue" /></a>
          <h1 className='heading cookie'>My Outfit</h1>
        </div>
        <div className='container-fluid col-12 col-md-9 col-lg-6 p-4 form-style'>
          <p>Test</p>
        </div>
      </div>
    );
  }
}
