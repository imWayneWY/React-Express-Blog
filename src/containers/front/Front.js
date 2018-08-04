import React, { PureComponent } from 'react'
import { connect } from 'react-redux';
import Banner from "../components/banner/Banner";

class Front extends PureComponent {
  render() {
    // const {url} = this.props.match;
    // const {login, register} = this.props;
    return (
      <div>
        <div>
          <Banner />
          This is front page
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return{
    // categories: state.admin.tags,
    // userInfo: state.globalState.userInfo
  }
}

function mapDispatchToProps(dispatch) {
  return{

  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Front)