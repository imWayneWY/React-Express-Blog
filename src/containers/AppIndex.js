import React, { PureComponent } from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import NotFound from '../components/notFound/NotFound';
import Admin from './admin/Admin';
import Front from './front/Front';
import Edit from './edit/Edit';
import Loading from './components/loading/Loading';
import Notification from '../components/notification/Notification';
import {bindActionCreators} from 'redux';
import { actions } from '../reducers';
import {connect} from 'react-redux';

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
                        <Route path = '/edit' component={Edit}/>
                        <Route component={Front}/>
                    </Switch>
                    {isFetching && <Loading/>}
                    {this.props.notification && this.props.notification.content
                        ? (this.props.notification.type === 1
                            ? <Notification content={this.props.notification.content} type="success"/>
                            : <Notification content={this.props.notification.content} type="error"/>
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