import React, { PureComponent } from 'react';
import Paper from '@material-ui/core/Paper';

export default class ArticleCell extends PureComponent{
    render(){
        return(
            <Paper elevation={1}>
                <h2>{this.props.data.title}</h2>
                <p>{this.props.data.summary}</p>
            </Paper>
        );
    };
}