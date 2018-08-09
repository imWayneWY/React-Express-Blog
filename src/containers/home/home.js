import React, { PureComponent } from 'react'
import ArticleList from './components/articleList/ArticleList';
import './style.css';

export default class Home extends PureComponent {
  render() {
    //   const {login,register} = this.props;
    //   localStorage.setItem('userInfo',JSON.stringify(this.props.userInfo));
    // return (
    //   this.props.match.params.tag && (tag.infexOf(this.props.match.params.tag) === -1 || this.props.location.pathname.lastIndexOf('\/') > 0)
    //   ? <Redirect to='/404'/>
    //   :
    //   <div className={style.container}>
        
    //   </div>
    // )
    return(
      <div className="home-container">
        <ArticleList data={[
          {
            title: "React",
            summary: "React is nice ,I really love it"
          },{
            title: "express",
            summary: "I am studing express now"
          },{
            title: "mongodb",
            summary: "A new database to me"
          }
          ]}/> 
      </div>
    )
  }
}
