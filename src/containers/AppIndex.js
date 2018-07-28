import React, { PureComponent } from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import NotFound from '../components/notFound/NotFound';
import Admin from './admin/Admin';
import Front from './front/Front';
import Loading from './components/loading/Loading';

class AppIndex extends PureComponent {
    openNotification(type,message){

    }
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
                            ? this.openNotification('success',this.props.notification.content)
                            : this.openNotification('error', this.props.notification.content)
                        )
                        : null
                    }
                </div>
            </Router>
        );
    };
}

export default AppIndex;