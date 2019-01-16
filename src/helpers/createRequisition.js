import uuid from 'uuid'

function createRequisition(name, role, item, returnDate) {
    const id = uuid();
    return { id, name, role, item, returnDate };
}

export default createRequisition;
