import React, { PureComponent } from 'react';
import ArticleCell from './ArticleCell';

export default class ArticleList extends PureComponent{
    render(){
        return(
            <div>
                {
                    this.props.data.map((item,index)=>(
                        <ArticleCell key={index} data={item}/>
                    ))
                }
            </div>
        );
    }
}