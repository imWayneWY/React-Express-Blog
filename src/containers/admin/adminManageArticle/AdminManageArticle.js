import React, { PureComponent } from 'react';
import ArticleList from '../../components/articleList/ArticleList';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {actions} from '../../../reducers/adminManageArticle';
const {getAllArticleList,dealArticle} = actions;


class AdminManageArticle extends PureComponent{
    onlyShowAuditing(flg){
        this.props.getAllArticleList(this.props.pageNum,this.props.rowsPerPage,flg);
    }
    getAllArticleList(pageNum,rowsPerPage){
        this.props.getAllArticleList(pageNum,rowsPerPage,this.props.onlyShowAuditing);
    }
    dealArticle(id,isPassing){
        if(isPassing){
            this.props.dealArticle(id,'published');
        }else{
            this.props.dealArticle(id,'unqualified');
        }
        this.props.getAllArticleList(this.props.pageNum,this.props.rowsPerPage,this.props.onlyShowAuditing);
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
                    dealArticle = {this.dealArticle.bind(this)}
                    getList={this.getAllArticleList.bind(this)}/>
            </div>
        );
    }
}
function mapStateToProps(state){
    let {pageNum, list, total, rowsPerPage, onlyShowAuditing} = state.admin.articles;
    return {
        pageNum,
        list,
        total,
        rowsPerPage,
        onlyShowAuditing,
    }
}
function mapDispatchToProps(dispatch){
    return {
        getAllArticleList: bindActionCreators(getAllArticleList,dispatch),
        dealArticle: bindActionCreators(dealArticle,dispatch),
    }
}
export default connect(
        mapStateToProps,
        mapDispatchToProps,
    )(AdminManageArticle);