import createRequisition from "../helpers/createRequisition";

const defaultRequisitions = [
    createRequisition('Evans Djangbah', 'Makerspace Associate', 'Hammer', '04-01-2019'),
    createRequisition('Linda Aidoo Lamptey', 'Administration Associate', 'Paint Brush', '16-01-2019'),
    createRequisition('Prince Banini', 'Technical Associate', 'Soldering Iron', '11-02-2019'),
    createRequisition('Prince Banini', 'Technical Associate', 'Solder', '11-02-2019'),
    createRequisition('Prince Banini', 'Technical Associate', 'Arduino', '11-02-2019'),
];

const requisitionsReducer = (state = defaultRequisitions, action) => {
    switch (action.type) {
        case 'ADD_REQUISITION':
            return [...state, action.requisition]
        case 'REMOVE_REQUISITION':
            return state.filter(({ id }) => id !== action.id)
        default:
            return state;
    }
}

export default requisitionsReducer