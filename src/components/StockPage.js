import { CircularProgress, CssBaseline, Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { LOAD_STOCKS_QUERY } from '../queries/Queries';
import Drawer from './Drawer';
import Stock from './Stock';


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

    render = () => {
        const { classes } = this.props

        return (
            <div className={classes.root}>
                <CssBaseline />
                <Drawer history={this.props.history} />
                <main className={classes.content}>
                    <div className={classes.toolbar} />
                    <Query query={LOAD_STOCKS_QUERY}>
                        {({ loading, error, data }) => {
                            if (loading) return <CircularProgress className={classes.progress} />
                            if (error) return <p>Error occured</p>

                            return (
                                <Grid container spacing={40}>
                                    {data.stocks.map(stock =>
                                        <Stock
                                            key={stock._id}
                                            image={`./img/${stock.name.toLowerCase()}.jpg`}
                                            id={stock._id}
                                            title={stock.name}
                                            header={stock.name}
                                            quantity={stock.quantity}
                                            numberInStock={stock.numberInStock}
                                            history={this.props.history} />)}
                                </Grid>
                            )
                        }}
                    </Query>
                </main>
            </div>
        )
    }
}

export default withStyles(styles)(StockPage);
