import React, { PureComponent } from 'react'
import { connect } from 'react-redux';
import {Switch, Route} from 'react-router-dom';
import NotFound from '../../components/notFound/NotFound';
import Banner from "../components/banner/Banner";
import Menu from "../components/menu/Menu";
import Home from '../home/Home';
import './style.css';
import Login from '../home/components/login/Login';
import { bindActionCreators } from 'redux';
import {actions as DispatchActions} from '../../reducers';
import {actions as tagActions} from '../../reducers/adminManageTag';
import {actions as frontActions} from '../../reducers/frontReducer';
import Logined from '../home/components/logined/Logined';
import Drawer from '@material-ui/core/Drawer';
import Edit from '../edit/Edit';
import Detail from '../detail/Detail';
import MyArticles from '../myArticles/MyArticles';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
const {getTags} = tagActions;
const {getArticleList,setDrawer} = frontActions;
const theme = createMuiTheme({
  overrides: {
    MuiDrawer:{
      paperAnchorRight:{
        width: '70%',
      }
    }
  }
});
class Front extends PureComponent {
  constructor(props){
    super(props);
    let logined = false;
    logined = this.props.userInfo.username ?  true  : false;
    this.state = {
      logined,
      newArticleFlg: true,
    }
  };
  toggleDrawer = (side, open) => {
    this.props.setDrawer(side,open);
  };
  handleGetArticleList = (tag,pageNum) => {
    this.props.getArticleList(tag,pageNum);
  };
  handleLogout = () => {
    this.props.logout();
    this.setState({logined: false});
  };
  componentWillReceiveProps(nextProps) {
    if(nextProps.userInfo.username){
      this.setState({logined: true});
    }else{
      this.setState({logined: false});
    }
  };
  setNewArticle = (newArticleFlg) => {
    this.setState({newArticleFlg});
  }
  componentDidMount(){
    this.props.getTags();
  };
  render() {
    const {url} = this.props.match;
    return (
      <div>
        <div>
          <Banner />
          <Menu 
            getArticleList={this.handleGetArticleList.bind(this)}
            categories={this.props.tags}/>
        </div>
        <div className="front-container">
          <div className="content-container">
            <div className="content">
              <Switch>
                <Route exact path={url} component={Home}/>
                <Route path={`/:tag`} component={Home}/>
                <Route component={NotFound}/>
              </Switch>
            </div>
          </div>
          <div className="login-container">
            {
              this.state.logined
              ? <Logined userInfo = {this.props.userInfo} logout={this.handleLogout.bind(this)}
                        toggleDrawer={this.toggleDrawer.bind(this)}
                        setNewArticle={this.setNewArticle.bind(this)}/> 
              : <Login login={this.props.login} register={this.props.register} />
            }
          </div>
          <MuiThemeProvider  theme={theme}>
            <Drawer anchor="right" open={this.props.editDrawer} onClose={this.toggleDrawer.bind(('editDrawer', false))}>
                <Edit 
                  toggleDrawer={this.toggleDrawer.bind(this)}
                  newArticle={this.state.newArticleFlg}/> 
            </Drawer>
          </MuiThemeProvider>

          <MuiThemeProvider  theme={theme}>
            <Drawer anchor="right" open={this.props.myArticlesDrawer} onClose={this.toggleDrawer.bind(('myArticlesDrawer', false))}>
                <MyArticles  
                  toggleDrawer={this.toggleDrawer.bind(this)}
                  setNewArticle={this.setNewArticle.bind(this)}/> 
            </Drawer>
          </MuiThemeProvider>

          <MuiThemeProvider  theme={theme}>
            <Drawer anchor="right" open={this.props.detailDrawer} onClose={this.toggleDrawer.bind(('detailDrawer', false))}>
                <Detail 
                  toggleDrawer={this.toggleDrawer.bind(this)}
                  setNewArticle={this.setNewArticle.bind(this)}/> 
            </Drawer>
          </MuiThemeProvider>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return{
    // categories: state.admin.tags,
    userInfo: state.globalState.userInfo,
    tags: state.admin.tags,
    editDrawer: state.front.editDrawer,
    myArticlesDrawer: state.front.myArticlesDrawer,
    detailDrawer: state.front.detailDrawer,
  }
}

function mapDispatchToProps(dispatch) {
  return{
    login: bindActionCreators(DispatchActions.get_login, dispatch),
    register: bindActionCreators(DispatchActions.register,dispatch),
    logout: bindActionCreators(DispatchActions.logout, dispatch),
    getTags: bindActionCreators(getTags,dispatch),
    getArticleList: bindActionCreators(getArticleList,dispatch),
    setDrawer: bindActionCreators(setDrawer, dispatch),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Front);