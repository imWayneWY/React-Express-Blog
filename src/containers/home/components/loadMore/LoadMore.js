import React, { PureComponent } from 'react';
import Button from '@material-ui/core/Button';
import {withStyles} from '@material-ui/core/styles';

const styles = ()=> ({
    button: {
        width: '100%',
    },
});

class LoadMore extends PureComponent{
    loadMoreHandle = () => {
        this.props.loadMoreFn();
    };
    componentDidMount(){
        const loadMoreFn = this.props.loadMoreFn;
        const wrapper = this.refs.wrapper;
        console.log(wrapper);
        let timeoutId;
        function callback() {
            const top = wrapper.getBoundingClientRect().top;
            const windowHeight = window.screen.height;
            if(top && top < windowHeight) {
                loadMoreFn();
            }
        };
        window.addEventListener('scroll',function() {
            if (this.props.isLoadingMore){
                return;
            }
            if(timeoutId) {
                clearTimeout(timeoutId);
            }
            timeoutId = setTimeout(callback, 50);
        }.bind(this), false);
    };
    render(){
        const {classes} = this.props;
        return(
            <div ref='wrapper'>
            <Button
             className={classes.button}
             onClick={this.loadMoreHandle}>
                LoadMore
            </Button>
            </div>
        );
    };
}
export default withStyles(styles)(LoadMore);