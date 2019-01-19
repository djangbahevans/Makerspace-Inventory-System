import { Badge, Button, Grid, Paper, Table, TableBody, TableCell, TableHead, TableRow, Typography, CircularProgress } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import { withStyles } from '@material-ui/core/styles';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PermanentDrawer from './PermanentDrawer';
import { startSetStock } from '../actions/stocks';
import { startSetRequisition } from '../actions/requistions';


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
        stocks: this.props.stocks,
        stocksLoaded: false,
        requisitionsLoaded: false,
    }

    componentDidMount = () => {
        if (this.props.stocks.length === 0) this.props.loadStocks().then(() => this.setState({ stocksLoaded: true }));
        else this.setState({ stocksLoaded: true })
        if (this.props.requisitions.length === 0) this.props.loadRequisitions().then(() => this.setState({ requisitionsLoaded: true }));
        else this.setState({ requisitionsLoaded: true })
    }

    handleSeeAll = name => () => this.props.history.push(name)

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <CssBaseline />
                <PermanentDrawer history={this.props.history} />
                <main className={classes.content}>
                    <div className={classes.toolbar} />
                    <Grid container spacing={24}>
                        <Grid item xs={12}>
                            <Paper>
                                <Grid container justify='space-between' alignItems='center'>
                                    <Grid item>
                                        <Badge badgeContent={this.props.requisitions.length} color='primary' className={classes.badge}>
                                            <Typography variant='h4' gutterBottom className={`${classes.paperHeading} ${classes.requisitionHeading}`}>Requisitions</Typography>
                                        </Badge>
                                    </Grid>
                                    <Grid item>
                                        <Button variant='outlined' color='primary' onClick={this.handleSeeAll('requisitions')} className={classes.seeAllButton}>See All</Button>
                                    </Grid>
                                </Grid>
                                <Divider variant='middle' />
                                <div className={classes.table}>
                                    {!this.state.stocksLoaded && <CircularProgress className={classes.progress} />}
                                    {this.state.stocksLoaded && <Table padding='dense'>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Name</TableCell>
                                                <TableCell>Role</TableCell>
                                                <TableCell>Item</TableCell>
                                                <TableCell>Return Date</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {this.props.requisitions.map((row, idx) => (
                                                <TableRow key={row.id}>
                                                    <TableCell>{row.name}</TableCell>
                                                    <TableCell>{row.role}</TableCell>
                                                    <TableCell>{row.item}</TableCell>
                                                    <TableCell>{row.returnDate.format('DD-MM-YYYY')}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>}
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
                                    {!this.state.requisitionsLoaded && <CircularProgress className={classes.progress} />}
                                    {this.state.requisitionsLoaded && <Table padding='dense'>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Item</TableCell>
                                                <TableCell>Quantity</TableCell>
                                                <TableCell>No in Stock</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {this.props.stocks.map((row, idx) => {
                                                if (idx < 3)
                                                    return (
                                                        <TableRow key={row.name}>
                                                            <TableCell>{row.name}</TableCell>
                                                            <TableCell>{row.quantity}</TableCell>
                                                            <TableCell>{row.numberInStock}</TableCell>
                                                        </TableRow>
                                                    );
                                            })}
                                        </TableBody>
                                    </Table>}
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

const mapStateToProps = ({ requisitions, stocks }) => ({ requisitions, stocks });

const mapDispatchToProps = dispatch => ({
    loadStocks: () => dispatch(startSetStock()),
    loadRequisitions: () => dispatch(startSetRequisition())
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(DashboardPage))
