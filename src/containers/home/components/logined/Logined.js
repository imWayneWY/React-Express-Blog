import React, { PureComponent } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {withRouter} from 'react-router-dom';
import './style.css';

class Logined extends PureComponent{
    handleLogout = (e) => {
        this.props.logout();
    }
    handleEdit = (e) => {
        this.props.setNewArticle(true);
        this.props.toggleDrawer('editDrawer',true);
    }
    render(){
        return(
            <div className="logined-container">
                <Card>
                    <CardMedia 
                        className = "head-portrait"
                        image={require('./me.jpeg')}
                        title="head portrait"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="headline" component="h2">
                            {this.props.userInfo.username} 
                        </Typography>
                        <Typography component="p">
                            {
                                this.props.userInfo.userState==="actived"
                                ?"Welcome to this blog."
                                :"Your account has been disabled. Please contact im.wayne.wy@gmail.com to get more infomation."
                            }
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small" color="primary" onClick={this.handleLogout.bind(this)}>
                            Logout
                        </Button>                        
                        {   
                            this.props.userInfo.userState==="actived"
                            ?<span>
                                <Button size="small" color="primary" onClick={this.handleEdit.bind(this)}>
                                    PublishBlog 
                                </Button>
                                <Button size="small" color="primary" onClick={() => {this.props.toggleDrawer('myArticlesDrawer',true)}}>
                                    My Articles 
                                </Button>
                            </span>
                            :null
                        }                        
                        {   
                            this.props.userInfo.userType==="admin"
                            ?<Button size="small" color="secondary" onClick={() => {this.props.history.push('/admin')}}>
                                Manage 
                            </Button>
                            :null
                        }
                    </CardActions>
                </Card>
            </div>
        );
    };
}
export default withRouter(Logined);