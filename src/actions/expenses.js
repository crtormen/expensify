import uuid from 'uuid';

// Actions ate constants where are defined the arguments and their respectives default states, 
// for the object returned, where those args are applied to be executed in the reducers when dispatched by redux-store


//Action generator ADD_EXPENSE
export const addExpense = (
    { //default values
        description = '', 
        note = '', 
        amount = 0, 
        createdAt = 0
    } = {} //in undefined case
) => ({ 
    type: 'ADD_EXPENSE',
    expense: {
        id: uuid(),
        description,
        note,
        amount,
        createdAt
    }
});


//Action Generator REMOVE_EXPENSE
export const removeExpense = ({ id } = {}) => ({
    type: 'REMOVE_EXPENSE',
    id
});

//Action Generator EDIT_EXPENSE
export const editExpense = (id, updates) => ({
    type: 'EDIT_EXPENSE',
    id,
    updates
})

