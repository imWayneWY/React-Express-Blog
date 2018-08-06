import React, { PureComponent } from 'react';
import ReactSwipe from 'react-swipe';
import './style.css';

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
            <div className="carousel-img-container">
                <ReactSwipe swipeOptions={opt}>
                    <img src={require('./banner_1.png')} alt=""/>
                    <img src={require('./banner_2.png')} alt=""/>
                    <img src={require('./banner_3.png')} alt=""/>
                </ReactSwipe>
            </div>
        );
    }
}