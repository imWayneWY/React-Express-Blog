import React, { PureComponent } from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';


export default class Menu extends PureComponent {
  state = {
      value : 0
  };

  handleChange = (event,value) => {
      this.setState({value});
      this.props.getArticleList(value);
  };

  render() {
    return (
        <Tabs 
          value = {this.state.value}
          onChange = {this.handleChange}
          indicatorColor = "primary"
          textColor="primary"
          centered>
            <Tab key='key-home' label='home'/>
            {
                this.props.categories.map((item) => (
                    <Tab key={'key-'+item} label={item}/>
                ))
            }
        </Tabs>
    )
  }
}
