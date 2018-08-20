import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { Redirect } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';

const styles = (theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    title:{
        marginLeft: theme.spacing.unit,
        marginTop: theme.spacing.unit,
    }
});
class Edit extends PureComponent{
    render(){
        const classes = this.props;
        return(
            <div>
                {
                    this.props.userInfo.userId
                    ?<div className={classes.root}>
                        <TextField
                            className={classes.title} 
                            id="title" 
                            label="title"
                        />
                        <br/>
                        <textarea
                            className={classes.content} 
                            id="content" 
                            label="content"
                            multiline
                        />
                     </div>
                    :<Redirect to='/'/>
                }
            </div>
        )
    };
}
function mapStateToProps(state) {
    return{
        userInfo: state.globalState.userInfo
    };
}
function mapDispatchToProps(dispatch){
    return{
    };
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(Edit));