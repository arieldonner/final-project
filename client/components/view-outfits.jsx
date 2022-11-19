import React from 'react';

export default class ViewOutfits extends React.Component {
  constructor(props) {
    super(props);
    this.state = { outfits: [] };
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
    return (
      <div className="container-fluid">
        <div className='d-flex justify-content-center align-items-center col-12'>
          <h1 className='col-8 col-md-4 ps-5 heading cookie'>Outfits</h1>
          <a href='#create-outfit' className='btn btn-primary button-position'>New+</a>
        </div>
        <div className='container'>
          <div className='row justify-content-center'>
            <div className='tile col-sm-12 col-md-6 d-flex gap-4 ps-4 pt-2 pb-2'>
              <div className='circle'>
                <img src="https://litb-cgis.rightinthebox.com/images/384x500/202110/bps/product/inc/fqdfpu1635163742663.jpg" alt='Outft image' className='outfit-img' />
              </div>
              <div className='d-flex flex-column justify-content-center'>
                <h2 className='blue'>Rock&Roll</h2>
                <span className='badge badge-pill badge-info'>Synchro</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
