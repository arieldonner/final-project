import React from 'react';

export default class NotFound extends React.Component {
  render() {
    return (
      <div>
        <div className="container-fluid">
          <h1 className="heading cookie">Uh oh!</h1>
          <div className='row justify-content-center pb-3'>
            <div className='tile col-sm-12 col-md-10 col-lg-7 ps-4 pt-3 mb-3'>
              <div className='d-flex align-items-center'>
                <i className='fa-regular fa-face-dizzy p-5' />
                <h3 className='ps-4 pe-2'>Uh oh, we could not find the page you were looking for! Please try again.</h3>
              </div>
              <a href='#' className='d-flex justify-content-center pb-2'>Click here to return to the home page</a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
