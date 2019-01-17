import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import moment from 'moment';
import { Typography, TextField, Modal, Button } from '@material-ui/core';
import { connect } from 'react-redux'
import { addStock, editStock } from '../actions/stocks';


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

class CreateRequisitionModal extends Component {
    state = {
        name: this.props.name ? this.props.name : '',
        quantity: this.props.quantity ? this.props.quantity : 1,
        numberInStock: this.props.numberInStock ? this.props.numberInStock : 0,
    }

    handleChange = name => event => {
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

    handleAccept = () => {
        const { name, quantity, numberInStock } = this.state;
        if (this.props.edit) return
        if (name) {
            this.props.addStock({ name, quantity, numberInStock })
            this.props.onClose()
        }
    }

    render = () => {
        const { classes } = this.props
        console.log(this.props.edit)
        return (
            <Modal
                open
                onClose={this.props.onClose}
            >
                <div style={getModalStyle()} className={classes.paper}>
                    <Typography variant="h6" gutterBottom id="modal-title" align='center'>{this.props.edit ? 'Edit Stock' : 'Add New Stock'}</Typography>
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
                        // error={!this.state.numberInStock}
                        />
                        <Button
                            onClick={this.handleAccept}
                            color='primary'
                            variant='contained'
                            fullWidth
                        >
                            Accept</Button>
                    </form>
                </div>
            </Modal>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    addStock: stock => dispatch(addStock(stock)),
    editStock: (id, stock) => dispatch(editStock(id, stock))
})

export default connect(undefined, mapDispatchToProps)(withStyles(styles)(CreateRequisitionModal));