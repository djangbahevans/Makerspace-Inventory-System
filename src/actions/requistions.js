import moment from 'moment';
import qs from 'qs';
import { editStock } from './stocks';


const addRequisition = ({ id, name, role = '', item, returnDate }) => ({
    type: 'ADD_REQUISITION',
    requisition: {
        id,
        name,
        role,
        item,
        returnDate
    }
});

export const startAddRequisition = (requisitionData, cb) => {
    return dispatch => {
        const { name, role, item, returnDate } = requisitionData;
        const convertedReturnDate = returnDate.toDate()
        return fetch('/api/requisition', {
            method: 'POST',
            credentials: "same-origin",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: qs.stringify({ name, role, item, returnDate: convertedReturnDate })
        }).then(response => response.json().then(data => {
            const { error } = data;
            if (!error) {
                let { name, role, item, returnDate } = data.requisition
                const id = data.requisition._id
                const { _id, ...stock } = data.stock
                returnDate = moment(returnDate)
                dispatch(editStock(_id, stock))
                return dispatch(addRequisition({ id, name, role, item, returnDate }))
            };
            return cb(error);
        }));
    }
}

const deleteRequisition = id => ({
    type: 'DELETE_REQUISITION',
    id
});

export const startDeleteRequisition = (id) => {
    return dispatch => {
        return fetch(`/api/requisition/${id}`, {
            method: 'DELETE',
            credentials: "same-origin"
        }).then(res => res.json().then(data => {
            dispatch(deleteRequisition(id))
            dispatch(editStock(data._id, data))
        }))
    }
}

const editRequisition = (id, updates) => ({
    type: 'EDIT_REQUISITION',
    id,
    updates
});


export const startEditRequisition = (id, updates) => {
    return dispatch => {
        return fetch(`/api/requisition/${id}`, {
            method: 'POST',
            credentials: "same-origin",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: qs.stringify({ ...updates, returnDate: updates.returnDate.toDate() })
        }).then(res => res.json().then(data => {
            const { newStock, oldStock } = data
            dispatch(editRequisition(id, updates));
            dispatch(editStock(newStock._id, { numberInStock: newStock.numberInStock }))
            dispatch(editStock(oldStock._id, { numberInStock: oldStock.numberInStock }))
        }))
    }
}

const setRequisition = requisitions => ({
    type: 'SET_REQUISITION',
    requisitions
});

export const startSetRequisition = () => {
    return dispatch => {
        return fetch('/api/requisition', {
            credentials: "same-origin"
        }).then(res => res.json().then(data => {
            const requisitions = [];
            data.map(requisition => requisitions.push({
                id: requisition._id,
                name: requisition.name,
                item: requisition.item,
                role: requisition.role,
                returnDate: moment(requisition.returnDate)
            }));

            dispatch(setRequisition(requisitions));
        }))
    }
}