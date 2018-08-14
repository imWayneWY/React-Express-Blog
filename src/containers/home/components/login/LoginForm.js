import React, { PureComponent } from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import './style.css';

export default class LoginForm extends PureComponent {
    state = {
      username: "",
      password: "",
      usernameState: {
        error: false,
        label: "Username"
      },
      passwordState: {
        error: false,
        label: "Password"
      }
    };
    handleLogin = (e) => {
        e.preventDefault();
        if(this.state.username===""){
          this.setState({
            usernameState: {
              error: true,
              label: "please enter username"
            }
          });
          return;
        }
        if(this.state.password===""){
          this.setState({
            passwordState: {
              error: true,
              label: "please enter password"
            }
          });
          return;
        }
        this.props.login(this.state.username,this.state.password);
    };
    handleChange = (e) => {
        let value = e.target.value;
        let uPattern = /^[a-zA-Z0-9_-]{0,16}$/;
        let isUsername = (e.target.id==="loginUsername");

        if(!uPattern.test(value)){
          isUsername
          ?this.setState({
            usernameState: {
              error: true,
              label: "please check your username"
            }
          })
          :this.setState({
            passwordState: {
              error: true,
              label: "please check your password"
            }
          })
          return;
        } else {
          isUsername
          ?this.setState({
            username: value,
            usernameState: {
              error: false,
              label: "Username"
            }
          })
          :this.setState({
            password: value,
            passwordState: {
              error: false,
              label: "Password"
            }
          })
        }
    };
    render() {
    return (
      <form onSubmit={this.handleLogin.bind(this)} className="form-container">
        <TextField 
          id="loginUsername"
          label={this.state.usernameState.label}
          margin="normal"
          className="form-style"
          error={this.state.usernameState.error}
          onChange={this.handleChange.bind(this)}
        />
        <TextField 
          id="loginPassword"
          label={this.state.passwordState.label}
          margin="normal"
          type="password"
          autoComplete="current-password"
          className="form-style"
          error={this.state.passwordState.error}
          onChange={this.handleChange.bind(this)}
        />
        <Button 
          variant="contained" 
          color="primary" 
          type="submit"
          className="button">
          Login
        </Button>
      </form>
    )
  }
}
