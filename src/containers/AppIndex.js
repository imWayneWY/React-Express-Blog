import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import NotFound from '../components/notFound/NotFound';
import Notification from '../components/notification/Notification';
import { actions } from '../reducers';
import Admin from './admin/Admin';
import Loading from './components/loading/Loading';
import Front from './front/Front';

const {clear_msg , user_auth} = actions;


class AppIndex extends PureComponent {
    render(){
        let { isFetching } = this.props;
        return(
            <Router>
                <div>
                    <Switch>
                        <Route path = '/404' component={NotFound}/>
                        <Route path = '/admin' component={Admin}/>
                        <Route component={Front}/>
                    </Switch>
                    {isFetching && <Loading/>}
                    {this.props.notification && this.props.notification.content
                        ? (this.props.notification.type === 1
                            ? <Notification content={this.props.notification.content} type="success" clearMsg={this.props.clear_msg}/>
                            : <Notification content={this.props.notification.content} type="error" clearMsg={this.props.clear_msg}/>
                        )
                        : null
                    }
                </div>
            </Router>
        );
    };
    componentDidMount(){
        this.props.user_auth();
    }
}

function mapStateToProps(state) {
    return {
        notification: state.globalState.msg,
        isFetching: state.globalState.isFetching,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        clear_msg: bindActionCreators(clear_msg, dispatch),
        user_auth: bindActionCreators(user_auth, dispatch)
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AppIndex)