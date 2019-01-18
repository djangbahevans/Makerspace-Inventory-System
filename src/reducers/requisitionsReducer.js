
const requisitionsReducer = (state = [], action) => {
    switch (action.type) {
        case 'ADD_REQUISITION':
            return [...state, action.requisition]
        case 'DELETE_REQUISITION':
            return state.filter(({ id }) => id !== action.id)
        case 'EDIT_REQUISITION':
            return state.map(requisition => {
                if (action.id === requisition.id) {
                    return {
                        ...requisition,
                        ...action.updates
                    }
                }
                else return requisition
            });
        case 'SET_REQUISITION':
            return action.requisitions
        default:
            return state;
    }
}

export default requisitionsReducer;