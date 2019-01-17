import uuid from 'uuid';

export const addStock = ({ name, quantity, numberInStock }) => ({
    type: 'ADD_STOCK',
    stock: {
        id: uuid(),
        name,
        quantity,
        numberInStock
    }
})

export const removeStock = ({ id }) => ({
    type: 'REMOVE_STOCK',
    id
})

// TODO: Add edit stock
export const editStock = (id, updates) => ({
    type: 'EDIT_STOCK',
    id,
    updates
})