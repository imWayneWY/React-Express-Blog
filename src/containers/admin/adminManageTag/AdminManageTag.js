import React, { PureComponent } from 'react';
import Chip from '@material-ui/core/Chip';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {actions} from '../../../reducers/adminManageTag';
import {withStyles} from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
const {getTags,addTag,delTag} = actions;

const styles = () => ({
    root: {
        display: 'flex',
    },
    chip: {
        marginLeft: '5px',
    }
});

class AdminManageTag extends PureComponent{
    state = {
        open: false,
    };
    handleDelete=(event,tag)=>{
        this.props.delTag(tag);
    };
    handleAdd = (event) => {
        let tag = document.querySelector('#addTagName').value;
        if(!tag){
            return;
        }
        this.props.addTag(tag);
        this.setState({
            open: false,
        });
    }
    handleOpenDialog=()=>{
        this.setState({
            open: true,
        });
    };
    handleClose=()=>{
        this.setState({
            open: false,
        });
    };
    componentDidMount(){
        this.props.getTags();
    };
    render(){
        const {classes,tags}  = this.props;
        return(
            <div >
                {tags.map(tag=>(
                    <Chip
                        key={tag}
                        className={classes.chip}
                        label={tag}
                        onDelete={event => this.handleDelete(event,tag)}
                        color="default"
                    />
                ))}
                <Chip
                    className={classes.chip}
                    label='Add new Tag'
                    onDelete={this.handleOpenDialog}
                    color="default"
                    deleteIcon={<AddIcon/>}
                />
                <Dialog
                  open={this.state.open}
                  onClose={this.handleClose}
                >
                    <DialogContent>
                        <TextField
                        autoFocus
                        margin="dense"
                        id="addTagName"
                        label="New Tag"
                        value={this.state.newTagName}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.handleAdd} color="primary">
                            Add 
                        </Button>
                    </DialogActions>
                    </Dialog>
            </div>
        );
    }
}
function mapStateToProps(state){
    return {
        tags: state.admin.tags,
    }
}
function mapDispatchToProps(dispatch){
    return {
        getTags: bindActionCreators(getTags,dispatch),
        addTag: bindActionCreators(addTag,dispatch),
        delTag: bindActionCreators(delTag,dispatch),
    }
}
export default withStyles(styles)(
    connect(
        mapStateToProps,
        mapDispatchToProps,
    )(AdminManageTag));