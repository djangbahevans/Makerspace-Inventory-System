import uuid from 'uuid'


function createStock(name, quantity, numberInStock) {
    return { name, quantity, numberInStock };
}

export default createStock;