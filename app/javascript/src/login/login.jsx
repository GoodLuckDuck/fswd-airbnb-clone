// loginWidget.jsx
import React from 'react';
import ReactDOM from 'react-dom';
import { safeCredentials, handleErrors } from '@utils/fetchHelper';

class LoginWidget extends React.Component {
  state = {
    email: '',
    password: '',
    error: '',
    isLoggedIn: false, // Track login state
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  login = async (e) => {
    e.preventDefault();
    this.setState({ error: '' });

    try {
      const response = await fetch('/api/sessions', safeCredentials({
        method: 'POST',
        body: JSON.stringify({
          user: {
            email: this.state.email,
            password: this.state.password,
          }
        })
      }));
      
      const data = await handleErrors(response);
      
      if (data.success) {
        this.setState({ isLoggedIn: true }); // Update login state
        const params = new URLSearchParams(window.location.search);
        const redirect_url = params.get('redirect_url') || '/';
        window.location = redirect_url;
      }
    } catch (error) {
      this.setState({ error: 'Could not log in.' });
    }
  }

  logout = async () => {
    try {
      const response = await fetch('/api/sessions', safeCredentials({
        method: 'DELETE',
      }));
      
      await handleErrors(response);
      this.setState({ isLoggedIn: false }); // Update login state
      window.location = '/login'; // Redirect to login page after logout
    } catch (error) {
      this.setState({ error: 'Could not log out.' });
    }
  }

  render() {
    const { email, password, error, isLoggedIn } = this.state;
    return (
      <React.Fragment>
        {!isLoggedIn ? (
          <form onSubmit={this.login}>
            <input 
              name="email" 
              type="email" 
              className="form-control form-control-lg mb-3" 
              placeholder="Email" 
              value={email} 
              onChange={this.handleChange} 
              required 
            />
            <input 
              name="password" 
              type="password" 
              className="form-control form-control-lg mb-3" 
              placeholder="Password" 
              value={password} 
              onChange={this.handleChange} 
              required 
            />
            <button type="submit" className="btn btn-danger btn-block btn-lg">Log in</button>
            {error && <p className="text-danger mt-2">{error}</p>}
          </form>
        ) : (
          <div>
            <p className="mb-3">Welcome back!</p>
            <button onClick={this.logout} className="btn btn-secondary btn-block btn-lg">Log out</button>
          </div>
        )}
        <hr />
        {!isLoggedIn && (
          <p className="mb-0">Don't have an account? <a className="text-primary" onClick={this.props.toggle}>Sign up</a></p>
        )}
      </React.Fragment>
    );
  }
}

export default LoginWidget;