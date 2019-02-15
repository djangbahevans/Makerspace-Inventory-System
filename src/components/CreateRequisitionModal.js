import { Button, Modal, TextField, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import moment from 'moment';
import React from 'react';
import { Mutation, Query } from 'react-apollo';
import capitalizeWords from '../helpers/capitalizeWords';
import AutoSuggest from './Autosuggest';
import { EDIT_REQUISITION_MUTATION, CREATE_REQUISITION_MUTATION, GET_NAMES_QUERY } from '../Queries/Queries';


function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
};

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
        returnDate: this.props.returnDate ? moment(this.props.returnDate, 'YYYY-MM-DD') : moment(),
        dateError: false,
        error: '',
        stocks: []
    }

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

    handleAccept = queryFunction => () => {
        const { edit } = this.props;
        let { name, role, item, returnDate, id } = this.state;
        returnDate = returnDate.format("YYYY-MM-DD");

        if (edit) queryFunction({ variables: { role, returnDate, id } });
        if (!edit) queryFunction({ variables: { name, item, role, returnDate } });
    }

    render = () => {
        const { classes, edit } = this.props
        

        return (
            <Mutation
                mutation={edit ? EDIT_REQUISITION_MUTATION : CREATE_REQUISITION_MUTATION}
                update={() => {

                }}
                onCompleted={this.props.onClose} >
                {(post, { data, loading, error }) => (
                    <Modal
                        open
                        onClose={this.props.onClose}
                    >
                        <div style={getModalStyle()} className={classes.paper}>
                            <Typography variant="h6" gutterBottom id="modal-title" align='center'>{this.props.edit ? 'Edit Requisition' : 'Add New Requisition'}</Typography>
                            {error && <Typography variant="body1" color="error" id="modal-title" align='center'>{error.message}</Typography>}
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
                                <Query query={GET_NAMES_QUERY}>
                                    {({ loading, error, data }) => {
                                        if (loading || error) return (
                                            <AutoSuggest
                                                options={[]}
                                                onChange={this.handleChange('item')}
                                                value={this.state.item}
                                                label="Item *" />
                                        )

                                        let stocks = data.stocks.map(stock => ({ label: stock.name }))
                                        return (
                                            <AutoSuggest
                                                options={stocks}
                                                onChange={this.handleChange('item')}
                                                value={this.state.item}
                                                readOnly={this.props.edit}
                                                label="Item *" />
                                        )
                                    }}
                                </Query>
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


export default withStyles(styles)(CreateRequisitionModal);