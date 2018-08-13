import React, { PureComponent } from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import LoginForm from './LoginForm';
import './style.css';
import RegisterForm from './RegisterForm';


function TabContainer({ children, dir }) {
  return (
    <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
      {children}
    </Typography>
  );
}


export default class Login extends PureComponent {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  render() {

    return (
      <div className="form-container">
        <AppBar position="static" color="default">
          <Tabs
            value={this.state.value}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            fullWidth
          >
            <Tab label="Login" />
            <Tab label="Register" />
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis='x'
          index={this.state.value}
          onChangeIndex={this.handleChangeIndex}
        >
          <TabContainer className="form-style">
            <LoginForm login={this.props.login}/>
          </TabContainer>
          <TabContainer className="form-style">
            <RegisterForm/>
          </TabContainer>
        </SwipeableViews>
      </div>
    );
  }
}



