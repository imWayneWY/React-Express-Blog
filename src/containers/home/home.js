import React, { PureComponent } from 'react'
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router-dom'
import ArticleList from './components/articleList/ArticleList';
import {connect} from 'react-redux'
import {actions as frontActions} from '../../reducers/frontReducer';
import LoadMore from './components/loadMore/LoadMore';

import './style.css';

const {getArticleList, setDrawer, setArticleId} = frontActions;
class Home extends PureComponent {
  state = {
    isLoadingMore: false,
  }
  componentDidMount(){
    this.props.getArticleList(this.props.match.params.tag || '');
  };
  handleOpenDetail = (articleId) => {
    this.props.setArticleId(articleId);
    this.props.setDrawer('detailDrawer',true);
  };
  loadMoreData() {
    console.log('load more')
    let pageNum = Number.parseInt(this.props.pageNum,10) + 1;
    this.setState({isLoadingMore: true,});
    this.props.getArticleList(this.props.match.params.tag || '',pageNum);
    this.setState({isLoadingMore: false});
  }
  render() {
    const {tags} = this.props;
    const {tag} = this.props.match.params;
    return(
      tags.length > 1 && tag && (tags.indexOf(tag) === -1 || this.props.location.pathname.lastIndexOf('/') > 0)
      ?
      <Redirect to='/404'/>
      :
      <div className="home-container">
        <ArticleList data={this.props.articleList} openDetail = {this.handleOpenDetail.bind(this)}/> 
        {
          this.props.endOfAll
          ? <div style={{textAlign: 'center'}}>No more data</div> 
          : <LoadMore
              isLoadingMore = {this.state.isLoadingMore}
              loadMoreFn = {this.loadMoreData.bind(this)}/>
        }
      </div>
    )
  }
}
function mapStateToProps(state){
  return {
    tags: state.admin.tags,
    pageNum: state.front.pageNum,
    endOfAll: state.front.endOfAll,
    articleList: state.front.articleList,
    detailDrawer: state.front.detailDrawer,
    isFetching: state.globalState.isFetching,
  };
}
function mapDispatchToProps(dispatch){
  return {
    getArticleList: bindActionCreators(getArticleList,dispatch),
    setDrawer: bindActionCreators(setDrawer,dispatch),
    setArticleId: bindActionCreators(setArticleId, dispatch),
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)