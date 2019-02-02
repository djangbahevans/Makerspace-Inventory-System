import { CssBaseline, Grid, CircularProgress } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Drawer from './Drawer';
import Stock from './Stock';
import { startSetStock } from '../actions/stocks';


const styles = theme => ({
    root: {
        display: 'flex',
    },
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing.unit * 3,
        height: '100%',
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
    progress: {
        margin: theme.spacing.unit * 2,
        position: 'absolute',
        top: '50%',
        left: '50%',
    },
});

class StockPage extends Component {
    state = {
        stocksLoaded: false,
        hasMore: true,
        page: 0
    }

    componentDidMount = () => {
        // if (this.props.stocks.length === 0) this.props.loadStocks(this.state.page).then(() => { this.state.page += 1; this.setState({ stocksLoaded: true }) });
        if (this.props.stocks.length === 0) this.props.loadStocks().then(() => {  this.setState({ stocksLoaded: true }) });
        else this.setState({ stocksLoaded: true });

        // window.onscroll = () => {
        //     const {
        //         loadStocks,
        //         state: {
        //             hasMore,
        //         },
        //     } = this;

        //     // Bails early if:
        //     // * there's an error
        //     // * it's already loading
        //     // * there's nothing left to load
        //     if (!hasMore) return;

        //     // Checks that the page has scrolled to the bottom
        //     if (
        //         window.innerHeight + document.documentElement.scrollTop
        //         === document.documentElement.offsetHeight
        //     ) {
        //         loadStocks();
        //     }
        // };
    }

    // loadStocks = () => {
    //     this.props.loadStocks(this.state.page);
    //     this.state.page += 1;
    //     console.log(`Current page: ${this.state.page}`)
    // }

    render = () => {
        const { classes } = this.props

        return (
            <div className={classes.root}>
                <CssBaseline />
                <Drawer history={this.props.history} />
                <main className={classes.content}>
                    <div className={classes.toolbar} />
                    {!this.state.stocksLoaded && <CircularProgress className={classes.progress} />}
                    {this.state.stocksLoaded && <Grid container spacing={40}>
                        {this.props.stocks.map(stock =>
                            <Stock
                                key={stock.id}
                                image={`./img/${stock.name.toLowerCase()}.jpg`}
                                id={stock.id}
                                title={stock.name}
                                header={stock.name}
                                quantity={stock.quantity}
                                numberInStock={stock.numberInStock}
                                history={this.props.history} />)}
                    </Grid>}
                </main>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    // loadStocks: page => dispatch(startGetStocks(page)),
    loadStocks: () => dispatch(startSetStock()),
});

const mapStateToProps = ({ stocks }) => ({ stocks })

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(StockPage));
