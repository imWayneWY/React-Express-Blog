import React, { PureComponent } from 'react'
import { withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

const styles = {
  root: {
    flexGrow: 1,
  },
};

class Loading extends PureComponent{
  render()
  {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <LinearProgress />
      </div>
    );}
}


export default withStyles(styles)(Loading);