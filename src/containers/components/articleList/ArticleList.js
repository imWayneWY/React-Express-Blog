import React, { PureComponent } from 'react';
import {withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import Paper from '@material-ui/core/Paper';
const styles = ()=> ({
    root: {
        padding: '20px 20px 20px 20px',
    },
    published: {
        color: 'green',
    },
    draft: {
        color: 'black',
    },
    unpassed: {
        color: 'red',
    },
    auditing: {
        color: '#b2a300',
    }
});
class ArticleList extends PureComponent{
    handleChangePage = (event, page) => {
        this.props.getList(page+1,this.props.rowsPerPage);
    };

    handleChangeRowsPerPage = event => {
        this.props.getList(this.props.pageNum, event.target.value);
    };
    handleEdit = (event, id) => {
        this.props.editArticle(id);
    }
    render(){
        const {classes} = this.props;
        return(
            <div className={classes.root}>
                <Paper>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Title</TableCell>
                                <TableCell>Author</TableCell>
                                <TableCell>Last modified</TableCell>
                                <TableCell>state</TableCell>
                                <TableCell>Manage</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {
                            this.props.list.map(row=>{
                                let process = '';
                                if(row.state==='published'){
                                    process = 'published';
                                }else if(row.state==='saved'){
                                    process = 'draft';
                                }else if(row.state==='posted'){
                                    process = 'auditing';
                                }else{
                                    process = 'unpassed'
                                }
                                return(
                                    <TableRow
                                    key={row.key}
                                    >
                                        <TableCell>{row.title}</TableCell>
                                        <TableCell>{row.author}</TableCell>
                                        <TableCell>{row.time}</TableCell>
                                        <TableCell className={classes[process]}>{process}</TableCell>
                                        <TableCell>
                                            {
                                                this.props.isManage
                                                
                                                ?<div>
                                                    <Button variant="contained">View</Button>
                                                    <Button variant="contained" color='secondary'>Pass</Button>
                                                    <Button variant="contained" color='secondary'>Veto</Button>
                                                </div>

                                                :<div>
                                                        <Button variant="contained" color='primary' 
                                                                onClick={(event)=>this.handleEdit(event,row._id)}>Edit</Button>
                                                        <Button variant="contained" color='secondary'>Delete</Button>
                                                </div>
                                            }

                                        </TableCell>
                                    </TableRow>
                                )
                            })
                        }
                        </TableBody>
                    </Table>
                    <TablePagination
                    component="div"
                    count={this.props.total}
                    rowsPerPage={this.props.rowsPerPage}
                    page={this.props.page-1}
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
            </div>
        );
    };
}
export default withStyles(styles)(ArticleList);