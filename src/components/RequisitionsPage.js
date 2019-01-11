import React from 'react'
import { CssBaseline, withStyles, Paper, Typography, Table, TableCell, TableRow, TableHead, TableBody, Divider, Badge, Grid, Button } from "@material-ui/core";
import PropTypes from 'prop-types';
import PermanentDrawer from "./PermanentDrawer";
import createRequisition from '../helpers/createRequisition';


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
    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <CssBaseline />
                <PermanentDrawer history={this.props.history} />
                <main className={classes.content}>
                    <div className={classes.toolbar} />
                    <Paper>
                        <Grid container justify='space-between' alignItems='center'>
                            <Grid item>
                                <Badge badgeContent={12} color='primary' className={classes.badge}>
                                    <Typography variant='h4' gutterBottom className={`${classes.paperHeading} ${classes.requisitionHeading}`}>Requisitions</Typography>
                                </Badge>
                            </Grid>
                            <Grid item>
                                <Button variant='outlined' color='primary' className={classes.createNewButton}>Create New</Button>
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
                                    {requisitions.map(row => (
                                        <TableRow key={row.id} hover className={classes.clickable}>
                                            <TableCell>{row.name}</TableCell>
                                            <TableCell>{row.role}</TableCell>
                                            <TableCell>{row.item}</TableCell>
                                            <TableCell>{row.date_returned}</TableCell>
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