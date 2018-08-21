import React, { PureComponent } from 'react';
import Chip from '@material-ui/core/Chip';
class AdminManageTag extends PureComponent{
    handleDelete=()=>{
        console.log
    }
    render(){
        return(
            <div>
                <Chip
                    label="react"
                    onDelete={this.handleDelete}
                    // className={classes.chip}
                    color="default"
                />
                <Chip
                    label="express"
                    onDelete={this.handleDelete}
                    // className={classes.chip}
                    color="primary"
                />
            </div>
        );
    }
}

export default AdminManageTag;