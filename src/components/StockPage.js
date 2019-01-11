import React, { Component } from 'react';
import { Card, CardActionArea, CardMedia, CssBaseline, Grid, Typography, CardContent, CardActions, Button, Paper } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import PermanentDrawer from './PermanentDrawer';
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
                    {/* <Paper> */}
                        <Grid container spacing={40}>
                            <Stock image='./img/hammer.jpg' title='Wood hammer' header='Hammer' total={2} no_in_stock={1} />
                            <Stock image='./img/hammer.jpg' title='Wood hammer' header='Hammer' total={2} no_in_stock={1} />
                            <Stock image='./img/hammer.jpg' title='Wood hammer' header='Hammer' total={2} no_in_stock={1} />
                            <Stock image='./img/hammer.jpg' title='Wood hammer' header='Hammer' total={2} no_in_stock={1} />
                            <Stock image='./img/hammer.jpg' title='Wood hammer' header='Hammer' total={2} no_in_stock={1} />
                            <Stock image='./img/hammer.jpg' title='Wood hammer' header='Hammer' total={2} no_in_stock={1} />
                            <Stock image='./img/hammer.jpg' title='Wood hammer' header='Hammer' total={2} no_in_stock={1} />
                            <Stock image='./img/hammer.jpg' title='Wood hammer' header='Hammer' total={2} no_in_stock={1} />
                            <Stock image='./img/hammer.jpg' title='Wood hammer' header='Hammer' total={2} no_in_stock={1} />
                            <Stock image='./img/hammer.jpg' title='Wood hammer' header='Hammer' total={2} no_in_stock={1} />
                            <Stock image='./img/hammer.jpg' title='Wood hammer' header='Hammer' total={2} no_in_stock={1} />
                        </Grid>
                    {/* </Paper> */}
                </main>
            </div>
        )
    }
}

export default withStyles(styles)(StockPage);
