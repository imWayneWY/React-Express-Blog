import React, { PureComponent } from 'react';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import {withStyles} from '@material-ui/core/styles';
const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
    },
    table: {
        minWidth: 500,
    },
    tableWrapper: {
        overflowX: 'auto',
    },
});

const rows = [
    {
        id: "001",
        username: "test",
        password: "sdfa",
        type: "ss",
        state: "sfd"
    },
    {
        id: "002",
        username: "test",
        password: "sdfa",
        type: "ss",
        state: "sfd"
    }
]
class AdminIndex extends PureComponent{
    render(){
        console.log("users");
        const {classes} = this.props;
        return(
            <Paper className={classes.root}>
                <div className={classes.tableWrapper}>
                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>username</TableCell>
                                <TableCell>password</TableCell>
                                <TableCell>type</TableCell>
                                <TableCell>state</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                rows.map(row=>{
                                    return(
                                        <TableRow key={row.id}>
                                            <TableCell>{row.id}</TableCell>
                                            <TableCell>{row.username}</TableCell>
                                            <TableCell>{row.password}</TableCell>
                                            <TableCell>{row.type}</TableCell>
                                            <TableCell>{row.state}</TableCell>
                                        </TableRow>
                                    );
                                })
                            }
                        </TableBody>
                    </Table>
                </div>
            </Paper>
        );
    }
}
export default withStyles(styles)(AdminIndex);