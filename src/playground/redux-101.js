import { createStore } from 'redux';

// Action Generators - functions that return action objects

/*const incrementCount = (payload = {}) => ({ //payload must have this default empty object
    type: 'INCREMENT',
    incrementBy: typeof payload.incrementBy === 'number' ? payload.incrementBy : 1
})*/

// Using es6 destruturing 
const incrementCount = ({incrementBy = 1} = {}) => ({ //destructure the object and set default value
    type: 'INCREMENT',
    incrementBy //both sides have the same name, so instead of "incrementBy = incrementBy", simplify
});


const decrementCount = ({ decrementBy = 1} = {}) => ({
    type: 'DECREMENT',
    decrementBy
});

const setCount = ({ count } = {}) => ({
    type: 'SET',
    count
});

const resetCount = () => ({
    type: 'RESET'   
});


//Reducer   
//1. Reducers are pure functions
//    - Outputs only determined by the inputs
//    - Doesn't change external properties
//2. Never change state or action


const countReducer = (state = { count: 0 }, action) => {
    switch (action.type) {
        case 'INCREMENT': 
            return {
                count: state.count + action.incrementBy
            }
        case 'DECREMENT':
            return {
                count: state.count - action.decrementBy
            }
        case 'SET':
            return {
                count: action.count
            }
        case 'RESET':
            return {
                count: 0
            }
        default: 
            return state;
    }
};

const store = createStore(countReducer);

const unsubscribe = store.subscribe(() => { //Listen to changes
    console.log(store.getState());
});

//Actions are objects that gets sent to the store to change the state
store.dispatch(incrementCount());

store.dispatch(incrementCount({incrementBy: 5}));

store.dispatch(decrementCount());

store.dispatch(decrementCount({decrementBy: 10}));

store.dispatch(resetCount());

store.dispatch(setCount({count: 7}));

 //unsubscribe();
