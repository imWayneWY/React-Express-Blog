import React, { PureComponent } from 'react';
import Paper from '@material-ui/core/Paper';
import {withStyles} from '@material-ui/core/styles';
const styles = theme => ({
    root: {
      ...theme.mixins.gutters(),
      paddingTop: theme.spacing.unit * 2,
      paddingBottom: theme.spacing.unit * 2,
      width: '90%',
      marginLeft: 20,
      marginTop: theme.spacing.unit * 2,
      marginBottom: theme.spacing.unit * 2,
    },
});
  
class ArticleCell extends PureComponent{
    render(){
        const {classes} = this.props;
        return(
            <Paper className={classes.root} elevation={1}>
                <h2>{this.props.data.title}</h2>
                <p>{this.props.data.summary}</p>
            </Paper>
        );
    };
}

export default withStyles(styles)(ArticleCell);