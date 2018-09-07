import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import Bar from '../../components/bar/Bar';
import { actions } from '../../reducers/';
import { actions as frontActions } from '../../reducers/frontReducer';
import ArticleList from '../components/articleList/ArticleList';

const {get_article_detail} = actions;
const {getMyArticleList,delArticle} = frontActions;

class MyArticles extends PureComponent {

  componentDidMount(){
      this.props.getMyArticleList(1,10,false);
  }
  editArticle(id){
      this.props.getArticleDetail(id);
      this.props.setNewArticle(false);
      this.props.toggleDrawer('editDrawer',true);
  }
  delArticle(id){
      this.props.delArticle(id);
      this.props.getMyArticleList(this.props.page,this.props.rowsPerPage,this.props.onlyShowPublished);
  }
  onlyShowPublished(flg){
      this.props.getMyArticleList(this.props.page,this.props.rowsPerPage,flg);
  }
  render() {
    return (
      <div>
        <Bar title="My Articles" func={()=>{this.props.toggleDrawer('myArticlesDrawer',false)}}/>
        {
            this.props.userInfo.userId
            ?
            <div>
                <ArticleList
                    isManage={false}
                    editArticle={this.editArticle.bind(this)}
                    delArticle={this.delArticle.bind(this)}
                    onlyShowPublished={this.onlyShowPublished.bind(this)}
                    list={this.props.myArticleList}
                    total= {this.props.total}
                    page={this.props.page}
                    rowsPerPage={this.props.rowsPerPage}
                    getList={this.props.getMyArticleList.bind(this)}/>
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
        myArticleList: state.front.myArticleList,
        total: state.front.myArticleListTotal,
        page: state.front.myArticleListPageNum,
        rowsPerPage: state.front.myArticleListRowsPerPage,
        onlyShowPublished: state.front.onlyShowPublished,
    };
}
function mapDispatchToProps(dispatch){
    return{
        getMyArticleList: bindActionCreators(getMyArticleList,dispatch),
        getArticleDetail: bindActionCreators(get_article_detail,dispatch),
        delArticle: bindActionCreators(delArticle,dispatch),
    };
}
export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(MyArticles));