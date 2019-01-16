import uuid from 'uuid'


function createStock(item, quantity, no_in_stock, ideal_stock) {
    const id = uuid()
    return { id, item, quantity, no_in_stock, ideal_stock };
}

export default createStock;