import React, { PureComponent } from 'react';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import {withStyles} from '@material-ui/core/styles';
import {withRouter} from 'react-router-dom';
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
    button: {
      float: 'right',
    },
    span:{
        fontSize: '14px',
        fontFamily: 'fantasy',
    },
});
  
class ArticleCell extends PureComponent{
    handleClick =() => {
        this.props.openDetail(this.props.data._id);
    };
    render(){
        const {classes} = this.props;
        return(
            <Paper className={classes.root} elevation={1}>
                <h2>{this.props.data.title}</h2>
                <p>{this.props.data.summary}</p>
                <div>
                    <span className={classes.span}>
                        {`view:(${this.props.data.viewCount}) | comment:(${this.props.data.commentCount})`}
                    </span>
                    <Button 
                    size="medium" color='primary'
                    onClick={this.handleClick}
                    className={classes.button}>
                        View Detail
                    </Button>
                </div>
            </Paper>
        );
    };
}

export default withRouter(withStyles(styles)(ArticleCell));