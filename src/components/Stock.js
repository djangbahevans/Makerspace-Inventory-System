import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Grid, Typography, withStyles } from "@material-ui/core";
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
            <Grid item xs={6} md={3}>
                {this.state.editModalOpen && <CreateStockModal
                    edit
                    id={this.props.id}
                    name={this.props.title}
                    quantity={this.props.quantity}
                    numberInStock={this.props.numberInStock}
                    onClose={this.handleClose}
                    history={this.props.history} />}

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
                        <Button size="small" color="primary" fullWidth onClick={() => { this.setState({ editModalOpen: true }) }}>
                            Edit
                        </Button>
                    </CardActions>
                </Card>
            </Grid >
        );
    }
}

export default withStyles(styles)(Stock);