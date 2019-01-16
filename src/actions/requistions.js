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
})


export const removeRequisition = ({ id }) => ({
    type: 'REMOVE_REQUISITION',
    id
})

// TODO: Add edit requisition