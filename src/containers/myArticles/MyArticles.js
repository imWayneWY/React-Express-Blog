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
        <Bar title="My Articles" func={()=>{this.props.toggleDrawer('myArticlesDrawer',false)}}/>
        {
            this.props.userInfo.userId
            ?
            <div>
                my articles function is comming soon...
            </div>

            :<div>Your session is over due,please login again.</div>
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