let stock_id = 0;
function createStock(item, quantity, no_in_stock, ideal_stock) {
    stock_id += 1;
    return { id: stock_id, item, quantity, no_in_stock, ideal_stock };
}

export default createStock;