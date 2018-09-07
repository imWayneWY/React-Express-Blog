import React, { PureComponent } from 'react';
import ArticleList from '../../components/articleList/ArticleList';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {actions} from '../../../reducers/adminManageArticle';
const {getAllArticleList} = actions;


class AdminManageArticle extends PureComponent{
    onlyShowAuditing(){

    }
    getAllArticleList(){

    }
    componentDidMount(){
        this.props.getAllArticleList(1,10);
    }
    render(){
        return(
            <div>
                <ArticleList
                    isManage={true}
                    onlyShowAuditing={this.onlyShowAuditing.bind(this)}
                    list={this.props.list}
                    total= {this.props.total}
                    page={this.props.pageNum}
                    rowsPerPage={this.props.rowsPerPage}
                    getList={this.getAllArticleList.bind(this)}/>
            </div>
        );
    }
}
function mapStateToProps(state){
    let {pageNum, list, total, rowsPerPage} = state.admin.articles;
    return {
        pageNum,
        list,
        total,
        rowsPerPage
    }
}
function mapDispatchToProps(dispatch){
    return {
        getAllArticleList: bindActionCreators(getAllArticleList,dispatch),
    }
}
export default connect(
        mapStateToProps,
        mapDispatchToProps,
    )(AdminManageArticle);