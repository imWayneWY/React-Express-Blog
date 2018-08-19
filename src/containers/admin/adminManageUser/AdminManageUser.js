import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import {withStyles} from '@material-ui/core/styles';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {actions} from '../../../reducers/adminManageUser';
const {getUsers} = actions;

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


class AdminManageUser extends PureComponent{
    state = {
        open: false,
        user: {}
    };
    handleClick = (event,user) => {
        this.setState({
            open: true,
            user
        });
    };
    handleClose = () => {
        this.setState({
            open: false,
        })
    }
    handleChangePage = (event, page) => {
        this.props.getUsers(page+1,this.props.rowsPerPage);
    };

    handleChangeRowsPerPage = event => {
        this.props.getUsers(this.props.page,event.target.value);
    };
    componentDidMount(){
        if(this.props.list.length===0){
            this.props.getUsers();
        }
    }
    render(){
        const {classes} = this.props;
        console.log(this.state.openDialog);
        return(
            <div>
            <Paper className={classes.root}>
                <div className={classes.tableWrapper}>
                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow>
                                <TableCell>username</TableCell>
                                <TableCell>type</TableCell>
                                <TableCell>state</TableCell>
                                <TableCell>ID</TableCell>
                                <TableCell>password</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                this.props.list.map(row=>{
                                    return(
                                        <TableRow 
                                          key={row.key}
                                          hover
                                          onClick={event=>this.handleClick(event, row)}>
                                            <TableCell>{row.username}</TableCell>
                                            <TableCell>{row.type}</TableCell>
                                            <TableCell>{row.state}</TableCell>
                                            <TableCell>{row._id}</TableCell>
                                            <TableCell>{row.password}</TableCell>
                                        </TableRow>
                                    );
                                })
                            }
                        </TableBody>
                    </Table>
                </div>
                <TablePagination
                component="div"
                count={this.props.total}
                rowsPerPage={this.props.rowsPerPage}
                page={this.props.pageNum-1}
                backIconButtonProps={{
                    'aria-label': 'Previous Page',
                }}
                nextIconButtonProps={{
                    'aria-label': 'Next Page',
                }}
                onChangePage={this.handleChangePage}
                onChangeRowsPerPage={this.handleChangeRowsPerPage}
                />
            </Paper>
            <Dialog
            open={this.state.open}
            onClose={this.handleClose}
            aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">{`ID: ${this.state.user._id}`}</DialogTitle>
                
                <DialogContent>
                    <h2>USERNAME: {this.state.user.username}</h2>
                    <h4>TYPE: {this.state.user.type}</h4>
                    <h4>STATE: {this.state.user.state}</h4>
                    <h4>PASSWORD: {this.state.user.password}</h4>
                </DialogContent>
                
                <DialogActions>
                    <Button onClick={this.handleClose} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
            
            </div>
        );
    }
}
AdminManageUser.propsTypes = {
    pageNUm: PropTypes.number.isRequired,
    list: PropTypes.arrayOf(PropTypes.object),
    total:PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired
};

AdminManageUser.defaultProps = {
    pageNum: 1,
    list: [],
    total:0,
    rowsPerPage: 10
};

function mapStateToProps(state){
    let {pageNum, list, total, rowsPerPage} = state.admin.users;
    return {
        pageNum,
        list,
        total,
        rowsPerPage
    }
}
function mapDispatchToProps(dispatch){
    return {
        getUsers: bindActionCreators(getUsers,dispatch),
    }
}
export default withStyles(styles)(
    connect(
        mapStateToProps,
        mapDispatchToProps,
    )(AdminManageUser));