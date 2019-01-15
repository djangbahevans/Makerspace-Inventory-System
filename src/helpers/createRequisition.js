let req_id = 0;
function createRequisition(name, role, item, returnDate) {
    req_id += 1;
    return { id: req_id, name, role, item, returnDate };
}

export default createRequisition;