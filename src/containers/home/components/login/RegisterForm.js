import React, { PureComponent } from 'react'
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import './style.css';

export default class RegisterForm extends PureComponent {
    handleRegister = (e) => {
        e.preventDefault();
    }
    render() {
    return (
      <FormControl onSubmit={this.handleRegister} className="container">
        <TextField 
          id="username"
          label="please enter a username"
          margin="normal"
          className="form-style"
        />
        <TextField 
          id="password1"
          label="please enter a password"
          margin="normal"
          type="password"
          autoComplete="current-password"
          className="form-style"
        />
        <TextField 
          id="password2"
          label="please repeat password"
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
          Register 
        </Button>
      </FormControl>
    )
  }
}
