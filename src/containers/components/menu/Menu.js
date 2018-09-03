import React, { PureComponent } from 'react';
import {withRouter} from 'react-router-dom';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';


class Menu extends PureComponent {
  state = {
      value : 0
  };

  handleChange = (event,value) => {
      this.setState({value});
      if(value===0){
          this.props.getArticleList('',1);
      }else{
          this.props.getArticleList(this.props.categories[value-1],1);
      }
      let toPath = value===0? '' : '/'+this.props.categories[value-1];
      this.props.history.push(toPath);
  };
  componentWillReceiveProps(nextProps){
      let index = 0;

      index = nextProps.categories.indexOf(nextProps.history.location.pathname.replace('/',''));
      if(index<0){
          index = 0;
      }else{
          index+=1;
      }
      this.setState({
          value: index,
      });
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
export default withRouter(Menu);
