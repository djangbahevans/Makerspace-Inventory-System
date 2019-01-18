const stockReducer = (state = [], action) => {
    switch (action.type) {
        case 'ADD_STOCK':
            return [...state, action.stock];
        case 'REMOVE_STOCK':
            return state.filter(({ name }) => name !== action.name);
        case 'EDIT_STOCK':
            return state.map((stock) => {
                if (stock.name === action.name) {
                    return {
                        ...stock,
                        ...action.updates
                    };
                }
                else {
                    return stock;
                }
            });
        case 'SET_STOCK':
            return action.stocks;
        default:
            return state;
    }
}

export default stockReducer;