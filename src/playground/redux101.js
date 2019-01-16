import { createStore } from 'redux';

// ACTION GENERATORS
const incrementCount = ({ incrementBy = 1 } = {}) => ({
    type: 'INCREMENT',
    incrementBy
})

const decrementCount = ({ decrementBy = 1 } = {}) => ({
    type: 'DECREMENT',
    decrementBy
})

const setCount = ({ count }) => ({
    type: 'SET',
    count
});

const resetCount = () => ({
    type: 'RESET'
});

const store = createStore((state = { count: 0 }, action) => {
    switch (action.type) {
        case 'INCREMENT':
            return {
                count: state.count + action.incrementBy
            }
        case 'DECREMENT':
            return {
                count: state.count - action.decrementBy
            }
        case 'RESET':
            return {
                count: 0
            }
        case 'SET':
            const { count } = action
            return {
                count
            }
        default:
            return state
    }
})

const unsubscribe = store.subscribe(() => console.log(store.getState()))

store.dispatch(incrementCount({ incrementBy: 5 }))

store.dispatch(decrementCount())

store.dispatch(decrementCount({ decrementBy: 5 }))

store.dispatch(setCount( { count: 101 }))
