import React, {PureComponent} from 'react';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import dateFormat from 'dateformat';

class CommentItem extends PureComponent{
    state = {
        open: false,
        value: "",
        label: "reason",
        error: false,
    }
    handleClick = () => {
        this.setState({
            open: true,
            value: "",
            label: "reason",
            error: false,
        });
    }
    handleClose = () => {
        this.setState({open: false});
    }
    handleChange = (event) => {
        this.setState({value: event.target.value});
    }
    handleCommit = () => {
        if(this.state.value===""){
            this.setState({
                label:"please write your reason",
                error: true,
            });
            return;
        }
        let report = {
            _id: this.props.item._id,
            reportReason: this.state.value,
            reportTime: dateFormat(new Date(), 'yyyy-mm-dd HH:MM:ss'),
        };
        this.props.report(report);
        this.setState({open: false});
    }
    render(){
        let showContent = "";
        if (this.props.item.content){
            showContent = this.props.item.content.replace(/\r\n/g,"</br>").replace(/\n/g,"<br>");}
        return(
            <div style={{
                marginTop: '20px',
            }}>
                <Divider/>
                <div>
                    <span style={{
                        fontSize: '16px',
                        fontWeight: 'bold',
                    }}>{`${this.props.item.author} :`}</span>
                    <span style={{
                        position: 'absolute',
                        right: '20%',
                        fontSize: '12px',
                    }}>
                        {`published on ${this.props.item.time}`}
                        {
                            this.props.isUser
                            ?
                                this.props.item.isReported
                                ?<p style={{color:'red'}}>This comment has been reported.</p>
                                :<Button
                                size="small"
                                color="primary"
                                onClick={this.handleClick}
                                >
                                    report
                                </Button>
                            :null
                        }

                    </span>

                </div>
                
                <div style={{
                    marginLeft: '20px',
                }}
                    dangerouslySetInnerHTML={{__html:showContent}}>
                </div>


                <Dialog
                open={this.state.open}
                onClose={this.handleClose}
                >
                <DialogTitle>Report this comment</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                    You have to understand that you have responsibility for this report.
                    You are reporting this comment:
                    </DialogContentText>
          
                    <div style={{
                        marginLeft: '20px',
                    }}
                        dangerouslySetInnerHTML={{__html:showContent}}>
                    </div>
              
                    <DialogContentText>
                    If you are sure about this, please write your reason here. Thanks.
                    </DialogContentText>
                    <TextField
                    autoFocus
                    margin="dense"
                    fullWidth
                    label={this.state.label}
                    value={this.state.value}
                    onChange={this.handleChange}
                    error={this.state.error}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleClose} color="primary">
                    Cancel
                    </Button>
                    <Button onClick={this.handleCommit} color="primary">
                    Commit 
                    </Button>
                </DialogActions>
                </Dialog>
            </div>
        );
    };
};

export default CommentItem;