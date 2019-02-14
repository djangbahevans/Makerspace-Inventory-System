import { Badge, Button, CircularProgress, Grid, Paper, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import { withStyles } from '@material-ui/core/styles';
import gql from "graphql-tag";
import React, { Component } from 'react';
import { Query } from 'react-apollo';
import Drawer from './Drawer';
import moment from 'moment';


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
        padding: '30px',
        position: 'relative'
    },
    progress: {
        margin: theme.spacing.unit * 2,
        position: 'absolute',
        top: '50%',
        left: '50%',
    },
});

class DashboardPage extends Component {
    state = {
        requisitions: [],
        stocks: []
    }

    handleSeeAll = name => () => this.props.history.push(name)

    render() {
        const { classes } = this.props;
        const loadRequisitionsQuery = gql`
        {
            requisitions {
                _id
                name
                role
                returnDate
                item {
                    name
                }
            }
        }
        `
        const loadStocksQuery = gql`
        {
            stocks {
                _id
                name
                quantity
                numberInStock
            }
        }
        `

        return (
            <div className={classes.root}>
                <CssBaseline />
                <Drawer history={this.props.history} />
                <main className={classes.content}>
                    <div className={classes.toolbar} />
                    <Grid container spacing={24}>
                        <Grid item xs={12}>
                            <Paper>
                                <Grid container justify='space-between' alignItems='center'>
                                    <Grid item>
                                        <Badge badgeContent={this.state.requisitions.length} color='primary' className={classes.badge}>
                                            <Typography variant='h4' gutterBottom className={`${classes.paperHeading} ${classes.requisitionHeading}`}>Requisitions</Typography>
                                        </Badge>
                                    </Grid>
                                    <Grid item>
                                        <Button variant='outlined' color='primary' onClick={this.handleSeeAll('requisitions')} className={classes.seeAllButton}>See All</Button>
                                    </Grid>
                                </Grid>
                                <Divider variant='middle' />
                                <div className={classes.table}>
                                    <Query query={loadRequisitionsQuery}>
                                        {({ loading, error, data }) => {
                                            if (loading) return <CircularProgress className={classes.progress} />
                                            if (error) return <p>{error.message}</p>

                                            return (
                                                <Table padding='dense' >
                                                    <TableHead>
                                                        <TableRow>
                                                            <TableCell>Name</TableCell>
                                                            <TableCell>Role</TableCell>
                                                            <TableCell>Item</TableCell>
                                                            <TableCell>Return Date</TableCell>
                                                        </TableRow>
                                                    </TableHead>

                                                    <TableBody>
                                                        {data.requisitions.map((row, idx) => {
                                                            if (idx < 5) {
                                                                return (
                                                                    <TableRow key={row._id}>
                                                                        <TableCell>{row.name}</TableCell>
                                                                        <TableCell>{row.role}</TableCell>
                                                                        <TableCell>{row.item.name}</TableCell>
                                                                        <TableCell>{moment(row.returnDate, "YYYY-MM-DD").format("Do MMMM, YYYY")}</TableCell>
                                                                    </TableRow>
                                                                )
                                                            }
                                                        })}

                                                    </TableBody>
                                                </Table>
                                            )
                                        }}
                                    </Query>
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
                                        <Button variant='outlined' color='primary' onClick={this.handleSeeAll('stock')} className={classes.seeAllButton}>See All</Button>
                                    </Grid>
                                </Grid>
                                <Divider variant='middle' />
                                <div className={classes.table}>
                                    <Query query={loadStocksQuery}>
                                        {({ loading, error, data }) => {
                                            if (loading) return <CircularProgress className={classes.progress} />
                                            if (error) return <p>{error.message}</p>

                                            return (
                                                <Table padding='dense'>
                                                    <TableHead>
                                                        <TableRow>
                                                            <TableCell>Item</TableCell>
                                                            <TableCell>Quantity</TableCell>
                                                            <TableCell>No in Stock</TableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        {data.stocks.map((row, idx) => {
                                                            if (idx < 3)
                                                                return (
                                                                    <TableRow key={row._id}>
                                                                        <TableCell>{row.name}</TableCell>
                                                                        <TableCell>{row.quantity}</TableCell>
                                                                        <TableCell>{row.numberInStock}</TableCell>
                                                                    </TableRow>
                                                                );
                                                        })}
                                                    </TableBody>
                                                </Table>
                                            )
                                        }}
                                    </Query>
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
