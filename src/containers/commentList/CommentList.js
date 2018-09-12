import React, { PureComponent } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {actions} from '../../reducers/comment';
import CommentItem from './CommentItem';

const { getCommentList, reportComment } = actions;

class CommentList extends PureComponent{
    componentDidMount(){
        this.props.getCommentList(this.props.articleId);
    }
    handleReport(report){
        this.props.reportComment(report,this.props.articleId);
    }
    render(){
        return(
            <div style={{marginTop: '20px'}}>
                {
                    this.props.commentList.length
                    ?this.props.commentList.map(comment=>(
                        <CommentItem key={comment._id} item={comment} isUser={this.props.isUser} report={this.handleReport.bind(this)}/>
                    ))
                    :"There is no comment yet. You can be the first one to comment this article."
                }

            </div>
        );
    };
};
function mapStateToProps(state) {
    return{
        commentList: state.comment.list,
    };
};
function mapDispatchToProps(dispatch){
    return{
        getCommentList: bindActionCreators(getCommentList,dispatch),
        reportComment: bindActionCreators(reportComment,dispatch),
    };
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CommentList);