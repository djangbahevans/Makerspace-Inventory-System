import uuid from 'uuid';


export const addRequisition = ({ name, role = '', item, returnDate }) => ({
    type: 'ADD_REQUISITION',
    requisition: {
        id: uuid(),
        name,
        role,
        item,
        returnDate
    }
});

export const deleteRequisition = id => ({
    type: 'DELETE_REQUISITION',
    id
});

export const editRequisition = (id, updates) => ({
    type: 'EDIT_REQUISITION',
    id,
    updates
});

// TODO: Add edit requisition