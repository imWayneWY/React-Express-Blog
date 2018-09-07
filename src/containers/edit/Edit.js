import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import dateFormat from 'dateformat';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import Bar from '../../components/bar/Bar';
import { actions } from '../../reducers/';
import { actions as tagActions } from '../../reducers/adminManageTag';
import { actions as frontActions } from '../../reducers/frontReducer';
const {getTags} = tagActions;
const {save_article, clear_detail} = actions;
const {getArticleList,getMyArticleList} = frontActions;

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
        newArticle: this.props.newArticle,
        title: this.props.articleDetail.title || '',
        content: this.props.articleDetail.content || '',
        tags: this.props.articleDetail.tags || [],
        warningMsg: ''
    };
    componentWillReceiveProps(nextProps){
        this.setState({
            newArticle:nextProps.newArticle,
            title: nextProps.articleDetail.title || '',
            content: nextProps.articleDetail.content || '',
            tags: nextProps.articleDetail.tags || [],            
        });
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
    handleSaveArticle = (event,articleState) => {
        if(this.state.title===''){
            this.setState({warningMsg: 'please enter a valid title'});
            return;
        };
        if(this.state.content===''){
            this.setState({warningMsg: 'please write valid content'});
            return;
        };
        if(this.state.tags===[]){
            this.setState({warningMsg: 'you must choose at least one tag'});
            return;
        }
        let articleInfo = {
            _id: this.props.articleDetail._id || '',
            title: this.state.title,
            content: this.state.content,
            tags: this.state.tags,
            time: dateFormat(new Date(), 'yyyy-mm-dd HH:MM:ss'),
            state: articleState,
        };
        this.props.saveArticle(this.state.newArticle,articleInfo);
        if(articleState==='posted'){
           this.props.clearDetail();
           this.props.toggleDrawer('editDrawer',false);
        }

        this.props.getArticleList();
        this.props.getMyArticleList(1,10,this.props.showOnlyPublished);
    };
    componentDidMount(){
        this.props.getTags();
    };
    render(){
        const {classes} = this.props;
        return(
            <div>
                <Bar title="Edit Blog" func={()=>{this.props.toggleDrawer('editDrawer',false);this.props.clearDetail()}}/>
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
                                value={this.state.title}
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
                                value={this.state.content}
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
                        :<div>Your session is over due. Please Login again.</div>
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
        articleDetail: state.globalState.articleDetail,
        showOnlyPublished: state.front.showOnlyPublished,
    };
}
function mapDispatchToProps(dispatch){
    return{
        getTags: bindActionCreators(getTags,dispatch),
        saveArticle: bindActionCreators(save_article,dispatch),
        clearDetail: bindActionCreators(clear_detail,dispatch),
        getArticleList: bindActionCreators(getArticleList,dispatch),
        getMyArticleList: bindActionCreators(getMyArticleList,dispatch),
    };
}
export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(Edit)));