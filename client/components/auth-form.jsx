import React from 'react';

export default class AuthForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      password: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { action } = this.props;
    const req = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
    };
    fetch(`/api/auth/${action}`, req)
      .then(res => res.json())
      .then(result => {
        if (action === 'sign-up') {
          window.location.hash = 'sign-in';
        } else if (result.user && result.token) {
          this.props.onSignIn(result);
        }
      });
  }

  render() {
    const { action } = this.props;
    const { handleChange, handleSubmit } = this;
    const welcomeMessage = action === 'sign-up'
      ? 'Register'
      : 'Login';
    const alternateActionHref = action === 'sign-up'
      ? '#sign-in'
      : '#sign-up';
    const alternateActionText = action === 'sign-up'
      ? 'Already have an account? Login.'
      : "Don't have an account? Sign up.";
    const submitButtonText = action === 'sign-up'
      ? 'Create Account'
      : 'Login';
    return (
      <div className='form-style container-fluid col-10 col-md-5 p-4 mt-5'>
        <h1 className='cookie blue text-center mb-3'>{welcomeMessage}</h1>
        <form onSubmit={handleSubmit}>
          <div className='mb-4'>
            <label htmlFor='username' className='form-label'>Username</label>
            <input
            required
            autoFocus
            id='userName'
            type="text"
            name="userName"
            onChange={handleChange}
            className="form-control" />
          </div>
          <div className='mb-4'>
            <label htmlFor='password' className='form-label'>Password</label>
            <input
            required
            id='password'
            type="password"
            name="password"
            onChange={handleChange}
            className="form-control" />
          </div>
          <div className='d-flex justify-content-center mb-4'>
            <button type='submit' className='btn btn-primary col-12'>{submitButtonText}</button>
          </div>
          <div className='d-flex justify-content-center mb-2'>
            <a className='text-muted' href={alternateActionHref}>{alternateActionText}</a>
          </div>
        </form>
      </div>
    );
  }
}
