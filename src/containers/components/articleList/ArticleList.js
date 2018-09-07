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
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Switch from '@material-ui/core/Switch';

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
    },
});
class ArticleList extends PureComponent{
    state = {
        open: false,
        row: {},
        checked: false,
    }
    handleChangePage = (event, page) => {
        this.props.getList(page+1,this.props.rowsPerPage);
    };

    handleChangeRowsPerPage = event => {
        this.props.getList(this.props.pageNum, event.target.value);
    };
    handleChangeCheck = (event) => {
        this.setState({checked:event.target.checked});
        this.props.isManage
            ?this.props.onlyShowAuditing(event.target.checked)
            :this.props.onlyShowPublished(event.target.checked)
    }
    handleEdit = (event, id) => {
        event.preventDefault();
        event.stopPropagation();
        this.props.editArticle(id);
    };
    handleDelete = (event,id) => {
        event.preventDefault();
        event.stopPropagation();
        this.props.delArticle(id);        
    }
    handleDeal = (event,id,isPass) => {
        event.preventDefault();
        event.stopPropagation();
        this.props.dealArticle(id,isPass);
    }
    handleClick = (event, row) => {
        let content = row.content;
        if(content){
            row.showContent = content.replace(/\r\n/g,"</br>").replace(/\n/g,"<br>");}
        this.setState({
            row,
            open:true
        });
    };
    handleClose = () => {
        this.setState({open: false});
    };
    render(){
        const {classes} = this.props;
        return(
            <div className={classes.root}>
                <Paper>
                    <Switch 
                        checked={this.state.checked}
                        onChange={this.handleChangeCheck}
                        value="checked"
                    />
                    {
                        this.props.isManage
                        ?<span>Only show auditing</span>
                        :<span>Only show published</span>
                    }
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
                                    hover
                                    key={row.key}
                                    onClick={event=>this.handleClick(event,row)}
                                    >
                                        <TableCell>{row.title}</TableCell>
                                        <TableCell>{row.author}</TableCell>
                                        <TableCell>{row.time}</TableCell>
                                        <TableCell className={classes[process]}>{process}</TableCell>
                                        <TableCell>
                                            {
                                                this.props.isManage
                                                
                                                ?
                                                    process==='auditing'
                                                    ?<div>
                                                        <Button variant="contained" color='primary' size='small'
                                                            onClick={(event)=>this.handleDeal(event,row._id,true)}>Pass</Button>
                                                        <Button variant="contained" color='secondary' size='small'
                                                            onClick={(event)=>this.handleDeal(event,row._id,false)}>Veto</Button>
                                                    </div>
                                                    :<div>---</div>

                                                :
                                                    process==='published'
                                                    ?<div>---</div>
                                                    :<div>
                                                        <Button variant="contained" color='primary' size='small' 
                                                            onClick={(event)=>this.handleEdit(event,row._id)}>Edit</Button>
                                                        <Button variant="contained" color='secondary' size='small'
                                                            onClick={(event)=>this.handleDelete(event,row._id)}>Delete</Button>
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
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    scroll='paper'
                    aria-labelledby="scroll-dialog-title"
                >
                <DialogTitle id="scroll-dialog-title">{this.state.row.title}</DialogTitle>
                <DialogContent>
                    <div  dangerouslySetInnerHTML={{__html:this.state.row.showContent}}></div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleClose} color="primary">
                        Close
                    </Button>
                </DialogActions>
                </Dialog>
            </div>
        );
    };
}
export default withStyles(styles)(ArticleList);