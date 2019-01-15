import { Button, Modal, TextField, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import moment from 'moment';
import React from 'react';


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

class CreateNewRequisitionModal extends React.Component {
    state = {
        open: true,
        name: '',
        role: '',
        item: '',
        returnDate: moment().format('YYYY-MM-D'),
        dateError: false,
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value
        });
        const returnDate = moment(event.target.value, moment.ISO_8601);
        const today = moment(moment().format('D MM YYYY'), 'D MM YYYY')
        if (name === 'returnDate') {
            if (returnDate.diff(today) < 0) this.setState({ dateError: true})
            else this.setState({ dateError: false })
        }
    }

    handleAccept = () => {
        const { name, role, item } = this.state;
        let returnDate = moment(this.state.returnDate, moment.ISO_8601);

        const today = moment(moment().format('D MM YYYY'), 'D MM YYYY')
        if (name && item && returnDate.diff(today, 'days') >= 0) {
            this.props.onAccept({
                name,
                role,
                item,
                returnDate: returnDate.format('D-MM-YYYY')
            });
            this.setState({ open: false })
            this.props.onClose()
        }
    }

    render = () => {
        const { classes } = this.props
        return (
            <Modal
                open={this.state.open}
                onClose={this.props.onClose}
            >
                <div style={getModalStyle()} className={classes.paper}>
                    <Typography variant="h6" gutterBottom id="modal-title" align='center'>Add New Requisition</Typography>
                    <form>
                        <TextField
                            label="Name"
                            className={classes.textField}
                            value={this.state.name}
                            onChange={this.handleChange('name')}
                            margin="normal"
                            fullWidth
                            required
                            autoFocus
                            error={!this.state.name}
                        />
                        <TextField
                            label="Role"
                            className={classes.textField}
                            value={this.state.role}
                            onChange={this.handleChange('role')}
                            margin="normal"
                            fullWidth
                        />
                        <TextField
                            label="Item"
                            className={classes.textField}
                            value={this.state.item}
                            onChange={this.handleChange('item')}
                            margin="normal"
                            fullWidth
                            required
                            error={!this.state.item}
                        />
                        <TextField
                            label="Return Date"
                            type="date"
                            className={classes.textField}
                            value={this.state.returnDate}
                            onChange={this.handleChange('returnDate')}
                            margin="normal"
                            fullWidth
                            required
                            error={this.state.dateError}
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

export default withStyles(styles)(CreateNewRequisitionModal);