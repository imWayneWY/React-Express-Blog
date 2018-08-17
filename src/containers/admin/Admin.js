import React, { PureComponent } from 'react'
import { connect } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Drawer from '@material-ui/core/Drawer';
import {bindActionCreators} from 'redux';
import { actions } from '../../reducers';
import './style.css';

class Admin extends PureComponent {
    render() {
        console.log(this.props.userInfo);
        return (
            <div>
            {
                this.props.userInfo.userType==='admin'
                ?<div className="admin-container">
                    <AppBar position="absolute" className="admin-bar">
                        <Toolbar>
                            <h2>
                                Management Page
                            </h2>
                        </Toolbar>
                    </AppBar>
                     <Drawer
                      variant="permanent"
                    //   className="admin-drawer"
                    >
                        <div className="admin-drawer" >
                            <List>
                                <ListItem button>
                                    <ListItemText primary="Return to Home Page" />
                                </ListItem>
                                <ListItem button>
                                    <ListItemText primary="Manager Users" />
                                </ListItem>
                            </List>
                        </div>
                    </Drawer>
                    <main>
                    <p>{'You think water moves fast? You should see ice.'}</p>
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
)(Admin)