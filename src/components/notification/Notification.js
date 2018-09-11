import React, { PureComponent } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import green from '@material-ui/core/colors/green';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    success: {
        backgroundColor: green[600],
    },
    error: {
        backgroundColor: theme.palette.error.dark,
    },
    icon: {
        fontSize: 20,
        opacity: 0.9,
        marginRight: theme.spacing.unit,
    },
    message: {
        display: 'flex',
        alignItems: 'center',
    }
  });

 class Notification extends PureComponent{
    state = {
        open: true
    }
    componentWillReceiveProps(nextProps){
        this.setState({open: true}); //every notification will be shown
    }
    handleClose = (event,reason) => {
        if (reason === 'clickaway') {
            return;
        }
        this.setState({ open: false });
        this.props.clearMsg();
    };
    render(){
        const { type,classes } = this.props;
        return(
            <Snackbar
                anchorOrigin={{
                vertical: 'top',
                horizontal: 'left',
                }}
                open={this.state.open}
                autoHideDuration={6000}
                onClose={this.handleClose}>

                <SnackbarContent
                    className={type==="success"?classes.success:classes.error}
                    message={<span id="message-id" className={classes.message}>
                        {type==="success"
                        ?<CheckCircleIcon className={classes.icon}/>
                        :<ErrorIcon className={classes.icon}/>}
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

            </Snackbar>
        );
    }
}

export default withStyles(styles)(Notification) 
