import { Button, Modal, TextField, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import moment from 'moment';
import React from 'react';
import { connect } from 'react-redux';
import { startAddRequisition, startEditRequisition } from '../actions/requistions';
import capitalizeWords from '../helpers/capitalizeWords';
import getNames from '../helpers/getNames';
import AutoSuggest from './Autosuggest';


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

class CreateRequisitionModal extends React.Component {
    state = {
        id: this.props.id ? this.props.id : '',
        name: this.props.name ? this.props.name : '',
        role: this.props.role ? this.props.role : '',
        item: this.props.item ? this.props.item : '',
        returnDate: this.props.returnDate ? moment(this.props.returnDate, 'DD-MM-YYYY') : moment(),
        returnDateText: this.props.returnDate ? moment(this.props.returnDate, 'DD-MM-YYYY').format('YYYY-MM-DD') : moment().format('YYYY-MM-DD'),
        dateError: false,
        error: '',
        stocks: []
    }

    componentDidMount = () => getNames(stocks => this.setState({ stocks: stocks.map((stock => ({ label: stock }))) }))

    handleChange = name => event => {
        if (name === 'returnDate') {
            const returnDate = moment(event.target.value, moment.ISO_8601);
            const today = moment(moment().format('DD MM YYYY'), 'DD MM YYYY')
            if (returnDate.diff(today) < 0) return this.setState({ dateError: true, error: 'The date must be today or in the future' })
            else return this.setState({ dateError: false, returnDate, error: '' })
        };
        if (name == 'item') {
            this.setState({ error: '' });
            return this.setState({ [name]: capitalizeWords(event) })
        }
        this.setState({
            [name]: capitalizeWords(event.target.value)
        });
    }

    handleAccept = () => {
        const { id, name, role, item, returnDate } = this.state;
        let error;
        if (name && item) {
            if (this.props.edit) return this.props.startEditRequisition(id, { role, item, returnDate })
                .then(() => this.props.onClose())
            else this.props.startAddRequisition({ name, role, item, returnDate }, err => {
                error = err
                this.setState({ error })
            }).then(() => { if (!error) this.props.onClose(); })
        }
    }

    render = () => {
        const { classes } = this.props

        return (
            <Modal
                open
                onClose={this.props.onClose}
            >
                <div style={getModalStyle()} className={classes.paper}>
                    <Typography variant="h6" gutterBottom id="modal-title" align='center'>{this.props.edit ? 'Edit Requisition' : 'Add New Requisition'}</Typography>
                    {this.state.error && <Typography variant="body1" color="error" id="modal-title" align='center'>{this.state.error}</Typography>}
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
                            autoFocus={!this.props.edit}
                            fullWidth
                            required
                            error={!this.state.name}
                        />
                        <TextField
                            label="Role"
                            className={classes.textField}
                            value={this.state.role}
                            onChange={this.handleChange('role')}
                            autoFocus={this.props.edit}
                            margin="normal"
                            fullWidth
                        />
                        <AutoSuggest
                            options={this.state.stocks}
                            onChange={this.handleChange('item')}
                            value={this.state.item}
                            label="Item *" />
                        <TextField
                            label="Return Date"
                            type="date"
                            className={classes.textField}
                            value={this.state.returnDate.format('YYYY-MM-DD')}
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

const mapDispatchToProps = dispatch => ({
    startEditRequisition: (id, requisition) => dispatch(startEditRequisition(id, requisition)),
    startAddRequisition: (requisition, cb) => dispatch(startAddRequisition(requisition, cb)),
});

export default connect(undefined, mapDispatchToProps)(withStyles(styles)(CreateRequisitionModal));