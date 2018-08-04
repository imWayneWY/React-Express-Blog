import React, { PureComponent,Image } from 'react';
import ReactSwipe from 'react-swipe';

export default class Banner extends PureComponent{
    constructor(){
        super();
        this.state = {
            index: 1
        };
    }

    render(){
        const opt = {
            auto: 2500,
            callback: function(index){
                this.setState({index: index});
            }.bind(this)
        };
        return(
            <div>
                <ReactSwipe swipeOptions={opt}>
                    <img src={require('./banner_1.png')}/>
                    <img src={require('./banner_2.png')}/>
                    <img src={require('./banner_3.png')}/>
                </ReactSwipe>
            </div>
        );
    }
}