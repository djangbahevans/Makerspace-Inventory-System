import { IconButton, TableCell, TableRow } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import { DELETE_REQUISITION_MUTATION, LOAD_REQUISITIONS_QUERY, LOAD_STOCKS_QUERY } from '../Queries/Queries';


class RequisitionTableRow extends Component {
    state = {
        editModalOpen: true
    }

    render() {
        const { id } = this.props;

        return (
            <TableRow>
                <TableCell>{this.props.name}</TableCell>
                <TableCell>{this.props.role}</TableCell>
                <TableCell>{this.props.item}</TableCell>
                <TableCell>{this.props.returnDate}</TableCell>
                <TableCell>
                    <IconButton aria-label="Edit" onClick={this.props.handleEdit(this.props)} onClose={this.props.onClose}>
                        <EditIcon />
                    </IconButton>
                    <Mutation
                        update={(cache, { data: { deleteRequisition } }) => {
                            const {requisitions} = cache.readQuery({ query: LOAD_REQUISITIONS_QUERY });
                            const { stocks } = cache.readQuery({ query: LOAD_STOCKS_QUERY })
                            const index = requisitions.findIndex(requisition => requisition._id === deleteRequisition._id)

                            cache.writeQuery({
                                query: LOAD_STOCKS_QUERY,
                                data: stocks.map(stock => {
                                    if (stock._id !== deleteRequisition.item._id) return stock;
                                    ++stock.numberInStock
                                    return stock;
                                })
                            })
                            cache.writeQuery({
                                query: LOAD_REQUISITIONS_QUERY,
                                data: requisitions.splice(index, 1)
                            })
                        }}
                        mutation={DELETE_REQUISITION_MUTATION}>
                        {(deleteRequisition, { data }) => (
                            <IconButton aria-label="Delete" onClick={() => deleteRequisition({ variables: { id } })}>
                                <DeleteIcon />
                            </IconButton>
                        )}
                    </Mutation>
                </TableCell>
            </TableRow>
        );
    }
}

export default RequisitionTableRow;