import Axios from 'axios';
import qs from 'qs';


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

export const startAddRequisition = requisitionData => {
    return dispatch => {
        const { name, role, item, returnDate } = requisitionData;
        const config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }
        return Axios.post('http://localhost:8080/api/requisition', qs.stringify({
            name, role, item, returnDate
        }), config).then(({ data }) => {
            dispatch(addRequisition({ id: data._id, name, role, item, returnDate }))
        })
    }
}

const deleteRequisition = id => ({
    type: 'DELETE_REQUISITION',
    id
});

export const startDeleteRequisition = (id) => {
    return dispatch => {
        return Axios.delete(`http://localhost:8080/api/requisition/${id}`)
            .then(() => dispatch(deleteRequisition(id)));
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
        return Axios.post(`http://localhost:8080/api/requisition/${id}`, qs.stringify(updates), config)
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
                    returnDate: requisition.returnDate
                }))
                dispatch(setRequisition(requisitions))
            })
    }
}