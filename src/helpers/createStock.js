import uuid from 'uuid'


function createStock(name, quantity, numberInStock) {
    const id = uuid()
    return { id, name, quantity, numberInStock };
}

export default createStock;