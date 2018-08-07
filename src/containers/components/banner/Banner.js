import React, { PureComponent } from 'react';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import './style.css';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

export default class Banner extends PureComponent{
    state = {
        index: 0,
    };

    handleChangeIndex = index => {
        this.setState({
            index,
        });
    };

    render(){
        const { index } = this.state;
        return(
            <div className="carousel-img-container">
                <AutoPlaySwipeableViews index={index} onChangeIndex={this.handleChangeIndex}>
                    <img src={require('./banner_1.png')} alt=""/>
                    <img src={require('./banner_2.png')} alt=""/>
                    <img src={require('./banner_3.png')} alt=""/>
                </AutoPlaySwipeableViews>
            </div>
        );
    }
}