import { IconButton, TableCell, TableRow } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import React, { Component } from 'react';


class RequisitionTableRow extends Component {
    state = {
        editModalOpen: true
    }

    render() {
        return (
            <TableRow>
                <TableCell>{this.props.name}</TableCell>
                <TableCell>{this.props.role}</TableCell>
                <TableCell>{this.props.item}</TableCell>
                <TableCell>{this.props.returnDate.format('DD-MM-YYYY')}</TableCell>
                <TableCell>
                    <IconButton aria-label="Edit" onClick={this.props.handleEdit(this.props)} onClose={this.props.onClose}>
                        <EditIcon />
                    </IconButton>
                    <IconButton aria-label="Delete" onClick={() => this.props.handleDelete(this.props.id)}>
                        <DeleteIcon />
                    </IconButton>
                </TableCell>
            </TableRow>
        );
    }
}

export default RequisitionTableRow;