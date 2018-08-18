import React, { PureComponent } from 'react'
import { connect } from 'react-redux';
import { Switch, Route, Link} from 'react-router-dom'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Drawer from '@material-ui/core/Drawer';
import {bindActionCreators} from 'redux';
import { actions } from '../../reducers';
import { withStyles } from '@material-ui/core/styles';
import AdminManageUser from './adminManageUser/AdminManageUser';
import AdminIndex from './adminIndex/AdminIndex';

const styles = theme => ({
    root: {
        flexGrow: 1,
        height: 430,
        zIndex: 1,
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
      },
      appBar: {
        zIndex: theme.zIndex.drawer + 1,
        height: 80,
      },
      drawerPaper: {
        position: 'relative',
        top: 80,
        width: 240,
      },
      toolbar: theme.mixins.toolbar,
      main: {
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
                    <AppBar position="absolute" className={classes.appBar}>
                        <Toolbar>
                            <h2>
                                Management Page
                            </h2>
                        </Toolbar>
                    </AppBar>
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
                                  to="/">
                                    <ListItemText primary="Return to Home Page" />
                                </ListItem>
                                <ListItem 
                                  button
                                  component={Link}
                                  to={`${url}/manageUser`}
                                >
                                    <ListItemText primary="Manage Users"/>
                                </ListItem>
                            </List>
                        </div>
                    </Drawer>
                    <main className = {classes.main}>
                        <div className = {classes.toolbar} />
                          <Switch>
                            <Route exact path={url} component={AdminIndex}/>
                            <Route path={`${url}/manageUser`} component={AdminManageUser}/>
                          </Switch>
                    </main>
              </div>
              :<div><p>You are not a administor, sorry.</p></div>
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
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(Admin));