import createStock from "../helpers/createStock";

const defaultStocks = [
    createStock('Hammer', 2, 1, 4),
    createStock('Screwdriver', 15, 3, 20),
    createStock('3D Printer', 3, 3, 5),
]

const stockReducer = (state = defaultStocks, action) => {
    switch (action.type) {
        case 'ADD_STOCK':
            return [...state, action.stock]
        case 'REMOVE_STOCK':
            return state.filter(({ id }) => id !== action.id)
        case 'EDIT_STOCK':
            return state.map((stock) => {
                if (stock.id === action.id) {
                    return {
                        ...stock,
                        ...action.updates
                    } 
                }
                else {
                    return stock;
                }
            })
        default:
            return state
    }
}

export default stockReducer;