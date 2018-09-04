import React, { PureComponent } from 'react'
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { Redirect,withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import Bar from '../../components/bar/Bar';
const styles = () => ({

});
class MyArticles extends PureComponent {
  render() {
    return (
      <div>
        {
            this.props.userInfo.userId
            ?
            <div>
                <Bar title="My Articles"/>
            </div>
            :<Redirect to = '/'/>
        }
      </div>
    );
  }
}
function mapStateToProps(state) {
    return{
        userInfo: state.globalState.userInfo,
    };
}
function mapDispatchToProps(dispatch){
    return{
    };
}
export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(MyArticles)));