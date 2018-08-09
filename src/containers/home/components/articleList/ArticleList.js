import React, { PureComponent } from 'react';
import ArticleCell from './ArticleCell';
import './style.css';
export default class ArticleList extends PureComponent{
    render(){
        return(
            <div className="article-container">
                {
                    this.props.data.map((item,index)=>(
                        <ArticleCell key={index} data={item}/>
                    ))
                }
            </div>
        );
    }
}