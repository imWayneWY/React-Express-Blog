import React, { PureComponent } from 'react'
import { connect } from 'react-redux';
import { Switch, Route, Link} from 'react-router-dom'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Drawer from '@material-ui/core/Drawer';
import { withStyles } from '@material-ui/core/styles';
import AdminManageUser from './adminManageUser/AdminManageUser';
import AdminIndex from './adminIndex/AdminIndex';
import AdminManageTag from './adminManageTag/AdminManageTag';
import AdminManageArticle from './adminManageArticle/AdminManageArticle';
import AdminManageComment from './adminManageComment/AdminManageComment';
import Bar from '../../components/bar/Bar';
import {withRouter} from 'react-router-dom';

const styles = theme => ({
    root: {
        zIndex: 1,
        overflow: 'hidden',
        display: 'flex',
      },
      appBar: {
        zIndex: theme.zIndex.drawer + 1,
        height: 80,
      },
      drawerPaper: {
        backgroundColor: '#eeeeee',
        top: 80,
        width: 240,
      },
      toolbar: theme.mixins.toolbar,
      main: {
          position: 'absolute',
          left: 240,
          marginTop: 50,
          marginLeft: 20,
      }
    })


class Admin extends PureComponent {
    render() {
        const {classes} = this.props;
        const {url} = this.props.match;
        return (
            <div>
            {
                this.props.userInfo.userType==='admin'
                ?<div className={classes.root}>
                    <Bar className={classes.appBar} title="Management Page" func={()=>{this.props.history.push('/')}}/>
                     <Drawer
                      variant="permanent"
                      classes={{
                        paper: classes.drawerPaper,
                      }}
                    >
                        <div className={classes.toolbar} >
                            <List>

                                <ListItem 
                                  button 
                                  component={Link}
                                  to={`${url}/manageUser`}
                                >
                                    <ListItemText primary="Manage Users"/>
                                </ListItem>

                                <ListItem 
                                  button
                                  component={Link}
                                  to={`${url}/manageArticle`}
                                >
                                    <ListItemText primary="Manage Articles"/>
                                </ListItem>
                                
                                <ListItem 
                                  button
                                  component={Link}
                                  to={`${url}/manageComment`}
                                >
                                    <ListItemText primary="Manage Comments"/>
                                </ListItem>

                                <ListItem 
                                  button
                                  component={Link}
                                  to={`${url}/manageTag`}
                                >
                                    <ListItemText primary="Manage Tags"/>
                                </ListItem>
                            </List>
                        </div>
                    </Drawer>
                    <main className = {classes.main}>
                        <div className = {classes.toolbar} />
                          <Switch>
                            <Route exact path={url} component={AdminIndex}/>
                            <Route path={`${url}/manageUser`} component={AdminManageUser}/>
                            <Route path={`${url}/manageTag`} component={AdminManageTag}/>
                            <Route path={`${url}/manageArticle`} component={AdminManageArticle}/>
                            <Route path={`${url}/manageComment`} component={AdminManageComment}/>
                          </Switch>
                    </main>
              </div>
              :<div><p>You are not a administor. Or you have not login yet.</p></div>
            }
            </div>
        )
    }
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
export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(Admin)));