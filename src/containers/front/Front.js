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
import Logined from '../home/components/logined/Logined';

class Front extends PureComponent {
  constructor(props){
    super(props);
    this.props.userInfo.username
    ? this.state={logined: true}
    : this.state={logined: false}
  }
  handleLogout = () => {
    this.props.logout();
    this.setState({logined: false});
  }
  componentWillReceiveProps(nextProps) {
    if(nextProps.userInfo.username){
      this.setState({logined: true});
    }else{
      this.setState({logined: false});
    }
  }
  render() {
    const {url} = this.props.match;
    return (
      <div>
        <div>
          <Banner />
          <Menu 
            getArticleList={(value)=>{}} 
            categories={['Home','React','Express']}/>
        </div>
        <div className="front-container">
          <div className="content-container">
            <div className="content">
              <Switch>
                <Route exact path={url} component={Home}/>
                <Route component={NotFound}/>
              </Switch>
            </div>
          </div>
          <div className="login-container">
            {
              this.state.logined
              ? <Logined userInfo = {this.props.userInfo} logout={this.handleLogout.bind(this)}/> 
              : <Login login={this.props.login} register={this.props.register}/>
            }
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return{
    // categories: state.admin.tags,
    userInfo: state.globalState.userInfo
  }
}

function mapDispatchToProps(dispatch) {
  return{
    login: bindActionCreators(DispatchActions.get_login, dispatch),
    register: bindActionCreators(DispatchActions.register,dispatch),
    logout: bindActionCreators(DispatchActions.logout, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Front)