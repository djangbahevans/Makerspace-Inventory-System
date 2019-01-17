import { Card, CardActionArea, CardContent, CardMedia, Grid, Typography, withStyles, CardActions, Button } from "@material-ui/core";
import React, { Component } from 'react';
import CreateStockModal from "./CreateStockModal";


const styles = theme => ({
    media: {
        height: 200,
    },
})

class Stock extends Component {
    state = {
        editModalOpen: false,
    }

    handleClose = () => {
        this.setState({ editModalOpen: false })
    }

    render() {
        const { classes } = this.props;

        return (
            <Grid item xs={3}>
                {this.state.editModalOpen && <CreateStockModal
                    edit
                    name={this.props.title}
                    quantity={this.props.quantity}
                    numberInStock={this.props.numberInStock}
                    onClose={this.handleClose} />}

                <Card className={classes.card}>
                    <CardActionArea>
                        <CardMedia
                            className={classes.media}
                            image={this.props.image}
                            title={this.props.title}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">{this.props.title}</Typography>
                            <Grid container spacing={8}>
                                <Grid item xs={6}><Typography>Total: </Typography></Grid>
                                <Grid item xs={6}>{this.props.quantity}</Grid>
                                <Grid item xs={6}><Typography>Number in Stock: </Typography></Grid>
                                <Grid item xs={6}>{this.props.numberInStock}</Grid>
                            </Grid>
                        </CardContent>
                    </CardActionArea>
                    <CardActions>
                        <Button size="small" color="primary" fullWidth onClick={() => {this.setState({ editModalOpen: true })}}>
                            Edit</Button>
                    {/* TODO: Add edit button functionality */}
                    </CardActions>
                </Card>
            </Grid >
        );
    }
}

export default withStyles(styles)(Stock);