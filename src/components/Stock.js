import React, { Component } from 'react';
import { Card, CardActionArea, CardMedia, CardContent, Typography, withStyles, Grid } from "@material-ui/core";


const styles = theme => ({
    card: {
        // maxWidth: 345,
    },
    media: {
        height: 200,
    },
})

class Stock extends Component {

    render() {
        const { classes } = this.props;

        return (
            <Grid item xs={3}>
                <Card className={classes.card}>
                    <CardActionArea>
                        <CardMedia
                            className={classes.media}
                            image={this.props.image}
                            title={this.props.title}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">{this.props.header}</Typography>
                            <Grid container spacing={8}>
                                <Grid item xs={6}><Typography>Total: </Typography></Grid>
                                <Grid item xs={6}>{this.props.total}</Grid>
                                <Grid item xs={6}><Typography>Number in Stock: </Typography></Grid>
                                <Grid item xs={6}>{this.props.no_in_stock}</Grid>
                            </Grid>
                        </CardContent>
                    </CardActionArea>
                    {/* <CardActions>
                                    <Button size="small" color="primary">
                                        Share</Button>
                                    <Button size="small" color="primary">
                                        Learn More</Button>
                                </CardActions> */}
                </Card>
            </Grid>
        );
    }
}

export default withStyles(styles)(Stock);