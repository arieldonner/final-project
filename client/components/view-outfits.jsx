import React from 'react';

export default class ViewOutfits extends React.Component {
  constructor(props) {
    super(props);
    this.state = { outfits: [] };
  }

  render() {
    return (
      <div className="container-fluid">
        <h1 className='heading cookie'>Outfits</h1>
        <div className='d-flex justify-content-end'>
          <button className='btn btn-primary button-position'>New+</button>
        </div>
        <div className='container' />
      </div>
    );
  }
}
