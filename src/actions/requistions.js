import Axios from 'axios';
import qs from 'qs';
import moment from 'moment';
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
        const config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }
        return Axios.post('http://localhost:8080/api/requisition', qs.stringify({
            name, role, item, returnDate: convertedReturnDate
        }), config).then(({ data }) => {
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
        });
    }
}

const deleteRequisition = id => ({
    type: 'DELETE_REQUISITION',
    id
});

export const startDeleteRequisition = (id) => {
    return dispatch => {
        return Axios.delete(`http://localhost:8080/api/requisition/${id}`)
            .then(({ data }) => {
                dispatch(deleteRequisition(id))
                dispatch(editStock(data._id, data))
            });
    }
}

const editRequisition = (id, updates) => ({
    type: 'EDIT_REQUISITION',
    id,
    updates
});


export const startEditRequisition = (id, updates) => {
    return dispatch => {
        const config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }
        return Axios.post(`http://localhost:8080/api/requisition/${id}`, qs.stringify({ ...updates, returnDate: updates.returnDate.toDate() }), config)
            .then(() => dispatch(editRequisition(id, updates)))
    }
}

const setRequisition = requisitions => ({
    type: 'SET_REQUISITION',
    requisitions
});

export const startSetRequisition = () => {
    return dispatch => {
        return Axios.get('http://localhost:8080/api/requisition')
            .then(({ data }) => {
                const requisitions = [];
                data.map(requisition => requisitions.push({
                    id: requisition._id,
                    name: requisition.name,
                    item: requisition.item,
                    role: requisition.role,
                    returnDate: moment(requisition.returnDate)
                }));

                dispatch(setRequisition(requisitions));
            })
    }
}