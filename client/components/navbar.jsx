import React from 'react';
import { AppContext } from '../lib';

export default class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isOpen: false };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    if (event.target === event.currentTarget) {
      this.setState({ isOpen: !this.state.isOpen });
    }
  }

  render() {
    const { handleSignOut } = this.context;
    const { action } = this.props;
    if (this.state.isOpen === false) {
      if (action === 'sign-in' || action === 'sign-up') {
        return (
          <nav className='container-fluid nav-container'>
            <div className='white row align-items-center'>
              <div className='col-1 cookie brand'>IceTime</div>
              <div className='col-1 d-none d-lg-block'>
                <a href='#sign-up' className='nav-links p-0'>Register</a>
              </div>
              <div className='col-1 d-none d-lg-block'>
                <a href='#sign-in' className='nav-links p-0'>Login</a>
              </div>
              <div className='col-1 d-none d-lg-block'>
                <a href='#about' className='nav-links p-0'>About</a>
              </div>
              <div className='col-9 .d-none .d-sm-block .d-lg-none d-lg-none d-xl-none text-end logout'>
                <i className="fa-solid fa-bars" onClick={this.handleClick} />
              </div>
            </div>
          </nav>
        );
      } else {
        return (
          <nav className='container-fluid nav-container'>
            <div className='white row align-items-center'>
              <div className='col-1 col-lg-1 cookie brand min-w'>IceTime</div>
              <div className='col-1 d-none d-lg-block min-w'>
                <a href='#' className='nav-links p-0'>Events</a>
              </div>
              <div className='col-1 d-none d-lg-block min-w'>
                <a href='#outfits' className='nav-links p-0'>Outfits</a>
              </div>
              <div className='col-2 d-none d-lg-block'>
                <a href='#about' className='nav-links p-0'>About</a>
              </div>
              <div className='col-3 col-lg-5 col-xl-6 d-none d-lg-block text-end logout'>
                <a href='#sign-in' className='nav-links p-0' onClick={handleSignOut}>
                  Log Out
                  <i className="fa-regular fa-circle-user ps-2" />
                </a>
              </div>
              <div className='col-6 col-sm-8 col-md-9 .d-none .d-sm-block .d-lg-none d-lg-none d-xl-none text-end logout'>
                <i className="fa-solid fa-bars" onClick={this.handleClick} />
              </div>
            </div>
          </nav>
        );
      }
    }
    if (this.state.isOpen === true) {
      if (action === 'sign-in' || action === 'sign-up') {
        return (
          <nav className='container-fluid nav-container-tall-log'>
            <div className='white align-items-center'>
              <div className='row align-items-center'>
                <div className='cookie brand-mobile col-10 ps-4'>IceTime</div>
                <div className='col-2 ps-4'>
                  <i className="fa-solid fa-xmark" onClick={this.handleClick} />
                </div>
              </div>
              <div className='col-1 ps-3'>
                <a href='#sign-up' className='nav-links p-0'>Register</a>
              </div>
              <div className='col-1 ps-3'>
                <a href='#sign-in' className='nav-links p-0'>Login</a>
              </div>
              <div className='col-1 ps-3'>
                <a href='#about' className='nav-links p-0'>About</a>
              </div>
            </div>
          </nav>
        );
      } else {
        return (
          <nav className='container-fluid nav-container-tall'>
            <div className='white align-items-center'>
              <div className='row align-items-center'>
                <div className='cookie brand-mobile col-10 ps-4'>IceTime</div>
                <div className='col-2 ps-4'>
                  <i className="fa-solid fa-xmark" onClick={this.handleClick} />
                </div>
              </div>
              <div className='col-1 ps-3'>
                <a href='#' className='nav-links p-0'>Events</a>
              </div>
              <div className='col-1 ps-3'>
                <a href='#outfits' className='nav-links p-0'>Outfits</a>
              </div>
              <div className='col-1 ps-3'>
                <a href='#' className='nav-links p-0'>About</a>
              </div>
              <div className='col ps-3'>
                <a href='#' className='nav-links p-0' onClick={handleSignOut}>
                  Log Out
                  <i className="fa-regular fa-circle-user ps-2" />
                </a>
              </div>
            </div>
          </nav>
        );
      }
    }
  }
}

Navbar.contextType = AppContext;
