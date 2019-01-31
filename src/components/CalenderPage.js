import { Typography } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import { withStyles } from '@material-ui/core/styles';
import React, { Component } from 'react';
import PermanentDrawer from './Drawer';


const styles = theme => {
    console.log(theme)
    return ({
        root: {
            display: 'flex',
        },
        toolbar: theme.mixins.toolbar,
        content: {
            flexGrow: 1,
            backgroundColor: theme.palette.background.default,
            padding: theme.spacing.unit * 3,
            height: '100%'
        }
    })
};

class DashboardPage extends Component {
    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <CssBaseline />
                <PermanentDrawer history={this.props.history} />
                <main className={classes.content}>
                    <div className={classes.toolbar} />
                    <Typography variant="h1">This is the calender page</Typography>
                </main>
            </div>
        );
    }
}

export default withStyles(styles)(DashboardPage);
