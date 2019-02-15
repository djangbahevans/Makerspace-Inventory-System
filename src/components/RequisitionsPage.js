import { Badge, Button, CircularProgress, CssBaseline, Divider, Grid, Paper, Table, TableBody, TableCell, TableHead, TableRow, Typography, withStyles } from "@material-ui/core";
import moment from "moment";
import React from 'react';
import { Query } from "react-apollo";
import { LOAD_REQUISITIONS_QUERY } from "../Queries/Queries";
import CreateRequisitionModal from "./CreateRequisitionModal";
import Drawer from "./Drawer";
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
    progress: {
        margin: theme.spacing.unit * 2,
        position: 'absolute',
        top: '50%',
        left: '50%',
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
        returnDate: '',
        requisitionsLoaded: false
    }

    handleOpen = () => this.setState({ createModalOpen: true });

    handleEdit = ({ id, name, role, item, returnDate }) => () => {
        this.setState({
            editModalOpen: true,
            id,
            name,
            role,
            item,
            returnDate
        });
    };

    handleClose = () => this.setState({
        createModalOpen: false,
        editModalOpen: false
    })

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <CssBaseline />
                <Drawer history={this.props.history} />
                <main className={classes.content}>
                    <div className={classes.toolbar} />
                    {this.state.createModalOpen && <CreateRequisitionModal onClose={this.handleClose} />}
                    {this.state.editModalOpen && <CreateRequisitionModal edit
                        onClose={this.handleClose}
                        id={this.state.id}
                        name={this.state.name}
                        role={this.state.role}
                        returnDate={this.state.returnDate}
                        item={this.state.item} />}

                    {<Paper>
                        <Grid container justify='space-between' alignItems='center'>
                            <Grid item>
                                <Badge badgeContent={0} color='primary' className={classes.badge}>
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
                            <Query query={LOAD_REQUISITIONS_QUERY}>
                                {({ loading, error, data }) => {
                                    if (loading) return <CircularProgress />
                                    if (error) return <p>{error.message}</p>

                                    return (
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

                                                {data.requisitions.map(row => (
                                                    <RequisitionTableRow
                                                        key={row._id}
                                                        id={row._id}
                                                        name={row.name}
                                                        role={row.role}
                                                        item={row.item.name}
                                                        returnDate={
                                                            moment(row.returnDate, "YYYY-MM-DD").format("Do MMMM, YYYY")
                                                        }
                                                        handleEdit={this.handleEdit} />
                                                ))}
                                            </TableBody>
                                        </Table>
                                    );
                                }}
                            </Query>
                        </div>
                    </Paper>}
                </main>
            </div>
        );
    }
}


export default withStyles(styles)(RequistionsPage);
