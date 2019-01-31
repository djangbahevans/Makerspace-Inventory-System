import { CssBaseline, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import React from 'react';
import PermanentDrawer from './Drawer';


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
    mainContent: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
    }
})

const NotFoundPage = props => {
    const { classes } = props
    return (
        <div className={classes.root}>
            <CssBaseline />
            <PermanentDrawer history={props.history} />
            <div className={classes.content}>
                <div className={classes.toolbar} />
                <Typography variant='h1' className={classes.mainContent}>404 Not found</Typography>
            </div>
        </div>
    );
}

export default withStyles(styles)(NotFoundPage);