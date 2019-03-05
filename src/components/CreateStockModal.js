import { Button, Modal, TextField, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import capitalizeWords from '../helpers/capitalizeWords';
import { ADD_STOCK_MUTATION, EDIT_STOCK_MUTATION, LOAD_STOCKS_QUERY } from '../queries/Queries';


function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const styles = theme => ({
    paper: {
        position: 'absolute',
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
        outline: 'none',
    },
    textField: {
        width: '30vw',
        display: 'block'
    }
});

class CreateStockModal extends Component {
    state = {
        id: this.props.id ? this.props.id : '',
        name: this.props.name ? this.props.name : '',
        quantity: this.props.quantity ? this.props.quantity : 1,
        numberInStock: this.props.numberInStock ? this.props.numberInStock : 0,
    }

    handleChange = name => event => {
        if (name == 'name') return this.setState({ name: capitalizeWords(event.target.value) });

        const num = Number.parseInt(event.target.value);
        if (name === 'quantity') {
            if (num != event.target.value) return; // Must be an integer
            if (!num || num <= 0) return  // Cannot be empty or Cannot be negative or zero
            if (this.state.numberInStock > num) this.setState({ numberInStock: num })
        }
        else if (name === 'numberInStock') {
            if (num != event.target.value) return; // Must be an integer
            if (isNaN(num) || num < 0 || num > this.state.quantity) return; // Cannot be empty or greater than quantity
        }

        this.setState({
            [name]: event.target.value
        });
    }

    handleAccept = queryFunction => () => {
        const { edit } = this.props;
        let { name, quantity, numberInStock, id } = this.state;

        quantity = parseInt(quantity);
        numberInStock = parseInt(numberInStock);

        if (edit) queryFunction({ variables: { quantity, numberInStock, id } })
        if (!edit) queryFunction({ variables: { name, quantity, numberInStock } })
    }

    render = () => {
        const { classes, edit } = this.props

        return (
            <Mutation
                mutation={edit ? EDIT_STOCK_MUTATION : ADD_STOCK_MUTATION}
                update={(cache, { data: { editStock, createStock } }) => {
                    const { stocks } = cache.readQuery({ query: LOAD_STOCKS_QUERY });
                    if (createStock) cache.writeQuery({
                        query: LOAD_STOCKS_QUERY,
                        data: stocks.push(createStock)
                    });
                    if (editStock) cache.writeQuery({
                        query: LOAD_STOCKS_QUERY,
                        data: stocks.map(stock => stock._id === editStock._id ? editStock : stock)
                    })
                }}
                onCompleted={() => {
                    this.props.history.push('/stock');
                    this.props.onClose();
                }}>
                {(post, { error }) => (
                    <Modal
                        open
                        onClose={this.props.onClose}
                    >
                        <div style={getModalStyle()} className={classes.paper}>
                            <Typography variant="h6" gutterBottom id="modal-title" align='center'>{this.props.edit ? 'Edit Stock' : 'Add New Stock'}</Typography>
                            {error && <Typography variant="body1" color="error" id="modal-title" align='center'>{error.message}</Typography>}
                            <form>
                                <TextField
                                    label="Name"
                                    className={classes.textField}
                                    value={this.state.name}
                                    onChange={this.handleChange('name')}
                                    margin="normal"
                                    InputProps={{
                                        readOnly: this.props.edit,
                                    }}
                                    fullWidth
                                    required
                                    autoFocus={!this.props.edit}
                                    error={!this.state.name}
                                />
                                <TextField
                                    label="Quantity"
                                    className={classes.textField}
                                    value={this.state.quantity}
                                    onChange={this.handleChange('quantity')}
                                    margin="normal"
                                    type="number"
                                    autoFocus={this.props.edit}
                                    fullWidth
                                    required
                                />
                                <TextField
                                    label="Number in Stock"
                                    className={classes.textField}
                                    value={this.state.numberInStock}
                                    onChange={this.handleChange('numberInStock')}
                                    margin="normal"
                                    type="number"
                                    fullWidth
                                    required
                                />
                                <Button
                                    onClick={this.handleAccept(post)}
                                    color='primary'
                                    variant='contained'
                                    fullWidth
                                >
                                    Accept</Button>
                            </form>
                        </div>
                    </Modal>
                )}
            </Mutation>
        )
    }
}

export default withStyles(styles)(CreateStockModal);