import React, { PureComponent } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import ErrorIcon from '@material-ui/icons/Error';
import './style.css';

export default class Notification extends PureComponent{
    state = {
        open: true
    }
    handleClose = (event,reason) => {
        if (reason === 'clickaway') {
            return;
        }
      
        this.setState({ open: false });
    };
    render(){
        return(
            <Snackbar
            aria-describedby="client-snackbar"
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={this.state.open}
            autoHideDuration={5000}
            onClose={this.handleClose}
            message={<span id="message-id" className="message">
                {this.props.type==="success"
                ?<CheckCircleIcon className="icon" color="primary"/>
                :<ErrorIcon className="icon" color="error"/>}
                {this.props.content}
            </span>}
            action={[
              <IconButton
                key="close"
                aria-label="Close"
                color="inherit"
                onClick={this.handleClose}
              >
                <CloseIcon className="icon"/>
              </IconButton>,
            ]}
          />
        );
    }
}

 