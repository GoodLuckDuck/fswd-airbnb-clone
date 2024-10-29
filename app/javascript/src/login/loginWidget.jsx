// loginWidget.jsx
import React from 'react';
import ReactDOM from 'react-dom';
import { safeCredentials, handleErrors } from '@utils/fetchHelper';

class LoginWidget extends React.Component {
  state = {
    email: '',
    password: '',
    error: '',
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
      window.location = '/login'; // Redirect to login page after logout
    } catch (error) {
      this.setState({ error: 'Could not log out.' });
    }
  }

  render() {
    const { email, password, error } = this.state;
    return (
      <React.Fragment>
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
        <hr />
        <p className="mb-0">Don't have an account? <a className="text-primary" onClick={this.props.toggle}>Sign up</a></p>
        <button onClick={this.logout} className="btn btn-secondary btn-block btn-lg mt-3">Log out</button>
      </React.Fragment>
    );
  }
}

export default LoginWidget;