import { Badge, Button, CssBaseline, Divider, Grid, Paper, Table, TableBody, TableCell, TableHead, TableRow, Typography, withStyles } from "@material-ui/core";
import React from 'react';
import { connect } from 'react-redux';
import { startAddRequisition, startDeleteRequisition, startEditRequisition } from "../actions/requistions";
import CreateRequisitionModal from "./CreateRequisitionModal";
import PermanentDrawer from "./PermanentDrawer";
import RequisitionTableRow from "./RequisitionTableRow";


const styles = theme => ({
    root: {
        display: 'flex',
    },
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing.unit * 3,
        height: '100%'
    },
    badge: {
        margin: '25px'
    },
    paperHeading: {
        margin: '25px',
        padding: `0 ${theme.spacing.unit * 2}px`,
    },
    requisitionHeading: {
        margin: '0'
    },
    createNewButton: {
        margin: '0 40px 0 0',
        right: '40px'
    },
    table: {
        padding: '30px'
    },
});

class RequistionsPage extends React.Component {
    state = {
        createModalOpen: false,
        editModalOpen: false,
        id: '',
        name: '',
        role: '',
        item: '',
        returnDate: ''
    }

    requisitions = this.props.requisitions

    handleOpen = () => this.setState({ createModalOpen: true });

    handleEdit = ({id, name, role, item, returnDate }) => () => {
        this.setState({
            editModalOpen: true,
            id,
            name,
            role,
            item,
            returnDate
        })
    };

    handleClose = () => this.setState({
        createModalOpen: false,
        editModalOpen: false
    })


    handleAccept = ({ id, name, role, item, returnDate }, edit) => {
        if (edit) return this.props.startEditRequisition(id, { role, item, returnDate })
        this.props.startAddRequisition({ name, role, item, returnDate });
    }

    handleDelete = id => this.props.startDeleteRequisition(id)

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <CssBaseline />
                <PermanentDrawer history={this.props.history} />
                <main className={classes.content}>
                    <div className={classes.toolbar} />
                    {this.state.createModalOpen && <CreateRequisitionModal onClose={this.handleClose} onAccept={this.handleAccept} />}
                    {this.state.editModalOpen && <CreateRequisitionModal edit
                        onClose={this.handleClose}
                        onAccept={this.handleAccept}
                        id={this.state.id}
                        name={this.state.name}
                        role={this.state.role}
                        returnDate={this.state.returnDate}
                        item={this.state.item} />}
                    <Paper>
                        <Grid container justify='space-between' alignItems='center'>
                            <Grid item>
                                <Badge badgeContent={this.props.requisitions.length} color='primary' className={classes.badge}>
                                    <Typography variant='h4' gutterBottom className={`${classes.paperHeading} ${classes.requisitionHeading}`}>Requisitions</Typography>
                                </Badge>
                            </Grid>
                            <Grid item>
                                <Button
                                    variant='outlined'
                                    color='primary'
                                    className={classes.createNewButton}
                                    onClick={this.handleOpen}>Create New</Button>
                            </Grid>
                        </Grid>
                        <Divider variant='middle' />
                        <div className={classes.table}>
                            <Table padding='dense'>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Role</TableCell>
                                        <TableCell>Item</TableCell>
                                        <TableCell>Return Date</TableCell>
                                        <TableCell></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {this.props.requisitions.map(row => (
                                        <RequisitionTableRow
                                            key={row.id}
                                            id={row.id}
                                            name={row.name}
                                            role={row.role}
                                            item={row.item}
                                            returnDate={row.returnDate}
                                            handleEdit={this.handleEdit}
                                            handleDelete={this.handleDelete} />
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </Paper>
                </main>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    startAddRequisition: requisition => dispatch(startAddRequisition(requisition)),
    startEditRequisition: (id, requisition) => dispatch(startEditRequisition(id, requisition)),
    startDeleteRequisition: id => dispatch(startDeleteRequisition(id))
})
const mapStateToProps = ({ requisitions }) => ({ requisitions })

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(RequistionsPage));
