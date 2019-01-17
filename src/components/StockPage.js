import { CssBaseline, Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import React, { Component } from 'react';
import PermanentDrawer from './PermanentDrawer';
import Stock from './Stock';
import { connect } from 'react-redux';


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
    }
});

class StockPage extends Component {

    render = () => {
        const { classes } = this.props
        return (
            <div className={classes.root}>
                <CssBaseline />
                <PermanentDrawer history={this.props.history} />
                <main className={classes.content}>
                    <div className={classes.toolbar} />
                        <Grid container spacing={40}>
                            {this.props.stocks.map(stock => 
                                <Stock
                                    key={stock.id}
                                    image={`./img/${stock.name.toLowerCase()}.jpg`}
                                    title={stock.name}
                                    header={stock.name}
                                    quantity={stock.quantity}
                                    numberInStock={stock.numberInStock} />)}
                        </Grid>
                </main>
            </div>
        )
    }
}

const mapStateToProps = ({ stocks }) => ({ stocks })

export default connect(mapStateToProps)(withStyles(styles)(StockPage));
