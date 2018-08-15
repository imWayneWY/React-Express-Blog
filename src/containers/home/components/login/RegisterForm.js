import React, { PureComponent } from 'react'
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import './style.css';

export default class RegisterForm extends PureComponent {
    state = {
      username: "",
      password: "",
      passwordConfirm: "",
      usernameState: {
        error: false,
        label: "please enter a username"
      },
      passwordState: {
        error: false,
        label: "please enter a password"
      },
      passwordConfirmState: {
        error: false,
        label: "please confirm the password"
      }
    }
    handleChange = (e) => {
      let value = e.target.value;
      let uPattern = /^[a-zA-Z0-9_-]{0,16}$/;
      if(!uPattern.test(value)){
        if(e.target.id==="registerUsername"){
          this.setState({
            usernameState: {
              error: true,
              label: "please check your username"
            }
          })
        }else if(e.target.id==="registerPassword"){
          this.setState({
            passwordState: {
              error: true,
              label: "please check your password"
            }
          })
        }else{
          this.setState({
            passwordConfirmState: {
              error: true,
              label: "please check your password"
            }
          })
        }
        return;
      }

      if(e.target.id==="registerUsername"){
        this.setState({
          username: value,
          usernameState: {
            error: false,
            label: "please enter your username"
          }
        })
      }else if(e.target.id==="registerPassword"){
        this.setState({
          password: value,
          passwordState: {
            error: false,
            label: "please enter your password"
          }
        })
      }else{
        this.setState({
          passwordConfirm: value,
          passwordConfirmState: {
            error: false,
            label: "please confirm your password"
          }
        })
      }
    }
    handleRegister = (e) => {
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
        if(this.state.passwordConfirm===""){
          this.setState({
            passwordConfirmState: {
              error: true,
              label: "please enter password"
            }
          });
          return;
        }     
        if(this.state.passwordConfirm !== this.state.password){
          this.setState({
            passwordConfirmState: {
              error: true,
              label: "this password is different with another"
            }
          });
          return;          
        }
        this.props.register(this.state.username,this.state.password);
    }
    render() {
    return (
      <FormControl onSubmit={this.handleRegister} className="form-container">
        <TextField 
          id="registerUsername"
          label={this.state.usernameState.label}
          error={this.state.usernameState.error}
          onChange={this.handleChange.bind(this)}
          margin="normal"
          className="form-style"
        />
        <TextField 
          id="registerPassword"
          label={this.state.passwordState.label}
          error={this.state.passwordState.error}
          onChange={this.handleChange.bind(this)}
          margin="normal"
          type="password"
          autoComplete="current-password"
          className="form-style"
        />
        <TextField 
          id="registerPassword2"
          label={this.state.passwordConfirmState.label}
          error={this.state.passwordConfirmState.error}
          onChange={this.handleChange.bind(this)}
          margin="normal"
          type="password"
          autoComplete="current-password"
          className="form-style"
        />
        <Button 
          variant="contained" 
          color="primary" 
          type="submit"
          className="button"
          onClick={this.handleRegister.bind(this)}>
          Register 
        </Button>
      </FormControl>
    )
  }
}
