import React, { PureComponent } from 'react';
import ArticleCell from './ArticleCell';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: 660,
      },
});
class ArticleList extends PureComponent{
    render(){
        const {classes} = this.props;
        return(
            <div className={classes.root}>
                {
                    this.props.data.map((item,index)=>(
                        <ArticleCell key={index} data={item}/>
                    ))
                }
            </div>
        );
    }
}
export default withStyles(styles)(ArticleList);