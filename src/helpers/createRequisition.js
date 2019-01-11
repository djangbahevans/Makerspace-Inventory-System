let req_id = 0;
function createRequisition(name, role, item, date_returned) {
    req_id += 1;
    return { id: req_id, name, role, item, date_returned };
}

export default createRequisition;