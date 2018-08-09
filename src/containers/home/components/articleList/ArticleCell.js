import React, { PureComponent } from 'react';
import Paper from '@material-ui/core/Paper';
import './style.css';

export default class ArticleCell extends PureComponent{
    render(){
        return(
            <Paper className="article-cell" elevation={1}>
                <h2>{this.props.data.title}</h2>
                <p>{this.props.data.summary}</p>
            </Paper>
        );
    };
}