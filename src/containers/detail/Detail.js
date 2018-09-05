import React, { PureComponent } from 'react'
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import {bindActionCreators} from 'redux';
import Bar from '../../components/bar/Bar';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Input from '@material-ui/core/Input';
import {actions} from '../../reducers/';
import { withRouter } from 'react-router-dom';
import Divider from '@material-ui/core/Divider';

const {get_article_detail} = actions;

const styles = () => ({
    root:{
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'wrap',
        width: '80%',
        marginLeft: 'auto',
        marginRight: 'auto',
        paddingBottom: '20px',
        paddingLeft: 30,
        paddingRight: 30,
    },
    content:{
        padding: '20px 20px 20px 20px',
        fontSize: '18px',
    },
    divider:{
        marginTop: '20px',
    },
    editComment:{
        width: '70%',
        margin: '40px 40px 10px 40px',
        height: 120,
        border: '1px solid #555555',
        borderRadius: 7,
        paddingLeft: '5px',
    }
});
class Detail extends PureComponent {
  state = {
      isCommenting: false,
      editComment: ""
  }
  componentDidMount(){
      this.props.getArticleDetail(this.props.articleId);
  };
  handleChangeComment = (event) => {
    this.setState({ editComment: event.target.value});
  };
  render() {
    const {classes} = this.props;
    const {title,content,author,viewCount,time} = this.props.articleDetail;
    console.log(this.props.articleDetail);
    let showContent = "";
    if(content){
     showContent = content.replace(/\r\n/g,"</br>").replace(/\n/g,"<br>");}
    return (
      <div>
          <Bar title={title} func={()=>{this.props.toggleDrawer('detailDrawer',false)}}/>
          <div style={{backgroundColor: '#eeeeee',paddingTop:'30px',paddingBottom:'30px'}}>
            <Paper className={classes.root}>
                <h3>author: {author}</h3>
                <p style={{fontFamily: 'Cursive',fontStyle: 'oblique'}}>last modified:({time})</p>
                <div className={classes.content} dangerouslySetInnerHTML={{__html:showContent}}></div>
                <Divider className={classes.divider}/>
                <div>
                    <span style={{fontFamily: 'Fantasy', fontSize: '14px'}}>BROWSE({viewCount})</span>
                    <Button style={{fontFamily: 'Fantasy'}} 
                        color="primary" 
                        onClick={event=>{this.setState({isCommenting: !this.state.isCommenting})}}>Comment(0)
                    </Button>
                </div>
                {
                    this.state.isCommenting
                    ?<div>
                        The comment function is comming soon
                        <br/>
                        <TextField
                            className={classes.editComment}
                            multiline
                            rowsMax = "8"
                            InputProps={{
                                disableUnderline: true,
                            }}
                            onChange={this.handleChangeComment}
                        />
                        <br/>
                        <Button variant="contained" size="small" style={{marginLeft: '40px'}}>Commit</Button>
                    </div>
                    :null
                }

            </Paper>
          </div>
      </div>
    )
  }
}
function mapStateToProps(state) {
    return{
        userInfo: state.globalState.userInfo,
        articleDetail: state.globalState.articleDetail,
        articleId: state.front.articleId,
    };
}
function mapDispatchToProps(dispatch){
    return{
        getArticleDetail: bindActionCreators(get_article_detail,dispatch),
    };
}
export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(Detail)));