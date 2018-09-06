import React, { PureComponent } from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import ArticleList from '../components/articleList/ArticleList';
import { actions as frontActions} from '../../reducers/frontReducer';
import Bar from '../../components/bar/Bar';
import { actions } from '../../reducers/';

const {get_article_detail} = actions;
const {getMyArticleList} = frontActions;

class MyArticles extends PureComponent {
  componentDidMount(){
      this.props.getMyArticleList(1,10);
  }
  editArticle(id){
      this.props.getArticleDetail(id);
      this.props.setNewArticle(false);
      this.props.toggleDrawer('editDrawer',true);
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
    };
}
function mapDispatchToProps(dispatch){
    return{
        getMyArticleList: bindActionCreators(getMyArticleList,dispatch),
        getArticleDetail: bindActionCreators(get_article_detail,dispatch),
    };
}
export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(MyArticles));