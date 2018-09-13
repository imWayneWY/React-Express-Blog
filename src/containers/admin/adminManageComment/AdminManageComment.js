import React, { PureComponent } from 'react';
import ManageCommentItem from './ManageCommentItem';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {actions} from '../../../reducers/adminManageComment';
const {getReportedCommentList, checkedComment, deleteComment} = actions;

class AdminManageComment extends PureComponent{
    componentDidMount(){
        this.props.getReportedCommentList();
    };
    handleOK(id){
        this.props.checkedComment(id);
    };
    handleNO(id){
        this.props.deleteComment(id);
    };
    render(){
        return(
            <div>
                {
                    this.props.list.length
                    ?this.props.list.map(item=>(
                        <ManageCommentItem key={item._id} comment={item}
                            handleOK={this.handleOK.bind(this)}
                            handleNO={this.handleNO.bind(this)}/>
                    ))
                    :"No comments need to deal now"
                }
            </div>
        )
    };
}
function mapStateToProps(state){
    return {
        list: state.admin.comments.list,
    }
}
function mapDispatchToProps(dispatch){
    return {
        getReportedCommentList: bindActionCreators(getReportedCommentList,dispatch),
        checkedComment: bindActionCreators(checkedComment,dispatch),
        deleteComment: bindActionCreators(deleteComment,dispatch),
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(AdminManageComment);