import React, { PureComponent } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
const styles = {
    card:{
        minWidth: 800,
        marginBottom: 20,
    },
    author:{
        fontSize: 20,
    },
    info: {
        fontSize: 10,
    },
    message: {
        fontSize: 18,
        marginLeft: 30,
        fontStyle: 'italic',
    },
    comment: {
        fontSize: 16,
        marginLeft: 12,
        color: '#585858',
    }
};

class ManageCommentItem extends PureComponent{
    clickOK(){
        this.props.handleOK(this.props.comment._id);
    };
    clickNO(){
        this.props.handleNO(this.props.comment._id);
    };
    render(){
        const {reportUser,reportReason,content,author} = this.props.comment;
        const {classes} = this.props;
        return(
            <Card className={classes.card}>
            <CardContent>
                <p>
                    <span className={classes.author}>{reportUser}</span>
                    <span className={classes.info}>{" thought this comment should be delete because:"}</span>
                </p>
                <p className={classes.message}>{reportReason}</p>
                <Divider/>
                <p className={classes.info}>Here's the comment:</p>
                <p className={classes.comment}>
                    {author}
                    {" : "}
                    {content}
                </p>
                <Divider/>
            </CardContent>
            <CardActions>
              <p>This comment have </p>
              <Button size="small" color="primary" onClick={this.clickOK.bind(this)}>No problem</Button>
              <Button size="small" color="secondary"onClick={this.clickNO.bind(this)}>to be delete</Button>
            </CardActions>
          </Card>
        );
    };
}

export default withStyles(styles)(ManageCommentItem);