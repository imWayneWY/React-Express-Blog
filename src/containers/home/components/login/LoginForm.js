import React, { PureComponent } from 'react'
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import './style.css';

export default class LoginForm extends PureComponent {
    handleLogin = (e) => {
        e.preventDefault();
    }
    render() {
    return (
      <FormControl onSubmit={this.handleLogin} className="form-container">
        <TextField 
          id="loginUsername"
          label="Username"
          margin="normal"
          className="form-style"
        />
        <TextField 
          id="loginPassword"
          label="Password"
          margin="normal"
          type="password"
          autoComplete="current-password"
          className="form-style"
        />
        <Button 
          variant="contained" 
          color="primary" 
          type="submit"
          className="button">
          Login
        </Button>
      </FormControl>
    )
  }
}
