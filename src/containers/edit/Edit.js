import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { Redirect } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Chip from '@material-ui/core/Chip';
import {actions as tagActions} from '../../reducers/adminManageTag';
import {actions} from '../../reducers/';
import {bindActionCreators} from 'redux';
import Bar from '../../components/bar/Bar';
import dateFormat from 'dateformat';
const {getTags} = tagActions;
const {save_article} = actions;

const styles = () => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'wrap',
        width: '80%',
        marginLeft: 'auto',
        marginRight: 'auto',
        paddingBottom: '20px',
    },
    title:{
        width: '50%',
        marginTop: '30px',
        marginLeft: '50px',
    },
    p:{
        marginTop: '50px',
        marginLeft: '50px',
        fontSize: '14px',
    },
    content:{
        marginLeft: '50px',
        borderRadius: 7,
        border: '1px solid #555555',
        fontSize: '20px',
        paddingLeft: '5px',
        width: '72%',
        height: 350,
    },
    label: {
        fontSize: '28px',
    },
    select: {
        marginLeft: '50px',
        width: '60%',
    },
    button: {
        marginLeft: '50px',
        marginTop: '30px',
    }
});

class Edit extends PureComponent{
    state = {
        newArticle: this.props.location.state.newArticle,
        title: this.props.location.state.title || '',
        content: this.props.location.state.content || '',
        tags: [],
        value: ''
    }
    handleChangeTitle = (event) => {
        this.setState({ title: event.target.value });
    };
    handleChangeContent = (event) => {
        this.setState({ content: event.target.value });
    }
    handleChangeTags = (event) => {
        this.setState({ tags: event.target.value });
    };
    handleSaveArticle = (event,state) => {
    
        if(this.state.title===''){
            this.setState({value: 'please enter a valid title'});
            return;
        };
        if(this.state.content===''){
            this.setState({value: 'please write valid content'});
            return;
        };
        if(this.state.tags===[]){
            this.setState({value: 'you must choose at least one tag'});
            return;
        }
        let articleInfo = {
            title: this.state.title,
            content: this.state.content,
            tags: this.state.tags,
            time: dateFormat(new Date(), 'yyyy-mm-dd HH:MM:ss'),
            state,
        };
        this.props.saveArticle(this.state.newArticle,articleInfo);
    };
    componentDidMount(){
        this.props.getTags();
    };
    render(){
        const {classes} = this.props;
        return(
            <div>
                <Bar title="Edit Blog"/>
                <div style={{backgroundColor: '#eeeeee',paddingTop:'30px',paddingBottom:'30px'}}>
                    {
                        this.props.userInfo.userId
                        ?<Paper className={classes.root}>
                            <TextField
                                className={classes.title} 
                                id="title" 
                                label="title"
                                InputLabelProps={{
                                    className: classes.label
                                }}
                                onChange={this.handleChangeTitle}
                            />
                            <p className={classes.p}>Content:</p>
                            <TextField
                                className={classes.content} 
                                id="content" 
                                multiline
                                rowsMax="18"
                                InputProps={{
                                    disableUnderline: true,
                                    root: classes.contentRoot,
                                    input: classes.content,
                                }}
                                onChange={this.handleChangeContent}
                            />
                            <p className={classes.p}>Tags:</p>
                            <Select
                                className={classes.select}
                                value={this.state.tags}
                                multiple
                                onChange={this.handleChangeTags}
                                input={<Input id="tags" />}
                                renderValue={selected => (
                                <div className={classes.tags}>
                                    {selected.map(value => (
                                    <Chip key={value} label={value} className={classes.chip} />
                                    ))}
                                </div>
                                )}
                            >
                                {this.props.tags.map(name => (
                                <MenuItem
                                    key={name}
                                    value={name}
                                >
                                    {name}
                                </MenuItem>
                                ))}
                            </Select>
                            <div>
                                <Button 
                                    variant="contained" 
                                    className={classes.button}
                                    onClick={event=> this.handleSaveArticle(event,"posted")}>POST</Button>
                                <Button variant="contained" 
                                    className={classes.button}
                                    onClick={event=> this.handleSaveArticle(event,"saved")}>SAVE</Button>
                            </div>
                            <div>
                                <p className={classes.p} style={{color: '#ff0000'}}>{this.state.value}</p>
                            </div>
                        </Paper>
                        :<Redirect to='/'/>
                    }
                </div>
            </div>
        )
    };
}
function mapStateToProps(state) {
    return{
        userInfo: state.globalState.userInfo,
        tags: state.admin.tags,
    };
}
function mapDispatchToProps(dispatch){
    return{
        getTags: bindActionCreators(getTags,dispatch),
        saveArticle: bindActionCreators(save_article,dispatch),
    };
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(Edit));