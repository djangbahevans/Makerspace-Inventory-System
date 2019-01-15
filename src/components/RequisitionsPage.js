import { Badge, Button, CssBaseline, Divider, Grid, Paper, Table, TableBody, TableCell, TableHead, TableRow, Typography, withStyles } from "@material-ui/core";
import PropTypes from 'prop-types';
import React from 'react';
import createRequisition from '../helpers/createRequisition';
import PermanentDrawer from "./PermanentDrawer";
import CreateNewRequisitionModal from "./CreateNewRequisitionModal";


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
    clickable: {
        '&:hover': {
            cursor: 'pointer'
        }
    }
});

const requisitions = [
    createRequisition('Evans Djangbah', 'Makerspace Associate', 'Hammer', '04-01-2019'),
    createRequisition('Linda Aidoo Lamptey', 'Administration Associate', 'Paint Brush', '16-01-2019'),
    createRequisition('Prince Banini', 'Technical Associate', 'Soldering Iron', '11-02-2019'),
    createRequisition('Prince Banini', 'Technical Associate', 'Solder', '11-02-2019'),
    createRequisition('Prince Banini', 'Technical Associate', 'Arduino', '11-02-2019'),
];

class RequistionsPage extends React.Component {
    state = {
        modalOpen: false,
        requisitions: JSON.parse(JSON.stringify(requisitions))
    }

    handleOpen = () => this.setState({ modalOpen: true })

    handleClose = () => this.setState({ modalOpen: false })

    handleAccept = requisition => {
        const { name, role, item, returnDate } = requisition
        this.setState({
            requisitions: [...this.state.requisitions, createRequisition(name, role, item, returnDate)]
        })
    }

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <CssBaseline />
                <PermanentDrawer history={this.props.history} />
                <main className={classes.content}>
                    <div className={classes.toolbar} />
                    {this.state.modalOpen && <CreateNewRequisitionModal open={this.state.modalOpen} onClose={this.handleClose} onAccept={this.handleAccept} />}
                    <Paper>
                        <Grid container justify='space-between' alignItems='center'>
                            <Grid item>
                                <Badge badgeContent={this.state.requisitions.length} color='primary' className={classes.badge}>
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
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {this.state.requisitions.map(row => (
                                        <TableRow key={row.id} hover className={classes.clickable}>
                                            <TableCell>{row.name}</TableCell>
                                            <TableCell>{row.role}</TableCell>
                                            <TableCell>{row.item}</TableCell>
                                            <TableCell>{row.returnDate}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </Paper>
                </main>
            </div>
        )
    }
}

RequistionsPage.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(RequistionsPage);