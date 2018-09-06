import React,{PureComponent} from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {withRouter} from 'react-router-dom';
const styles = (theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    height: 80,
  },
  flex: {
    flexGrow: 1,
    fontSize: 35,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    height: 80,
  },
});

class Bar extends PureComponent{
  render(){
    const { classes, title} = this.props;

    return (
        <div className={classes.root}>
          <AppBar position="fixed" className={classes.appBar} color={title==="Management Page"?"secondary":"primary"}>
            <Toolbar>
              <Typography variant="title" color="inherit" className={classes.flex}>
                {title}
              </Typography>
              <Button color="inherit" onClick={()=>{this.props.func()}}>Back</Button>
            </Toolbar>
          </AppBar>
        </div>
      );
  };
  
}


export default withRouter(withStyles(styles)(Bar));