import qs from 'qs';

const addStock = stock => ({
    type: 'ADD_STOCK',
    stock
});

export const startAddStock = stockData => {
    return dispatch => {
        const { name, quantity, numberInStock } = stockData
        const stock = { name, quantity, numberInStock };
        return fetch(`/api/stock`, {
            method: 'POST',
            body: qs.stringify({ name, quantity, numberInStock }),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(res => res.json().then(data => dispatch(addStock({ id: data._id, ...stock }))))
    };
};

const getStocks = stocks => ({
    type: 'GET_STOCKS',
    stocks
});

export const startGetStocks = page => {
    return dispatch => {
        return fetch(`/api/stock/${page}`).then(res =>
            res.json().then(data => {
                const stocks = [];
                data.map(stock => stocks.push({ id: stock._id, ...stock }));
                dispatch(getStocks(stocks))
            })
        );
    };
};

const removeStock = ({ name }) => ({
    type: 'REMOVE_STOCK',
    name
});

export const editStock = (id, updates) => ({
    type: 'EDIT_STOCK',
    id,
    updates
});

export const startEditStock = (id, updates) => {
    return dispatch => {
        return fetch(`/api/stock/${id}`, {
            method: 'POST',
            body: qs.stringify(updates),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(() => dispatch(editStock(id, updates)));
    };
};

const setStock = stocks => ({
    type: 'SET_STOCK',
    stocks
});

export const startSetStock = () => {
    return dispatch => {
        return fetch('/api/stock').then(res =>
            res.json().then((data) => {
                const stocks = [];
                data.map(stock => stocks.push({ id: stock._id, ...stock }));
                dispatch(setStock(stocks));
            })
        )
    };
};