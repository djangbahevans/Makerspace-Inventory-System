import { Badge, Button, Grid, Paper, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import { withStyles } from '@material-ui/core/styles';
import React from 'react';
import createRequisition from '../helpers/createRequisition';
import createStock from '../helpers/createStock';
import PermanentDrawer from './PermanentDrawer';


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
    seeAllButton: {
        margin: '0 40px 0 0',
        right: '40px'
    },
    table: {
        padding: '30px'
    }
});

const requisitions = [
    createRequisition('Evans Djangbah', 'Makerspace Associate', 'Hammer', '04-01-2019'),
    createRequisition('Linda Aidoo Lamptey', 'Administration Associate', 'Paint Brush', '16-01-2019'),
    createRequisition('Prince Banini', 'Technical Associate', 'Soldering Iron', '11-02-2019'),
    createRequisition('Prince Banini', 'Technical Associate', 'Solder', '11-02-2019'),
    createRequisition('Prince Banini', 'Technical Associate', 'Arduino', '11-02-2019'),
];

const stocks = [
    createStock('Hammer', 2, 1, 4),
    createStock('Screwdriver', 15, 3, 20),
    createStock('1.75mm filament', 'N/A', 0, 5),
]


class DashboardPage extends React.Component {
    render () {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <CssBaseline />
                <PermanentDrawer history={this.props.history}/>
                <main className={classes.content}>
                    <div className={classes.toolbar} />
                    <Grid container spacing={24}>
                        <Grid item xs={12}>
                            <Paper>
                                <Grid container justify='space-between' alignItems='center'>
                                    <Grid item>
                                        <Badge badgeContent={12} color='primary' className={classes.badge}>
                                            <Typography variant='h4' gutterBottom className={`${classes.paperHeading} ${classes.requisitionHeading}`}>Requisitions</Typography>
                                        </Badge>
                                    </Grid>
                                    <Grid item>
                                        <Button variant='outlined' color='primary' className={classes.seeAllButton}>See All</Button>
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
                                                <TableRow key={row.id}>
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
                        </Grid>
                        <Grid item xs={6}>
                            <Paper>
                                <Grid container justify='space-between' alignItems='center'>
                                    <Grid item>
                                        <Typography variant='h4' gutterBottom className={classes.paperHeading}>Stock</Typography>
                                    </Grid>
                                    <Grid item>
                                        <Button variant='outlined' color='primary' className={classes.seeAllButton}>See All</Button>
                                    </Grid>
                                </Grid>
                                <Divider variant='middle' />
                                <div className={classes.table}>
                                    <Table padding='dense'>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Item</TableCell>
                                                <TableCell>Quantity</TableCell>
                                                <TableCell>No in Stock</TableCell>
                                                <TableCell>Ideal Stock</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {stocks.map(row => (
                                                <TableRow key={row.id}>
                                                    <TableCell>{row.item}</TableCell>
                                                    <TableCell>{row.quantity}</TableCell>
                                                    <TableCell>{row.no_in_stock}</TableCell>
                                                    <TableCell>{row.ideal_stock}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </div>
                            </Paper>
                        </Grid>
                        <Grid item xs={6}>
                            <Paper>
                                <Typography variant='h1' className={classes.paperHeading}>Hello, world</Typography>
                            </Paper>
                        </Grid>
                    </Grid>
                </main>
            </div>
        );
    }
}

export default withStyles(styles)(DashboardPage);